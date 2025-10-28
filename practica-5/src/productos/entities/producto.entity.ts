import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { OrdenProduccion } from '../../orden-produccion/entities/orden-produccion.entity';
import { DetallePedido } from '../../detalles-pedidos/entities/detalles-pedido.entity';
import { ProductoInsumo } from '../../productos-insumos/entities/productos-insumo.entity';

@ObjectType()
export class Producto {
  @Field(() => Int, { description: 'Identificador único del producto' })
  id: number;

  @Field(() => String, { description: 'Nombre del producto' })
  nombre: string;

  @Field(() => String, { nullable: true, description: 'Descripción opcional del producto' })
  descripcion?: string;

  @Field(() => Float, { description: 'Precio del producto' })
  precio: number;

  @Field(() => Boolean, { description: 'Indica si el producto está disponible para la venta' })
  disponible: boolean;

  @Field(() => [OrdenProduccion], { description: 'Órdenes de producción asociadas a este producto' })
  ordenesProduccion: OrdenProduccion[];

  @Field(() => [DetallePedido], { description: 'Detalles de pedidos que incluyen este producto' })
  detallesPedidos: DetallePedido[];

  @Field(() => [ProductoInsumo], { description: 'Relaciones entre productos e insumos asociados a este producto' })
  productosInsumos: ProductoInsumo[];
}
