import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteInput } from './dto/create-cliente.input';
import { UpdateClienteInput } from './dto/update-cliente.input';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Resolver(() => Cliente)
export class ClientesResolver {
  constructor(private readonly clientesService: ClientesService) {}

  @Query(() => [Cliente], { name: 'clientes' })
  findAll() {
    return this.clientesService.findAll();
  }

  @Query(() => Cliente, { name: 'cliente' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clientesService.findOne(id);
  }

  @Mutation(() => Cliente)
  createCliente(@Args('createClienteInput') createClienteInput: CreateClienteInput) {
    return this.clientesService.create(createClienteInput);
  }

  @Mutation(() => Cliente)
  updateCliente(@Args('updateClienteInput') updateClienteInput: UpdateClienteInput) {
    return this.clientesService.update(updateClienteInput.id, updateClienteInput);
  }

  @Mutation(() => Cliente)
  removeCliente(@Args('id', { type: () => Int }) id: number) {
    return this.clientesService.remove(id);
  }

  @ResolveField(() => [Pedido])
  async pedidos(@Parent() cliente: Cliente) {
    return this.clientesService.findPedidosByCliente(cliente.id);
  }
}
