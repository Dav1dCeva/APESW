import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetallesPedidosService } from './detalles-pedidos.service';
import { DetallePedido } from './entities/detalles-pedido.entity';
import { CreateDetallesPedidoInput } from './dto/create-detalles-pedido.input';
import { UpdateDetallesPedidoInput } from './dto/update-detalles-pedido.input';

@Resolver(() => DetallePedido)
export class DetallesPedidosResolver {
  constructor(private readonly detallesPedidosService: DetallesPedidosService) {}

  @Mutation(() => DetallePedido)
  createDetallesPedido(@Args('createDetallesPedidoInput') createDetallesPedidoInput: CreateDetallesPedidoInput) {
    return this.detallesPedidosService.create(createDetallesPedidoInput);
  }

  @Query(() => [DetallePedido], { name: 'detallesPedidos' })
  findAll() {
    return this.detallesPedidosService.findAll();
  }

  @Query(() => DetallePedido, { name: 'detallesPedido' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.detallesPedidosService.findOne(id);
  }

  @Mutation(() => DetallePedido)
  updateDetallesPedido(@Args('updateDetallesPedidoInput') updateDetallesPedidoInput: UpdateDetallesPedidoInput) {
    return this.detallesPedidosService.update(updateDetallesPedidoInput.id, updateDetallesPedidoInput);
  }

  @Mutation(() => DetallePedido)
  removeDetallesPedido(@Args('id', { type: () => Int }) id: number) {
    return this.detallesPedidosService.remove(id);
  }
}
