import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosResolver } from './pedidos.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PedidosResolver, PedidosService],
})
export class PedidosModule {}
