import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallesOrdenProduccionDto } from './create-detalles-orden-produccion.dto';

export class UpdateDetallesOrdenProduccionDto extends PartialType(CreateDetallesOrdenProduccionDto) {}
