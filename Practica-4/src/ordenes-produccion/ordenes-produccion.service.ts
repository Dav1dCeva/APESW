import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrdenesProduccionDto } from './dto/create-ordenes-produccion.dto';
import { UpdateOrdenesProduccionDto } from './dto/update-ordenes-produccion.dto';
import { OrdenProduccion } from './entities/ordenes-produccion.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class OrdenesProduccionService {
  constructor(@InjectRepository(OrdenProduccion) private repo: Repository<OrdenProduccion>, @InjectRepository(Producto) private productoRepo: Repository<Producto>) {}

  async create(dto: CreateOrdenesProduccionDto) {
    const producto = await this.productoRepo.findOneBy({ id: dto.productoId });
    if (!producto) throw new NotFoundException(`Producto ${dto.productoId} no encontrado`);

    const orden = this.repo.create({
      fecha_inicio: dto.fecha_inicio,
      fecha_fin: dto.fecha_fin,
      estado: dto.estado || 'pendiente',
      cantidad_producir: dto.cantidad_producir,
      costo_total: dto.costo_total || 0,
      producto,
      productoId: dto.productoId
    });

    return this.repo.save(orden);
  }

  async findAll() {
    return this.repo.find({ 
      relations: ['producto', 'detalles', 'detalles.insumo'],
      order: { id: 'DESC' } 
    });
  }

  async findOne(id: number) {
    const orden = await this.repo.findOne({ 
      where: { id }, 
      relations: ['producto', 'detalles', 'detalles.insumo'] 
    });
    if (!orden) throw new NotFoundException(`Orden ${id} no encontrada`);
    return orden;
  }

  async update(id: number, dto: UpdateOrdenesProduccionDto) {
    const orden = await this.repo.findOne({ where: { id } });
    if (!orden) throw new NotFoundException(`Orden ${id} no encontrada`);

    if (dto.productoId) {
      const producto = await this.productoRepo.findOneBy({ id: dto.productoId });
      if (!producto) throw new NotFoundException(`Producto ${dto.productoId} no encontrado`);
      orden.producto = producto;
      orden.productoId = dto.productoId;
    }

    if (dto.fecha_inicio !== undefined) orden.fecha_inicio = dto.fecha_inicio;
    if (dto.fecha_fin !== undefined) orden.fecha_fin = dto.fecha_fin;
    if (dto.estado !== undefined) orden.estado = dto.estado;
    if (dto.cantidad_producir !== undefined) orden.cantidad_producir = dto.cantidad_producir;
    if (dto.costo_total !== undefined) orden.costo_total = dto.costo_total;
    return this.repo.save(orden);
  }

  async remove(id: number) {
    const o = await this.repo.findOneBy({ id });
    if (!o) throw new NotFoundException(`Orden ${id} no encontrada`);
    return this.repo.remove(o);
  }
}
