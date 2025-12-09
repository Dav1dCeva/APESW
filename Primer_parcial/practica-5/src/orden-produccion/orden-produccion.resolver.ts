import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdenProduccionService } from './orden-produccion.service';
import { OrdenProduccion } from './entities/orden-produccion.entity';
import { CreateOrdenProduccionInput } from './dto/create-orden-produccion.input';
import { UpdateOrdenProduccionInput } from './dto/update-orden-produccion.input';

@Resolver(() => OrdenProduccion)
export class OrdenProduccionResolver {
  constructor(private readonly ordenProduccionService: OrdenProduccionService) {}

  @Mutation(() => OrdenProduccion)
  createOrdenProduccion(@Args('createOrdenProduccionInput') createOrdenProduccionInput: CreateOrdenProduccionInput) {
    return this.ordenProduccionService.create(createOrdenProduccionInput);
  }

  @Query(() => [OrdenProduccion], { name: 'ordenProduccion' })
  findAll() {
    return this.ordenProduccionService.findAll();
  }

  @Query(() => OrdenProduccion, { name: 'ordenProduccion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ordenProduccionService.findOne(id);
  }

  @Mutation(() => OrdenProduccion)
  updateOrdenProduccion(@Args('updateOrdenProduccionInput') updateOrdenProduccionInput: UpdateOrdenProduccionInput) {
    return this.ordenProduccionService.update(updateOrdenProduccionInput.id, updateOrdenProduccionInput);
  }

  @Mutation(() => OrdenProduccion)
  removeOrdenProduccion(@Args('id', { type: () => Int }) id: number) {
    return this.ordenProduccionService.remove(id);
  }
}
