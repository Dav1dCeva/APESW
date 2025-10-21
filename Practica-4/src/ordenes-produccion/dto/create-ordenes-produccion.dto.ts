import { IsDateString, IsInt, IsOptional, IsString, Min, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrdenesProduccionDto {
    @IsDateString()
    @IsNotEmpty()
    fecha_inicio: string;

    @IsOptional()
    @IsDateString()
    fecha_fin?: string;

    @IsString()
    @IsOptional()
    estado?: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    cantidad_producir: number;

    @IsInt()
    @IsNotEmpty()
    productoId: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    costo_total?: number;
}
