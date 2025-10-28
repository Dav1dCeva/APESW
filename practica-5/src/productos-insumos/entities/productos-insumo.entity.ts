import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Producto } from '../../productos/entities/producto.entity';
import { Insumo } from '../../insumos/entities/insumo.entity';

@ObjectType()
export class ProductoInsumo {
  @Field(() => Int, { description: 'Identificador único de la relación producto-insumo' })
  id: number;

  @Field(() => Float, { description: 'Cantidad necesaria del insumo para el producto' })
  cantidad_necesaria: number;

  @Field(() => Int, { description: 'ID del producto asociado' })
  productoId: number;

  @Field(() => Producto, { description: 'Producto asociado a este insumo' })
  producto: Producto;

  @Field(() => Int, { description: 'ID del insumo asociado' })
  insumoId: number;

  @Field(() => Insumo, { description: 'Insumo asociado al producto' })
  insumo: Insumo;
}
