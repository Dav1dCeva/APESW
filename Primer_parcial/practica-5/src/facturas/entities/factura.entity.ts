import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@ObjectType()
export class Factura {
  @Field(() => Int, { description: 'Identificador único de la factura' })
  id: number;

  @Field(() => String, { description: 'Fecha de emisión de la factura (YYYY-MM-DD)' })
  fecha: string;

  @Field(() => Float, { description: 'Subtotal de la factura antes de impuestos' })
  subtotal: number;

  @Field(() => Float, { description: 'IVA aplicado a la factura' })
  iva: number;

  @Field(() => Float, { description: 'Total final de la factura (subtotal + IVA)' })
  total: number;

  @Field(() => Int, { description: 'ID del cliente asociado a la factura' })
  clienteId: number;

  @Field(() => Cliente, { description: 'Cliente al que pertenece la factura' })
  cliente: Cliente;

  @Field(() => Int, { nullable: true, description: 'ID del pedido asociado, si existe' })
  pedidoId?: number;

  @Field(() => Pedido, { nullable: true, description: 'Pedido vinculado a esta factura' })
  pedido?: Pedido;
}
