import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { InsumosModule } from './insumos/insumos.module';
import { OrdenesProduccionModule } from './ordenes-produccion/ordenes-produccion.module';
import { DetallesOrdenProduccionModule } from './detalles-orden-produccion/detalles-orden-produccion.module';
import { ClientesModule } from './clientes/clientes.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProductosInsumosModule } from './productos-insumos/productos-insumos.module';
import { FacturasModule } from './facturas/facturas.module';
import { DetallesPedidosModule } from './detalles-pedidos/detalles-pedidos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'gestion.sqlite',
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      entities: [],
    }),
    ClientesModule,
    ProductosModule,
    InsumosModule,
    PedidosModule,
    DetallesPedidosModule,
    FacturasModule,
    OrdenesProduccionModule,
    DetallesOrdenProduccionModule,
    ProductosInsumosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
