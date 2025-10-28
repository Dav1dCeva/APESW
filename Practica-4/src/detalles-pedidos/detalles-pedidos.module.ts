import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesPedidosService } from './detalles-pedidos.service';
import { DetallesPedidosController } from './detalles-pedidos.controller';
import { DetallePedido } from './entities/detalles-pedido.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { Producto } from '../productos/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePedido, Pedido, Producto])],
  controllers: [DetallesPedidosController],
  providers: [DetallesPedidosService],
})
export class DetallesPedidosModule {}
