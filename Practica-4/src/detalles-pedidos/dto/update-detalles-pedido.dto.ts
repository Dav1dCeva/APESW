import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallesPedidoDto } from './create-detalles-pedido.dto';

export class UpdateDetallesPedidoDto extends PartialType(CreateDetallesPedidoDto) {}
