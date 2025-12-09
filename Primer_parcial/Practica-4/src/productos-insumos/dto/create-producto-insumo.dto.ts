import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductoInsumoDto {
    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    cantidad_necesaria: number;

    @IsNumber()
    @IsNotEmpty()
    productoId: number;

    @IsNumber()
    @IsNotEmpty()
    insumoId: number;
}