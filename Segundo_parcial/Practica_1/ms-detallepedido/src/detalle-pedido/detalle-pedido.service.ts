import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(DetallePedido)
    private readonly repo: Repository<DetallePedido>,
    @Inject('PRODUCTO_SERVICE') private client: ClientProxy,
  ) {}

  async crearDetalle(dto: any) {
    // 1) Guardar detalle
    const detalle = await this.repo.save(dto);

    // 2) Generar clave idempotente (simple)
    const idempotencyKey = `detalle-${detalle.id}`;

    // 3) Emitir evento al microservicio de Producto
    try {
      // ⭐ PRIMER EMIT (normal)
      await this.client
        .emit('producto.reservar', {
          idempotencyKey,
          payload: {
            detallePedidoId: detalle.id,
            productoId: detalle.productoId,
            cantidad_solicitada: detalle.cantidad_solicitada,
          },
        })
        .toPromise();
      console.log('✅ Primer evento enviado');

      // SEGUNDO EMIT (simula DUPLICADO - misma clave)
      await this.client
        .emit('producto.reservar', {
          idempotencyKey, // ← Misma clave de idempotencia
          payload: {
            detallePedidoId: detalle.id,
            productoId: detalle.productoId,
            cantidad_solicitada: detalle.cantidad_solicitada,
          },
        })
        .toPromise();
      console.log('✅ Segundo evento enviado (DUPLICADO)');
    } catch (error) {
      console.error('❌ Error al enviar evento:', error);
    }

    return {
      mensaje: 'Detalle creado y evento enviado',
      detalle,
    };
  }
}
