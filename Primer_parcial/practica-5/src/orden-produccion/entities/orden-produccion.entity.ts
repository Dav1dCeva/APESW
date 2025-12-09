import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Producto } from '../../productos/entities/producto.entity';
import { DetalleOrdenProduccion } from '../../detalle-orden-produccion/entities/detalle-orden-produccion.entity';

@ObjectType()
export class OrdenProduccion {
  @Field(() => Int, { description: 'Identificador único de la orden de producción' })
  id: number;

  @Field(() => String, { description: 'Fecha de inicio de la orden de producción (YYYY-MM-DD)' })
  fecha_inicio: string;

  @Field(() => String, { nullable: true, description: 'Fecha de finalización de la orden de producción (si aplica)' })
  fecha_fin?: string;

  @Field(() => String, { description: 'Estado actual de la orden (ejemplo: pendiente, en proceso, completada)' })
  estado: string;

  @Field(() => Int, { description: 'Cantidad de productos a producir' })
  cantidad_producir: number;

  @Field(() => Float, { description: 'Costo total estimado o real de la orden de producción' })
  costo_total: number;

  @Field(() => Int, { description: 'ID del producto que se está produciendo' })
  productoId: number;

  @Field(() => Producto, { description: 'Producto asociado a esta orden de producción' })
  producto: Producto;

  @Field(() => [DetalleOrdenProduccion], { description: 'Detalles de insumos y costos asociados a la orden' })
  detalles: DetalleOrdenProduccion[];
}
