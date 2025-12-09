import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoInput } from './dto/create-pedido.input';
import { UpdatePedidoInput } from './dto/update-pedido.input';

@Injectable()
export class PedidosService {
  private readonly logger = new Logger(PedidosService.name);
  private readonly baseUrl = 'http://localhost:3000/chifles/pedidos';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Pedido[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Pedido[]>(this.baseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al obtener pedidos';
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<Pedido> {
    const { data } = await firstValueFrom(
      this.httpService.get<Pedido>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al obtener pedido con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async create(createPedidoInput: CreatePedidoInput): Promise<Pedido> {
    const { data } = await firstValueFrom(
      this.httpService.post<Pedido>(this.baseUrl, createPedidoInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al crear pedido';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updatePedidoInput: UpdatePedidoInput): Promise<Pedido> {
    const { data } = await firstValueFrom(
      this.httpService.patch<Pedido>(`${this.baseUrl}/${id}`, updatePedidoInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al actualizar pedido con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async remove(id: number): Promise<Pedido> {
    const { data } = await firstValueFrom(
      this.httpService.delete<Pedido>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al eliminar pedido con id ${id}`;
        }),
      ),
    );
    return data;
  }
}
