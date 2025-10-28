import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoInsumoDto } from './create-producto-insumo.dto';

export class UpdateProductoInsumoDto extends PartialType(CreateProductoInsumoDto) {}