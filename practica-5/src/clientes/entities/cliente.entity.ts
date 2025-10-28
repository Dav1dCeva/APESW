import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@ObjectType()
export class Cliente {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

    @Field(() => String, { description: 'Example field (placeholder)' })
  nombre: string;

    @Field(() => String, { description: 'Example field (placeholder)' })
  apellido: string;

    @Field(() => String, { description: 'Example field (placeholder)' })
  dni: string;

    @Field(() => String, { description: 'Example field (placeholder)' })
  telefono: string;

    @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;

  @Field(() => [Pedido], { description: 'Example field (placeholder)' })
  pedidos: Pedido[];

}
