import { IsString, IsOptional, IsEmail, Length } from 'class-validator';

/** DTO para crear un Cliente */
export class CreateClienteDto {
	/** Nombre del cliente */
	@IsString()
	@Length(1, 100)
	nombre: string;

	/** Apellido del cliente */
	@IsString()
	@Length(1, 100)
	apellido: string;

	/** Documento nacional de identidad (único) */
	@IsString()
	@Length(4, 20)
	dni: string;

	/** Teléfono opcional */
	@IsOptional()
	@IsString()
	telefono?: string;

	/** Email opcional */
	@IsOptional()
	@IsEmail()
	email?: string;
}
