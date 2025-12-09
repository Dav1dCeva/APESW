import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
