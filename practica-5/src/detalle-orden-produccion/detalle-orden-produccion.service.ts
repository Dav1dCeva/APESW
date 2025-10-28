import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { DetalleOrdenProduccion } from './entities/detalle-orden-produccion.entity';
import { CreateDetalleOrdenProduccionInput } from './dto/create-detalle-orden-produccion.input';
import { UpdateDetalleOrdenProduccionInput } from './dto/update-detalle-orden-produccion.input';

@Injectable()
export class DetalleOrdenProduccionService {
  private readonly logger = new Logger(DetalleOrdenProduccionService.name);
  private readonly baseUrl = 'http://localhost:3000/chifles/detalles-orden-produccion';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<DetalleOrdenProduccion[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<DetalleOrdenProduccion[]>(this.baseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al obtener detalles de orden de producción';
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<DetalleOrdenProduccion> {
    const { data } = await firstValueFrom(
      this.httpService.get<DetalleOrdenProduccion>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al obtener detalle de orden de producción con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async create(createDetalleOrdenProduccionInput: CreateDetalleOrdenProduccionInput): Promise<DetalleOrdenProduccion> {
    const { data } = await firstValueFrom(
      this.httpService.post<DetalleOrdenProduccion>(this.baseUrl, createDetalleOrdenProduccionInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al crear detalle de orden de producción';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateDetalleOrdenProduccionInput: UpdateDetalleOrdenProduccionInput): Promise<DetalleOrdenProduccion> {
    const { data } = await firstValueFrom(
      this.httpService.patch<DetalleOrdenProduccion>(`${this.baseUrl}/${id}`, updateDetalleOrdenProduccionInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al actualizar detalle de orden de producción con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async remove(id: number): Promise<DetalleOrdenProduccion> {
    const { data } = await firstValueFrom(
      this.httpService.delete<DetalleOrdenProduccion>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al eliminar detalle de orden de producción con id ${id}`;
        }),
      ),
    );
    return data;
  }
}
