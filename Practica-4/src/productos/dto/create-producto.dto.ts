import { IsString, IsOptional, IsNumber, Min, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateProductoDto {
	@IsString()
	@IsNotEmpty()
	nombre: string;

	@IsOptional()
	@IsString()
	descripcion?: string;

	@IsNumber()
	@Min(0)
	@IsNotEmpty()
	precio: number;

	@IsOptional()
	@IsBoolean()
	disponible?: boolean;
}
