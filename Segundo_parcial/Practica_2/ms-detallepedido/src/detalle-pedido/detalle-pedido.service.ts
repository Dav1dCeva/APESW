import { Injectable, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';
import { ClientProxy } from '@nestjs/microservices';
import { WebhookPublisherService } from '../webhook/webhook-publisher.service';

@Injectable()
export class DetallePedidoService {
  private readonly logger = new Logger(DetallePedidoService.name);

  constructor(
    @InjectRepository(DetallePedido)
    private readonly repo: Repository<DetallePedido>,
    // PRODUCTO_SERVICE comentado: RabbitMQ no está disponible
    // @Inject('PRODUCTO_SERVICE') private client: ClientProxy,
    private readonly webhookPublisher: WebhookPublisherService,
  ) {}

  async crearDetalle(dto: any) {
    try {
      // 1) Guardar detalle con mapeo de campos
      const detalle = await this.repo.save({
        productoId: dto.producto_id || dto.productoId,
        cantidad_solicitada: dto.cantidad_solicitada || dto.cantidad,
        precio_unitario: dto.precio_unitario || dto.precioUnitario,
        subtotal: dto.subtotal,
        pedidoId: dto.pedido_id || dto.pedidoId,
      });
      this.logger.log(`✅ Detalle creado: ${detalle.id}`);

      // 2) Generar clave idempotente
      const idempotencyKey = `detalle-${detalle.id}`;

      // 3) Emitir evento al microservicio de Producto via RabbitMQ
      // COMENTADO: RabbitMQ no está disponible en el entorno actual
      // try {
      //   await this.client
      //     .emit('producto.reservar', {
      //       idempotencyKey,
      //       payload: {
      //         detallePedidoId: detalle.id,
      //         productoId: detalle.productoId,
      //         cantidad_solicitada: detalle.cantidad_solicitada,
      //       },
      //     })
      //     .toPromise();
      //   this.logger.log('✅ Evento RabbitMQ enviado a ms-producto');
      // } catch (error) {
      //   this.logger.error(`❌ Error al enviar evento RabbitMQ: ${error.message}`);
      // }

      // 4) 🔥 PUBLICAR WEBHOOK a Supabase Edge Functions (FANOUT)
      try {
        console.log('📤 Intentando publicar webhook...');
        await this.webhookPublisher.publishWebhook('detalle.creado', {
          detalle_id: detalle.id,
          pedido_id: detalle.pedidoId,
          producto_id: detalle.productoId,
          cantidad_solicitada: detalle.cantidad_solicitada,
          precio_unitario: detalle.precio_unitario,
          subtotal: detalle.subtotal,
        });
        this.logger.log(
          '✅ Webhook "detalle.creado" publicado a Edge Functions',
        );
      } catch (error) {
        this.logger.error(`❌ Error al publicar webhook: ${error.message}`);
        console.error('Webhook error details:', error);
        // No relanzar el error, continuar
      }

      return {
        mensaje: 'Detalle creado y eventos enviados',
        detalle,
      };
    } catch (error) {
      this.logger.error(`❌ Error al crear detalle: ${error.message}`);
      throw error;
    }
  }
}
