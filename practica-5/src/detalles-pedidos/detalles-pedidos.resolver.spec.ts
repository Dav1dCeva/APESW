import { Test, TestingModule } from '@nestjs/testing';
import { DetallesPedidosResolver } from './detalles-pedidos.resolver';
import { DetallesPedidosService } from './detalles-pedidos.service';

describe('DetallesPedidosResolver', () => {
  let resolver: DetallesPedidosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallesPedidosResolver, DetallesPedidosService],
    }).compile();

    resolver = module.get<DetallesPedidosResolver>(DetallesPedidosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
