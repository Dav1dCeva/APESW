import { Module } from '@nestjs/common';
import { InsumosService } from './insumos.service';
import { InsumosResolver } from './insumos.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [InsumosResolver, InsumosService],
})
export class InsumosModule {}
