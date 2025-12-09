import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { DetalleOrdenProduccion } from '../../detalle-orden-produccion/entities/detalle-orden-produccion.entity';
import { ProductoInsumo } from '../../productos-insumos/entities/productos-insumo.entity';

@ObjectType()
export class Insumo {
  @Field(() => Int, { description: 'Identificador único del insumo' })
  id: number;

  @Field(() => String, { description: 'Nombre del insumo' })
  nombre: string;

  @Field(() => String, { description: 'Unidad de medida del insumo (ejemplo: kg, l, m)' })
  unidad_medida: string;

  @Field(() => Float, { description: 'Cantidad disponible en stock del insumo' })
  stock: number;

  @Field(() => String, { description: 'Estado actual del insumo (ejemplo: disponible, agotado)' })
  estado: string;

  @Field(() => Float, { description: 'Precio unitario del insumo' })
  precio_unitario: number;

  @Field(() => [DetalleOrdenProduccion], { description: 'Detalles de orden de producción asociados al insumo' })
  detallesOrden: DetalleOrdenProduccion[];

  @Field(() => [ProductoInsumo], { description: 'Relaciones entre productos e insumos asociados' })
  productosInsumos: ProductoInsumo[];
}
