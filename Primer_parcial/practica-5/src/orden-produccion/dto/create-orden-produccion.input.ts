import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrdenProduccionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
