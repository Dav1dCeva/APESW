import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosResolver } from './productos.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ProductosResolver, ProductosService],
})
export class ProductosModule {}
