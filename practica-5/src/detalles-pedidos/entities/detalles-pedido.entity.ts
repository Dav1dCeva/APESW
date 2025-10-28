import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Producto } from '../../productos/entities/producto.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@ObjectType()
export class DetallePedido {
  @Field(() => Int, { description: 'Identificador único del detalle del pedido' })
  id: number;

  @Field(() => Int, { description: 'Cantidad solicitada del producto' })
  cantidad_solicitada: number;

  @Field(() => Float, { description: 'Precio unitario del producto en el pedido' })
  precio_unitario: number;

  @Field(() => Float, { description: 'Subtotal del detalle (cantidad × precio unitario)' })
  subtotal: number;

  @Field(() => Int, { description: 'ID del producto asociado' })
  productoId: number;

  @Field(() => Producto, { description: 'Producto asociado al detalle del pedido' })
  producto: Producto;

  @Field(() => Int, { description: 'ID del pedido asociado' })
  pedidoId: number;

  @Field(() => Pedido, { description: 'Pedido al que pertenece este detalle' })
  pedido: Pedido;
}
