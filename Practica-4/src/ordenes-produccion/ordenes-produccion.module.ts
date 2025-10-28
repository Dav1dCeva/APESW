import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenesProduccionService } from './ordenes-produccion.service';
import { OrdenesProduccionController } from './ordenes-produccion.controller';
import { OrdenProduccion } from './entities/ordenes-produccion.entity';
import { Producto } from '../productos/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenProduccion, Producto])],
  controllers: [OrdenesProduccionController],
  providers: [OrdenesProduccionService],
})
export class OrdenesProduccionModule {}
