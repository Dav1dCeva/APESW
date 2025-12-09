import { Test, TestingModule } from '@nestjs/testing';
import { DetalleOrdenProduccionResolver } from './detalle-orden-produccion.resolver';
import { DetalleOrdenProduccionService } from './detalle-orden-produccion.service';

describe('DetalleOrdenProduccionResolver', () => {
  let resolver: DetalleOrdenProduccionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleOrdenProduccionResolver, DetalleOrdenProduccionService],
    }).compile();

    resolver = module.get<DetalleOrdenProduccionResolver>(DetalleOrdenProduccionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
