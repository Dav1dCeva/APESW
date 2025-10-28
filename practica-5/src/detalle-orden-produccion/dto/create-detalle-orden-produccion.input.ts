import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDetalleOrdenProduccionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
