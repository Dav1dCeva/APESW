import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesOrdenProduccionService } from './detalles-orden-produccion.service';
import { DetallesOrdenProduccionController } from './detalles-orden-produccion.controller';
import { DetalleOrdenProduccion } from './entities/detalles-orden-produccion.entity';
import { OrdenProduccion } from '../ordenes-produccion/entities/ordenes-produccion.entity';
import { Insumo } from '../insumos/entities/insumo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleOrdenProduccion, OrdenProduccion, Insumo])
  ],
  controllers: [DetallesOrdenProduccionController],
  providers: [DetallesOrdenProduccionService],
})
export class DetallesOrdenProduccionModule {}
