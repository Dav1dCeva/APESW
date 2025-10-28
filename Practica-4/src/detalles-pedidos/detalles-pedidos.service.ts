import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetallesPedidoDto } from './dto/create-detalles-pedido.dto';
import { UpdateDetallesPedidoDto } from './dto/update-detalles-pedido.dto';
import { DetallePedido } from './entities/detalles-pedido.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class DetallesPedidosService {
  constructor(
    @InjectRepository(DetallePedido) private repo: Repository<DetallePedido>,
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>,
    @InjectRepository(Producto) private productoRepo: Repository<Producto>,
  ) {}

  async create(createDetallesPedidoDto: CreateDetallesPedidoDto) {
    const pedido = await this.pedidoRepo.findOneBy({ id: createDetallesPedidoDto.pedidoId });
    if (!pedido) {
      throw new NotFoundException(`Pedido ${createDetallesPedidoDto.pedidoId} no encontrado`);
    }

    const producto = await this.productoRepo.findOneBy({ id: createDetallesPedidoDto.productoId });
    if (!producto) {
      throw new NotFoundException(`Producto ${createDetallesPedidoDto.productoId} no encontrado`);
    }

    const detalle = this.repo.create({
      ...createDetallesPedidoDto,
      pedido,
      producto
    });

    return this.repo.save(detalle);
  }

  async findAll() {
    return this.repo.find({
      relations: ['pedido', 'producto'],
      order: { id: 'DESC' }
    });
  }

  async findOne(id: number) {
    const detalle = await this.repo.findOne({
      where: { id },
      relations: ['pedido', 'producto']
    });

    if (!detalle) {
      throw new NotFoundException(`Detalle de pedido ${id} no encontrado`);
    }

    return detalle;
  }

  async update(id: number, updateDetallesPedidoDto: UpdateDetallesPedidoDto) {
    const detalle = await this.repo.findOneBy({ id });
    if (!detalle) {
      throw new NotFoundException(`Detalle de pedido ${id} no encontrado`);
    }

    if (updateDetallesPedidoDto.pedidoId) {
      const pedido = await this.pedidoRepo.findOneBy({ id: updateDetallesPedidoDto.pedidoId });
      if (!pedido) {
        throw new NotFoundException(`Pedido ${updateDetallesPedidoDto.pedidoId} no encontrado`);
      }
      detalle.pedido = pedido;
    }

    if (updateDetallesPedidoDto.productoId) {
      const producto = await this.productoRepo.findOneBy({ id: updateDetallesPedidoDto.productoId });
      if (!producto) {
        throw new NotFoundException(`Producto ${updateDetallesPedidoDto.productoId} no encontrado`);
      }
      detalle.producto = producto;
    }

    Object.assign(detalle, updateDetallesPedidoDto);
    return this.repo.save(detalle);
  }

  async remove(id: number) {
    const detalle = await this.repo.findOneBy({ id });
    if (!detalle) {
      throw new NotFoundException(`Detalle de pedido ${id} no encontrado`);
    }
    await this.repo.remove(detalle);
  }
}
