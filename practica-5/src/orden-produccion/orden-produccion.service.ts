import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { OrdenProduccion } from './entities/orden-produccion.entity';
import { CreateOrdenProduccionInput } from './dto/create-orden-produccion.input';
import { UpdateOrdenProduccionInput } from './dto/update-orden-produccion.input';

@Injectable()
export class OrdenProduccionService {
  private readonly logger = new Logger(OrdenProduccionService.name);
  private readonly baseUrl = 'http://localhost:3000/chifles/ordenes-produccion';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<OrdenProduccion[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<OrdenProduccion[]>(this.baseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al obtener órdenes de producción';
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<OrdenProduccion> {
    const { data } = await firstValueFrom(
      this.httpService.get<OrdenProduccion>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al obtener orden de producción con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async create(createOrdenProduccionInput: CreateOrdenProduccionInput): Promise<OrdenProduccion> {
    const { data } = await firstValueFrom(
      this.httpService.post<OrdenProduccion>(this.baseUrl, createOrdenProduccionInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al crear orden de producción';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateOrdenProduccionInput: UpdateOrdenProduccionInput): Promise<OrdenProduccion> {
    const { data } = await firstValueFrom(
      this.httpService.patch<OrdenProduccion>(`${this.baseUrl}/${id}`, updateOrdenProduccionInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al actualizar orden de producción con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async remove(id: number): Promise<OrdenProduccion> {
    const { data } = await firstValueFrom(
      this.httpService.delete<OrdenProduccion>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al eliminar orden de producción con id ${id}`;
        }),
      ),
    );
    return data;
  }
}
