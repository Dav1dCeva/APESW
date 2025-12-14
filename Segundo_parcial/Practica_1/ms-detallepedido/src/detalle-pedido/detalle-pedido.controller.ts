import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DetallePedidoService } from './detalle-pedido.service';

@Controller()
export class DetallePedidoController {
  constructor(private readonly service: DetallePedidoService) {}

  @MessagePattern('detalle.crear')
  async crearDetalle(@Payload() dto: any) {
    return this.service.crearDetalle(dto);
  }
}
