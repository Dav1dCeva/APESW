import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';
import { ProductoReservarConsumer } from './producto-reservar.consumer';
import { IdempotenciaModule } from '../idempotencia/idempotencia.module';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), IdempotenciaModule],
  providers: [ProductoService],
  controllers: [ProductoReservarConsumer],
})
export class ProductoModule {}
