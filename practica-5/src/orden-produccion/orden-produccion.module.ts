import { Module } from '@nestjs/common';
import { OrdenProduccionService } from './orden-produccion.service';
import { OrdenProduccionResolver } from './orden-produccion.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [OrdenProduccionResolver, OrdenProduccionService],
})
export class OrdenProduccionModule {}
