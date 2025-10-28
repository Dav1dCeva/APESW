import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Producto } from './entities/producto.entity';
import { CreateProductoInput } from './dto/create-producto.input';
import { UpdateProductoInput } from './dto/update-producto.input';

@Injectable()
export class ProductosService {
  private readonly logger = new Logger(ProductosService.name);
  private readonly baseUrl = 'http://localhost:3000/chifles/productos';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Producto[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Producto[]>(this.baseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al obtener productos';
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<Producto> {
    const { data } = await firstValueFrom(
      this.httpService.get<Producto>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al obtener producto con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async create(createProductoInput: CreateProductoInput): Promise<Producto> {
    const { data } = await firstValueFrom(
      this.httpService.post<Producto>(this.baseUrl, createProductoInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al crear producto';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateProductoInput: UpdateProductoInput): Promise<Producto> {
    const { data } = await firstValueFrom(
      this.httpService.patch<Producto>(`${this.baseUrl}/${id}`, updateProductoInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al actualizar producto con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async remove(id: number): Promise<Producto> {
    const { data } = await firstValueFrom(
      this.httpService.delete<Producto>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al eliminar producto con id ${id}`;
        }),
      ),
    );
    return data;
  }
}
