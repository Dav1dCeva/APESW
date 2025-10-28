import { CreateProductosInsumoInput } from './create-productos-insumo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductosInsumoInput extends PartialType(CreateProductosInsumoInput) {
  @Field(() => Int)
  id: number;
}
