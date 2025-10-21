import { IsInt, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateDetallesOrdenProduccionDto {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  cantidad_utilizada: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  costo_unitario: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  subtotal: number;

  @IsInt()
  @IsNotEmpty()
  ordenProduccionId: number;

  @IsInt()
  @IsNotEmpty()
  insumoId: number;
}
