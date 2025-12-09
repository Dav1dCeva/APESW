import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PedidosService } from './pedidos.service';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoInput } from './dto/create-pedido.input';
import { UpdatePedidoInput } from './dto/update-pedido.input';

@Resolver(() => Pedido)
export class PedidosResolver {
  constructor(private readonly pedidosService: PedidosService) {}

  @Mutation(() => Pedido)
  createPedido(@Args('createPedidoInput') createPedidoInput: CreatePedidoInput) {
    return this.pedidosService.create(createPedidoInput);
  }

  @Query(() => [Pedido], { name: 'pedidos' })
  findAll() {
    return this.pedidosService.findAll();
  }

  @Query(() => Pedido, { name: 'pedido' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pedidosService.findOne(id);
  }

  @Mutation(() => Pedido)
  updatePedido(@Args('updatePedidoInput') updatePedidoInput: UpdatePedidoInput) {
    return this.pedidosService.update(updatePedidoInput.id, updatePedidoInput);
  }

  @Mutation(() => Pedido)
  removePedido(@Args('id', { type: () => Int }) id: number) {
    return this.pedidosService.remove(id);
  }
}
