import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { Cliente } from '../clientes/entities/cliente.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private repo: Repository<Pedido>,
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const cliente = await this.clienteRepo.findOneBy({ id: createPedidoDto.clienteId });
    if (!cliente) throw new NotFoundException(`Cliente ${createPedidoDto.clienteId} no encontrado`);

    const pedido = this.repo.create({
      fecha: createPedidoDto.fecha,
      total: createPedidoDto.total,
      estado: createPedidoDto.estado,
      cliente: cliente,
      facturaId: createPedidoDto.facturaId ?? undefined,
    } as Partial<Pedido>);

    return this.repo.save(pedido);
  }

  async findAll() {
    return this.repo.find({ relations: ['cliente'] });
  }

  async findOne(id: number) {
    const pedido = await this.repo.findOne({ where: { id }, relations: ['cliente'] });
    if (!pedido) throw new NotFoundException(`Pedido ${id} no encontrado`);
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    const pedido = await this.repo.findOne({ where: { id } });
    if (!pedido) throw new NotFoundException(`Pedido ${id} no encontrado`);

    if (updatePedidoDto.clienteId) {
      const cliente = await this.clienteRepo.findOneBy({ id: updatePedidoDto.clienteId });
      if (!cliente) throw new NotFoundException(`Cliente ${updatePedidoDto.clienteId} no encontrado`);
      pedido.cliente = cliente;
    }

    if (updatePedidoDto.fecha !== undefined) pedido.fecha = updatePedidoDto.fecha;
    if (updatePedidoDto.total !== undefined) pedido.total = updatePedidoDto.total as any;
    if (updatePedidoDto.estado !== undefined) pedido.estado = updatePedidoDto.estado;
    if (updatePedidoDto.facturaId !== undefined) pedido.facturaId = updatePedidoDto.facturaId as any;

    return this.repo.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.repo.findOneBy({ id });
    if (!pedido) throw new NotFoundException(`Pedido ${id} no encontrado`);
    return this.repo.remove(pedido);
  }
}
