import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetalleOrdenProduccionService } from './detalle-orden-produccion.service';
import { DetalleOrdenProduccion } from './entities/detalle-orden-produccion.entity';
import { CreateDetalleOrdenProduccionInput } from './dto/create-detalle-orden-produccion.input';
import { UpdateDetalleOrdenProduccionInput } from './dto/update-detalle-orden-produccion.input';

@Resolver(() => DetalleOrdenProduccion)
export class DetalleOrdenProduccionResolver {
  constructor(private readonly detalleOrdenProduccionService: DetalleOrdenProduccionService) {}

  @Mutation(() => DetalleOrdenProduccion)
  createDetalleOrdenProduccion(@Args('createDetalleOrdenProduccionInput') createDetalleOrdenProduccionInput: CreateDetalleOrdenProduccionInput) {
    return this.detalleOrdenProduccionService.create(createDetalleOrdenProduccionInput);
  }

  @Query(() => [DetalleOrdenProduccion], { name: 'detalleOrdenProduccion' })
  findAll() {
    return this.detalleOrdenProduccionService.findAll();
  }

  @Query(() => DetalleOrdenProduccion, { name: 'detalleOrdenProduccion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.detalleOrdenProduccionService.findOne(id);
  }

  @Mutation(() => DetalleOrdenProduccion)
  updateDetalleOrdenProduccion(@Args('updateDetalleOrdenProduccionInput') updateDetalleOrdenProduccionInput: UpdateDetalleOrdenProduccionInput) {
    return this.detalleOrdenProduccionService.update(updateDetalleOrdenProduccionInput.id, updateDetalleOrdenProduccionInput);
  }

  @Mutation(() => DetalleOrdenProduccion)
  removeDetalleOrdenProduccion(@Args('id', { type: () => Int }) id: number) {
    return this.detalleOrdenProduccionService.remove(id);
  }
}
