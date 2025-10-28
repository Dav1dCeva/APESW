import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { Insumo } from './entities/insumo.entity';

@Injectable()
export class InsumosService {
  constructor(@InjectRepository(Insumo) private repo: Repository<Insumo>) {}

  async create(createInsumoDto: CreateInsumoDto) {
    const i = this.repo.create(createInsumoDto as Partial<Insumo>);
    return this.repo.save(i);
  }

  async findAll() {
    return this.repo.find({ 
      relations: ['detallesOrden', 'productosInsumos'],
      order: { id: 'DESC' }
    });
  }

  async findOne(id: number) {
    const i = await this.repo.findOne({ 
      where: { id }, 
      relations: ['detallesOrden', 'productosInsumos'] 
    });
    if (!i) throw new NotFoundException(`Insumo ${id} no encontrado`);
    return i;
  }

  async update(id: number, updateInsumoDto: UpdateInsumoDto) {
    const i = await this.repo.preload({ id, ...updateInsumoDto } as any);
    if (!i) throw new NotFoundException(`Insumo ${id} no encontrado`);
    return this.repo.save(i);
  }

  async remove(id: number) {
    const i = await this.repo.findOneBy({ id });
    if (!i) throw new NotFoundException(`Insumo ${id} no encontrado`);
    return this.repo.remove(i);
  }
}
