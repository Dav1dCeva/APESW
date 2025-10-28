import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ProductoInsumo } from './entities/productos-insumo.entity';
import { CreateProductosInsumoInput } from './dto/create-productos-insumo.input';
import { UpdateProductosInsumoInput } from './dto/update-productos-insumo.input';

@Injectable()
export class ProductosInsumosService {
  private readonly logger = new Logger(ProductosInsumosService.name);
  private readonly baseUrl = 'http://localhost:3000/chifles/productos-insumos';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<ProductoInsumo[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<ProductoInsumo[]>(this.baseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al obtener productos-insumos';
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<ProductoInsumo> {
    const { data } = await firstValueFrom(
      this.httpService.get<ProductoInsumo>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al obtener producto-insumo con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async create(createProductosInsumoInput: CreateProductosInsumoInput): Promise<ProductoInsumo> {
    const { data } = await firstValueFrom(
      this.httpService.post<ProductoInsumo>(this.baseUrl, createProductosInsumoInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al crear producto-insumo';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateProductosInsumoInput: UpdateProductosInsumoInput): Promise<ProductoInsumo> {
    const { data } = await firstValueFrom(
      this.httpService.patch<ProductoInsumo>(`${this.baseUrl}/${id}`, updateProductosInsumoInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al actualizar producto-insumo con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async remove(id: number): Promise<ProductoInsumo> {
    const { data } = await firstValueFrom(
      this.httpService.delete<ProductoInsumo>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al eliminar producto-insumo con id ${id}`;
        }),
      ),
    );
    return data;
  }
}
