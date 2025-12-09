import { Module } from '@nestjs/common';
import { DetallesPedidosService } from './detalles-pedidos.service';
import { DetallesPedidosResolver } from './detalles-pedidos.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [DetallesPedidosResolver, DetallesPedidosService],
})
export class DetallesPedidosModule {}
