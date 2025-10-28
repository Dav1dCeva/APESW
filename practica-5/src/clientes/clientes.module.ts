import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesResolver } from './clientes.resolver';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ClientesResolver, ClientesService],
})
export class ClientesModule {}
