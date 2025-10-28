import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenesProduccionDto } from './create-ordenes-produccion.dto';

export class UpdateOrdenesProduccionDto extends PartialType(CreateOrdenesProduccionDto) {}
