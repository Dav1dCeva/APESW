import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClienteInput {
  @Field(() => String, { description: 'Nombre del cliente' })
  nombre: string;

  @Field(() => String, { description: 'Apellido del cliente' })
  apellido: string;

  @Field(() => String, { description: 'DNI del cliente' })
  dni: string;

  @Field(() => String, { description: 'Teléfono del cliente' })
  telefono: string;

  @Field(() => String, { description: 'Email del cliente' })
  email: string;
}
