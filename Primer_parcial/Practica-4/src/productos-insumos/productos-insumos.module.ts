import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosInsumosService } from './productos-insumos.service';
import { ProductosInsumosController } from './productos-insumos.controller';
import { ProductoInsumo } from './entities/producto-insumo.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Insumo } from '../insumos/entities/insumo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoInsumo, Producto, Insumo])],
  controllers: [ProductosInsumosController],
  providers: [ProductosInsumosService],
})
export class ProductosInsumosModule {}
