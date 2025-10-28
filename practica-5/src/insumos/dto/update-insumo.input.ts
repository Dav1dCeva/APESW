import { CreateInsumoInput } from './create-insumo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInsumoInput extends PartialType(CreateInsumoInput) {
  @Field(() => Int)
  id: number;
}
