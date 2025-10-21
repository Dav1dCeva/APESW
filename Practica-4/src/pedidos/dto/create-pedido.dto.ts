import { IsString, IsNumber, IsOptional, IsDateString, Min, IsInt } from 'class-validator';

/** DTO para crear un Pedido */
export class CreatePedidoDto {
	/** Fecha del pedido en formato ISO */
	@IsDateString()
	fecha: string;

	/** Total del pedido */
	@IsNumber()
	@Min(0)
	total: number;

	/** Estado del pedido */
	@IsString()
	estado: string;

	/** Id del cliente asociado */
	@IsInt()
	clienteId: number;

	/** Id de la factura asociada (opcional) */
	@IsOptional()
	@IsInt()
	facturaId?: number;
}
