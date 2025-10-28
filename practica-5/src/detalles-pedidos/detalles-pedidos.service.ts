import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { DetallePedido } from './entities/detalles-pedido.entity';
import { CreateDetallesPedidoInput } from './dto/create-detalles-pedido.input';
import { UpdateDetallesPedidoInput } from './dto/update-detalles-pedido.input';

@Injectable()
export class DetallesPedidosService {
  private readonly logger = new Logger(DetallesPedidosService.name);
  private readonly baseUrl = 'http://localhost:3000/chifles/detalles-pedidos';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<DetallePedido[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<DetallePedido[]>(this.baseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al obtener detalles de pedidos';
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<DetallePedido> {
    const { data } = await firstValueFrom(
      this.httpService.get<DetallePedido>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al obtener detalle de pedido con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async create(createDetallesPedidoInput: CreateDetallesPedidoInput): Promise<DetallePedido> {
    const { data } = await firstValueFrom(
      this.httpService.post<DetallePedido>(this.baseUrl, createDetallesPedidoInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al crear detalle de pedido';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateDetallesPedidoInput: UpdateDetallesPedidoInput): Promise<DetallePedido> {
    const { data } = await firstValueFrom(
      this.httpService.patch<DetallePedido>(`${this.baseUrl}/${id}`, updateDetallesPedidoInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al actualizar detalle de pedido con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async remove(id: number): Promise<DetallePedido> {
    const { data } = await firstValueFrom(
      this.httpService.delete<DetallePedido>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al eliminar detalle de pedido con id ${id}`;
        }),
      ),
    );
    return data;
  }
}
