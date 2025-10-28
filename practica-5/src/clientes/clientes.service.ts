import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteInput } from './dto/create-cliente.input';
import { UpdateClienteInput } from './dto/update-cliente.input';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Injectable()
export class ClientesService {
  private readonly logger = new Logger(ClientesService.name);
  private readonly baseUrl = 'http://localhost:3000/chifles/clientes';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Cliente[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Cliente[]>(this.baseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al obtener clientes';
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<Cliente> {
    const { data } = await firstValueFrom(
      this.httpService.get<Cliente>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al obtener cliente con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async create(createClienteInput: CreateClienteInput): Promise<Cliente> {
    const { data } = await firstValueFrom(
      this.httpService.post<Cliente>(this.baseUrl, createClienteInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al crear cliente';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateClienteInput: UpdateClienteInput): Promise<Cliente> {
    const { data } = await firstValueFrom(
      this.httpService.patch<Cliente>(`${this.baseUrl}/${id}`, updateClienteInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al actualizar cliente con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async remove(id: number): Promise<Cliente> {
    const { data } = await firstValueFrom(
      this.httpService.delete<Cliente>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al eliminar cliente con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async findPedidosByCliente(clienteId: number): Promise<Pedido[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Pedido[]>('http://localhost:3000/chifles/pedidos').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al obtener pedidos';
        }),
      ),
    );
    return data.filter((pedido) => pedido.clienteId === clienteId);
  }
}
