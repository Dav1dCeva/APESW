import { Test, TestingModule } from '@nestjs/testing';
import { OrdenProduccionResolver } from './orden-produccion.resolver';
import { OrdenProduccionService } from './orden-produccion.service';

describe('OrdenProduccionResolver', () => {
  let resolver: OrdenProduccionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenProduccionResolver, OrdenProduccionService],
    }).compile();

    resolver = module.get<OrdenProduccionResolver>(OrdenProduccionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
