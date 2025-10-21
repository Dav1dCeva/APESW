import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoInsumoDto } from './dto/create-producto-insumo.dto';
import { UpdateProductoInsumoDto } from './dto/update-producto-insumo.dto';
import { ProductoInsumo } from './entities/producto-insumo.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Insumo } from '../insumos/entities/insumo.entity';

@Injectable()
export class ProductosInsumosService {
  constructor(
    @InjectRepository(ProductoInsumo) private repo: Repository<ProductoInsumo>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
    @InjectRepository(Insumo) private insumoRepo: Repository<Insumo>
  ) {}

  async create(dto: CreateProductoInsumoDto) {
    const producto = await this.productoRepo.findOneBy({ id: dto.productoId });
    if (!producto) {
      throw new NotFoundException(`Producto ${dto.productoId} no encontrado`);
    }

    const insumo = await this.insumoRepo.findOneBy({ id: dto.insumoId });
    if (!insumo) {
      throw new NotFoundException(`Insumo ${dto.insumoId} no encontrado`);
    }

    const productoInsumo = this.repo.create({
      cantidad_necesaria: dto.cantidad_necesaria,
      producto,
      productoId: dto.productoId,
      insumo,
      insumoId: dto.insumoId
    });

    return this.repo.save(productoInsumo);
  }

  async findAll() {
    return this.repo.find({
      relations: ['producto', 'insumo'],
      order: { id: 'DESC' }
    });
  }

  async findOne(id: number) {
    const productoInsumo = await this.repo.findOne({
      where: { id },
      relations: ['producto', 'insumo']
    });

    if (!productoInsumo) {
      throw new NotFoundException(`Producto-Insumo ${id} no encontrado`);
    }

    return productoInsumo;
  }

  async update(id: number, dto: UpdateProductoInsumoDto) {
    const productoInsumo = await this.repo.findOneBy({ id });
    if (!productoInsumo) {
      throw new NotFoundException(`Producto-Insumo ${id} no encontrado`);
    }

    if (dto.productoId) {
      const producto = await this.productoRepo.findOneBy({ id: dto.productoId });
      if (!producto) {
        throw new NotFoundException(`Producto ${dto.productoId} no encontrado`);
      }
      productoInsumo.producto = producto;
      productoInsumo.productoId = dto.productoId;
    }

    if (dto.insumoId) {
      const insumo = await this.insumoRepo.findOneBy({ id: dto.insumoId });
      if (!insumo) {
        throw new NotFoundException(`Insumo ${dto.insumoId} no encontrado`);
      }
      productoInsumo.insumo = insumo;
      productoInsumo.insumoId = dto.insumoId;
    }

    if (dto.cantidad_necesaria !== undefined) {
      productoInsumo.cantidad_necesaria = dto.cantidad_necesaria;
    }

    return this.repo.save(productoInsumo);
  }

  async remove(id: number) {
    const productoInsumo = await this.repo.findOneBy({ id });
    if (!productoInsumo) {
      throw new NotFoundException(`Producto-Insumo ${id} no encontrado`);
    }
    await this.repo.remove(productoInsumo);
  }
}
