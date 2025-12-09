import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Insumo } from './entities/insumo.entity';
import { CreateInsumoInput } from './dto/create-insumo.input';
import { UpdateInsumoInput } from './dto/update-insumo.input';

@Injectable()
export class InsumosService {
  private readonly logger = new Logger(InsumosService.name);
  private readonly baseUrl = 'http://localhost:3000/chifles/insumos';

  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Insumo[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Insumo[]>(this.baseUrl).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al obtener insumos';
        }),
      ),
    );
    return data;
  }

  async findOne(id: number): Promise<Insumo> {
    const { data } = await firstValueFrom(
      this.httpService.get<Insumo>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al obtener insumo con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async create(createInsumoInput: CreateInsumoInput): Promise<Insumo> {
    const { data } = await firstValueFrom(
      this.httpService.post<Insumo>(this.baseUrl, createInsumoInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'Error al crear insumo';
        }),
      ),
    );
    return data;
  }

  async update(id: number, updateInsumoInput: UpdateInsumoInput): Promise<Insumo> {
    const { data } = await firstValueFrom(
      this.httpService.patch<Insumo>(`${this.baseUrl}/${id}`, updateInsumoInput).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al actualizar insumo con id ${id}`;
        }),
      ),
    );
    return data;
  }

  async remove(id: number): Promise<Insumo> {
    const { data } = await firstValueFrom(
      this.httpService.delete<Insumo>(`${this.baseUrl}/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw `Error al eliminar insumo con id ${id}`;
        }),
      ),
    );
    return data;
  }
}
