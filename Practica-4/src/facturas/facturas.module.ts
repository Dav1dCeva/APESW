import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { Factura } from './entities/factura.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, Cliente, Pedido])],
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class FacturasModule {}
