import { CreateOrdenProduccionInput } from './create-orden-produccion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrdenProduccionInput extends PartialType(CreateOrdenProduccionInput) {
  @Field(() => Int)
  id: number;
}
