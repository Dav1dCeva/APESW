import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  constructor(@InjectRepository(Producto) private repo: Repository<Producto>) {}

  async create(createProductoDto: CreateProductoDto) {
    const p = this.repo.create(createProductoDto as Partial<Producto>);
    return this.repo.save(p);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const p = await this.repo.findOneBy({ id });
    if (!p) throw new NotFoundException(`Producto ${id} no encontrado`);
    return p;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const p = await this.repo.preload({ id, ...updateProductoDto } as any);
    if (!p) throw new NotFoundException(`Producto ${id} no encontrado`);
    return this.repo.save(p);
  }

  async remove(id: number) {
    const p = await this.repo.findOneBy({ id });
    if (!p) throw new NotFoundException(`Producto ${id} no encontrado`);
    return this.repo.remove(p);
  }
}
