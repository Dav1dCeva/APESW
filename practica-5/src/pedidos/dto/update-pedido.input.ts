import { CreatePedidoInput } from './create-pedido.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePedidoInput extends PartialType(CreatePedidoInput) {
  @Field(() => Int)
  id: number;
}
