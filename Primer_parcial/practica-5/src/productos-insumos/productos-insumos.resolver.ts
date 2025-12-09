import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductosInsumosService } from './productos-insumos.service';
import { ProductoInsumo } from './entities/productos-insumo.entity';
import { CreateProductosInsumoInput } from './dto/create-productos-insumo.input';
import { UpdateProductosInsumoInput } from './dto/update-productos-insumo.input';

@Resolver(() => ProductoInsumo)
export class ProductosInsumosResolver {
  constructor(private readonly productosInsumosService: ProductosInsumosService) {}

  @Mutation(() => ProductoInsumo)
  createProductosInsumo(@Args('createProductosInsumoInput') createProductosInsumoInput: CreateProductosInsumoInput) {
    return this.productosInsumosService.create(createProductosInsumoInput);
  }

  @Query(() => [ProductoInsumo], { name: 'productosInsumos' })
  findAll() {
    return this.productosInsumosService.findAll();
  }

  @Query(() => ProductoInsumo, { name: 'productosInsumo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productosInsumosService.findOne(id);
  }

  @Mutation(() => ProductoInsumo)
  updateProductosInsumo(@Args('updateProductosInsumoInput') updateProductosInsumoInput: UpdateProductosInsumoInput) {
    return this.productosInsumosService.update(updateProductosInsumoInput.id, updateProductosInsumoInput);
  }

  @Mutation(() => ProductoInsumo)
  removeProductosInsumo(@Args('id', { type: () => Int }) id: number) {
    return this.productosInsumosService.remove(id);
  }
}
