import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpCode } from '@nestjs/common';
import { DetallesOrdenProduccionService } from './detalles-orden-produccion.service';
import { CreateDetallesOrdenProduccionDto } from './dto/create-detalles-orden-produccion.dto';
import { UpdateDetallesOrdenProduccionDto } from './dto/update-detalles-orden-produccion.dto';

@Controller('detalles-orden-produccion')
export class DetallesOrdenProduccionController {
  constructor(private readonly detallesOrdenProduccionService: DetallesOrdenProduccionService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() createDetallesOrdenProduccionDto: CreateDetallesOrdenProduccionDto) {
    return this.detallesOrdenProduccionService.create(createDetallesOrdenProduccionDto);
  }

  @Get()
  findAll() {
    return this.detallesOrdenProduccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detallesOrdenProduccionService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetallesOrdenProduccionDto: UpdateDetallesOrdenProduccionDto
  ) {
    return this.detallesOrdenProduccionService.update(id, updateDetallesOrdenProduccionDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detallesOrdenProduccionService.remove(id);
  }
}
