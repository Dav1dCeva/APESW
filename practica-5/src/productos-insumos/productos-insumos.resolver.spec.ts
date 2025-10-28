import { Test, TestingModule } from '@nestjs/testing';
import { ProductosInsumosResolver } from './productos-insumos.resolver';
import { ProductosInsumosService } from './productos-insumos.service';

describe('ProductosInsumosResolver', () => {
  let resolver: ProductosInsumosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductosInsumosResolver, ProductosInsumosService],
    }).compile();

    resolver = module.get<ProductosInsumosResolver>(ProductosInsumosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
