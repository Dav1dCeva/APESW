import { CreateDetallesPedidoInput } from './create-detalles-pedido.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDetallesPedidoInput extends PartialType(CreateDetallesPedidoInput) {
  @Field(() => Int)
  id: number;
}
