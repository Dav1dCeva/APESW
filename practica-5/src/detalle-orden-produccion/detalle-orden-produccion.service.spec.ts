import { Test, TestingModule } from '@nestjs/testing';
import { DetalleOrdenProduccionService } from './detalle-orden-produccion.service';

describe('DetalleOrdenProduccionService', () => {
  let service: DetalleOrdenProduccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleOrdenProduccionService],
    }).compile();

    service = module.get<DetalleOrdenProduccionService>(DetalleOrdenProduccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
