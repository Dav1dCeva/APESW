import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InsumosModule } from './insumos/insumos.module';
import { ProductosModule } from './productos/productos.module';
import { DetalleOrdenProduccionModule } from './detalle-orden-produccion/detalle-orden-produccion.module';
import { OrdenProduccionModule } from './orden-produccion/orden-produccion.module';
import { ClientesModule } from './clientes/clientes.module';
import { DetallesPedidosModule } from './detalles-pedidos/detalles-pedidos.module';
import { FacturasModule } from './facturas/facturas.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProductosInsumosModule } from './productos-insumos/productos-insumos.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: true,
    }),
    
    InsumosModule, ProductosModule, DetalleOrdenProduccionModule, OrdenProduccionModule, ClientesModule, DetallesPedidosModule, FacturasModule, PedidosModule, ProductosInsumosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
