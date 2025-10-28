import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductosInsumoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
