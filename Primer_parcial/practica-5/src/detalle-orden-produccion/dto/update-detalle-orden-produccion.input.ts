import { CreateDetalleOrdenProduccionInput } from './create-detalle-orden-produccion.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDetalleOrdenProduccionInput extends PartialType(CreateDetalleOrdenProduccionInput) {
  @Field(() => Int)
  id: number;
}
