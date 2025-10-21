import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpCode } from '@nestjs/common';
import { DetallesPedidosService } from './detalles-pedidos.service';
import { CreateDetallesPedidoDto } from './dto/create-detalles-pedido.dto';
import { UpdateDetallesPedidoDto } from './dto/update-detalles-pedido.dto';

@Controller('detalles-pedidos')
export class DetallesPedidosController {
  constructor(private readonly detallesPedidosService: DetallesPedidosService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() createDetallesPedidoDto: CreateDetallesPedidoDto) {
    return this.detallesPedidosService.create(createDetallesPedidoDto);
  }

  @Get()
  findAll() {
    return this.detallesPedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detallesPedidosService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetallesPedidoDto: UpdateDetallesPedidoDto
  ) {
    return this.detallesPedidosService.update(id, updateDetallesPedidoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detallesPedidosService.remove(id);
  }
}
