import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Factura } from '../../facturas/entities/factura.entity';
import { DetallePedido } from '../../detalles-pedidos/entities/detalles-pedido.entity';

@ObjectType()
export class Pedido {
  @Field(() => Int, { description: 'Identificador único del pedido' })
  id: number;

  @Field(() => String, { description: 'Fecha en la que se realizó el pedido (YYYY-MM-DD)' })
  fecha: string;

  @Field(() => Float, { description: 'Total monetario del pedido' })
  total: number;

  @Field(() => String, { description: 'Estado actual del pedido (ejemplo: pendiente, enviado, entregado)' })
  estado: string;

  @Field(() => Int, { description: 'ID del cliente que realizó el pedido' })
  clienteId: number;

  @Field(() => Cliente, { description: 'Cliente asociado a este pedido' })
  cliente: Cliente;

  @Field(() => Int, { nullable: true, description: 'ID de la factura generada para este pedido, si existe' })
  facturaId?: number;

  @Field(() => Factura, { nullable: true, description: 'Factura asociada a este pedido (si existe)' })
  factura?: Factura;

  @Field(() => [DetallePedido], { description: 'Lista de detalles de productos incluidos en el pedido' })
  detalles: DetallePedido[];
}
