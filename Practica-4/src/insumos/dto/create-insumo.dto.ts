import { IsString, IsNumber, IsOptional, IsNotEmpty, Min } from 'class-validator';

export class CreateInsumoDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    unidad_medida: string;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    stock: number;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    precio_unitario: number;

    @IsString()
    @IsOptional()
    estado?: string;
}
 
