import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Factura } from './entities/factura.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Pedido } from '../pedidos/entities/pedido.entity';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura) private repo: Repository<Factura>,
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
    @InjectRepository(Pedido) private pedidoRepo: Repository<Pedido>
  ) {}

  async create(createFacturaDto: CreateFacturaDto) {
    // Validar cliente
    const cliente = await this.clienteRepo.findOneBy({ id: createFacturaDto.clienteId });
    if (!cliente) {
      throw new NotFoundException(`Cliente ${createFacturaDto.clienteId} no encontrado`);
    }

    // Validar pedido si se proporciona
    let pedido: Pedido | undefined;
    if (createFacturaDto.pedidoId) {
      const foundPedido = await this.pedidoRepo.findOneBy({ id: createFacturaDto.pedidoId });
      if (!foundPedido) {
        throw new NotFoundException(`Pedido ${createFacturaDto.pedidoId} no encontrado`);
      }
      pedido = foundPedido;
    }

    const factura = this.repo.create({
      fecha: createFacturaDto.fecha,
      subtotal: createFacturaDto.subtotal,
      iva: createFacturaDto.iva,
      total: createFacturaDto.total,
      cliente,
      clienteId: createFacturaDto.clienteId,
      pedido,
      pedidoId: createFacturaDto.pedidoId
    });

    return this.repo.save(factura);
  }

  async findAll() {
    return this.repo.find({ 
      relations: ['cliente', 'pedido'],
      order: { id: 'DESC' } 
    });
  }

  async findOne(id: number) {
    const factura = await this.repo.findOne({ 
      where: { id }, 
      relations: ['cliente', 'pedido'] 
    });
    if (!factura) throw new NotFoundException(`Factura ${id} no encontrada`);
    return factura;
  }

  async update(id: number, updateFacturaDto: UpdateFacturaDto) {
    const factura = await this.repo.findOneBy({ id });
    if (!factura) throw new NotFoundException(`Factura ${id} no encontrada`);

    if (updateFacturaDto.clienteId) {
      const cliente = await this.clienteRepo.findOneBy({ id: updateFacturaDto.clienteId });
      if (!cliente) throw new NotFoundException(`Cliente ${updateFacturaDto.clienteId} no encontrado`);
      factura.cliente = cliente;
      factura.clienteId = updateFacturaDto.clienteId;
    }

    if (updateFacturaDto.pedidoId) {
      const pedido = await this.pedidoRepo.findOneBy({ id: updateFacturaDto.pedidoId });
      if (!pedido) throw new NotFoundException(`Pedido ${updateFacturaDto.pedidoId} no encontrado`);
      factura.pedido = pedido;
      factura.pedidoId = updateFacturaDto.pedidoId;
    }

    if (updateFacturaDto.fecha !== undefined) factura.fecha = updateFacturaDto.fecha;
    if (updateFacturaDto.total !== undefined) factura.total = updateFacturaDto.total as any;

    return this.repo.save(factura);
  }

  async remove(id: number) {
    const factura = await this.repo.findOneBy({ id });
    if (!factura) throw new NotFoundException(`Factura ${id} no encontrada`);
    return this.repo.remove(factura);
  }
}
