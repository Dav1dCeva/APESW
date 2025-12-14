import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly repo: Repository<Producto>,
  ) {}

  async descontarStock(productoId: number, cantidad: number) {
    const prod = await this.repo.findOne({ where: { id: productoId } });
    if (!prod) throw new Error('Producto no encontrado');

    if (prod.stock < cantidad) {
      throw new Error('Stock insuficiente');
    }

    prod.stock -= cantidad;
    return this.repo.save(prod);
  }
}
