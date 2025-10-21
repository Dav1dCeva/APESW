import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateDetallesPedidoDto {
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    cantidad_solicitada: number;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    precio_unitario: number;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    subtotal: number;

    @IsNumber()
    @IsNotEmpty()
    productoId: number;

    @IsNumber()
    @IsNotEmpty()
    pedidoId: number;
}
