import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { OrdenProduccion } from '../../orden-produccion/entities/orden-produccion.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';

@ObjectType()
export class DetalleOrdenProduccion {
  @Field(() => Int, { description: 'Identificador único del detalle de la orden de producción' })
  id: number;

  @Field(() => Float, { description: 'Cantidad utilizada del insumo en la orden de producción' })
  cantidad_utilizada: number;

  @Field(() => Float, { description: 'Costo unitario del insumo en la orden de producción' })
  costo_unitario: number;

  @Field(() => Float, { description: 'Subtotal del detalle (cantidad × costo unitario)' })
  subtotal: number;

  @Field(() => Int, { description: 'ID de la orden de producción asociada' })
  ordenProduccionId: number;

  @Field(() => Int, { description: 'ID del insumo asociado' })
  insumoId: number;

  @Field(() => OrdenProduccion, { description: 'Orden de producción asociada' })
  ordenProduccion: OrdenProduccion;

  @Field(() => Insumo, { description: 'Insumo utilizado en la orden de producción' })
  insumo: Insumo;
}
