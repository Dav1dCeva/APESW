import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePedidoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
