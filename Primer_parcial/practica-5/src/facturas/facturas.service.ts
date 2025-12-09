import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Factura } from './entities/factura.entity';
import { CreateFacturaInput } from './dto/create-factura.input';
import { UpdateFacturaInput } from './dto/update-factura.input';

@Injectable()
export class FacturasService {
  private readonly logger = new Logger(FacturasService.name);
  private readonly baseUrl = 'http://localhost:3000/chifles/facturas';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Factura[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Factura[]>(this.baseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al obtener facturas';
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<Factura> {
    const { data } = await firstValueFrom(
      this.httpService.get<Factura>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al obtener factura con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async create(createFacturaInput: CreateFacturaInput): Promise<Factura> {
    const { data } = await firstValueFrom(
      this.httpService.post<Factura>(this.baseUrl, createFacturaInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al crear factura';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateFacturaInput: UpdateFacturaInput): Promise<Factura> {
    const { data } = await firstValueFrom(
      this.httpService.patch<Factura>(`${this.baseUrl}/${id}`, updateFacturaInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al actualizar factura con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async remove(id: number): Promise<Factura> {
    const { data } = await firstValueFrom(
      this.httpService.delete<Factura>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al eliminar factura con id ${id}`;
        }),
      ),
    );
    return data;
  }
}
