import { PartialType } from '@nestjs/mapped-types';
import { CreateProductosInsumoDto } from './create-productos-insumo.dto';

export class UpdateProductosInsumoDto extends PartialType(CreateProductosInsumoDto) {}
