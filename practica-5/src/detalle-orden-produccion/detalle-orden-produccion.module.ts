import { Module } from '@nestjs/common';
import { DetalleOrdenProduccionService } from './detalle-orden-produccion.service';
import { DetalleOrdenProduccionResolver } from './detalle-orden-produccion.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [DetalleOrdenProduccionResolver, DetalleOrdenProduccionService],
})
export class DetalleOrdenProduccionModule {}
