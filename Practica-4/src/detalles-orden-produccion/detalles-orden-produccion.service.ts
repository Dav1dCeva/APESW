import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetallesOrdenProduccionDto } from './dto/create-detalles-orden-produccion.dto';
import { UpdateDetallesOrdenProduccionDto } from './dto/update-detalles-orden-produccion.dto';
import { DetalleOrdenProduccion } from './entities/detalles-orden-produccion.entity';
import { OrdenProduccion } from '../ordenes-produccion/entities/ordenes-produccion.entity';
import { Insumo } from '../insumos/entities/insumo.entity';

@Injectable()
export class DetallesOrdenProduccionService {
  constructor(@InjectRepository(DetalleOrdenProduccion) private repo: Repository<DetalleOrdenProduccion>, @InjectRepository(OrdenProduccion) private ordenRepo: Repository<OrdenProduccion>, @InjectRepository(Insumo) private insumoRepo: Repository<Insumo>) {}

  async create(dto: CreateDetallesOrdenProduccionDto) {
    const orden = await this.ordenRepo.findOneBy({ id: dto.ordenProduccionId });
    if (!orden) throw new NotFoundException(`Orden ${dto.ordenProduccionId} no encontrada`);
    
    const insumo = await this.insumoRepo.findOneBy({ id: dto.insumoId });
    if (!insumo) throw new NotFoundException(`Insumo ${dto.insumoId} no encontrado`);

    const detalle = this.repo.create({
      cantidad_utilizada: dto.cantidad_utilizada,
      costo_unitario: dto.costo_unitario,
      subtotal: dto.subtotal,
      ordenProduccion: orden,
      ordenProduccionId: dto.ordenProduccionId,
      insumo: insumo,
      insumoId: dto.insumoId
    });
    
    return this.repo.save(detalle);
  }

  async findAll() {
    return this.repo.find({ 
      relations: ['ordenProduccion', 'insumo'],
      order: { id: 'DESC' } 
    });
  }

  async findOne(id: number) {
    const detalle = await this.repo.findOne({ 
      where: { id }, 
      relations: ['ordenProduccion', 'insumo'] 
    });
    if (!detalle) throw new NotFoundException(`Detalle ${id} no encontrado`);
    return detalle;
  }

  async update(id: number, dto: UpdateDetallesOrdenProduccionDto) {
    const detalle = await this.repo.findOne({ where: { id } });
    if (!detalle) throw new NotFoundException(`Detalle ${id} no encontrado`);

    if (dto.ordenProduccionId) {
      const orden = await this.ordenRepo.findOneBy({ id: dto.ordenProduccionId });
      if (!orden) throw new NotFoundException(`Orden ${dto.ordenProduccionId} no encontrada`);
      detalle.ordenProduccion = orden;
      detalle.ordenProduccionId = dto.ordenProduccionId;
    }

    if (dto.insumoId) {
      const insumo = await this.insumoRepo.findOneBy({ id: dto.insumoId });
      if (!insumo) throw new NotFoundException(`Insumo ${dto.insumoId} no encontrado`);
      detalle.insumo = insumo;
      detalle.insumoId = dto.insumoId;
    }

    if (dto.cantidad_utilizada !== undefined) detalle.cantidad_utilizada = dto.cantidad_utilizada;
    if (dto.costo_unitario !== undefined) detalle.costo_unitario = dto.costo_unitario;
    if (dto.subtotal !== undefined) detalle.subtotal = dto.subtotal;

    return this.repo.save(detalle);
  }

  async remove(id: number) {
    const d = await this.repo.findOneBy({ id });
    if (!d) throw new NotFoundException(`Detalle ${id} no encontrado`);
    return this.repo.remove(d);
  }
}
