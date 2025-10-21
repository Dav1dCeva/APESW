import { IsDateString, IsNumber, IsNotEmpty, Min, IsInt, IsOptional } from 'class-validator';

/** DTO para crear Factura */
export class CreateFacturaDto {
	/** Fecha en formato ISO (YYYY-MM-DD) */
	@IsDateString()
	@IsNotEmpty()
	fecha: string;

	/** Subtotal de la factura */
	@IsNumber()
	@Min(0)
	@IsNotEmpty()
	subtotal: number;

	/** IVA calculado */
	@IsNumber()
	@Min(0)
	@IsNotEmpty()
	iva: number;

	/** Total de la factura */
	@IsNumber()
	@Min(0)
	@IsNotEmpty()
	total: number;

	/** ID del cliente asociado */
	@IsInt()
	@IsNotEmpty()
	clienteId: number;

	/** ID del pedido asociado (opcional) */
	@IsOptional()
	@IsInt()
	pedidoId?: number;
}
