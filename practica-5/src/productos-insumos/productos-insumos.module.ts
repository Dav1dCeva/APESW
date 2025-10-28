import { Module } from '@nestjs/common';
import { ProductosInsumosService } from './productos-insumos.service';
import { ProductosInsumosResolver } from './productos-insumos.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ProductosInsumosResolver, ProductosInsumosService],
})
export class ProductosInsumosModule {}
