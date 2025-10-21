import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(@InjectRepository(Cliente) private repo: Repository<Cliente>) {}

  async create(createClienteDto: CreateClienteDto) {
    const cliente = this.repo.create(createClienteDto);
    return this.repo.save(cliente);
  }

  async findAll() {
    return this.repo.find({ relations: ['pedidos'] });
  }

  async findOne(id: number) {
    const cliente = await this.repo.findOne({ where: { id }, relations: ['pedidos'] });
    if (!cliente) throw new NotFoundException(`Cliente ${id} no encontrado`);
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.repo.preload({ id, ...updateClienteDto });
    if (!cliente) throw new NotFoundException(`Cliente ${id} no encontrado`);
    return this.repo.save(cliente);
  }

  async remove(id: number) {
    const cliente = await this.repo.findOneBy({ id });
    if (!cliente) throw new NotFoundException(`Cliente ${id} no encontrado`);
    return this.repo.remove(cliente);
  }
}
