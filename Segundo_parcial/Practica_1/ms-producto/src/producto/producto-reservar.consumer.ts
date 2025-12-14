import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductoService } from './producto.service';
import { IdempotenciaService } from '../idempotencia/idempotencia.service';

@Controller()
export class ProductoReservarConsumer {
  constructor(
    private readonly productoService: ProductoService,
    private readonly idemService: IdempotenciaService,
  ) {}

  @MessagePattern('producto.reservar')
  async reservar(@Payload() data: any) {
    const { idempotencyKey, payload } = data;

    // 1) Verificar duplicado
    if (await this.idemService.exists(idempotencyKey)) {
      console.log('⚠️ Mensaje duplicado ignorado: ', idempotencyKey);
      return { status: 'duplicate' };
    }

    // 2) Intentar registrar clave (maneja race condition)
    try {
      await this.idemService.register(idempotencyKey, payload.detallePedidoId);
    } catch (error) {
      // Si falla por clave duplicada, es un mensaje duplicado (race condition)
      if (error.code === '23505') {
        console.log(
          '⚠️ Mensaje duplicado ignorado (race condition): ',
          idempotencyKey,
        );
        return { status: 'duplicate' };
      }
      throw error; // Re-lanzar si es otro error
    }

    // 3) Procesar negocio
    await this.productoService.descontarStock(
      payload.productoId,
      payload.cantidad_solicitada,
    );

    console.log('✔️ Stock actualizado correctamente');
    return { status: 'processed' };
  }
}
