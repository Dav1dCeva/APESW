import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

/** DTO para actualizar un Cliente (propiedades opcionales) */
export class UpdateClienteDto extends PartialType(CreateClienteDto) {}
