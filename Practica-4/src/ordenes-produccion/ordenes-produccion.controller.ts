import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpCode } from '@nestjs/common';
import { OrdenesProduccionService } from './ordenes-produccion.service';
import { CreateOrdenesProduccionDto } from './dto/create-ordenes-produccion.dto';
import { UpdateOrdenesProduccionDto } from './dto/update-ordenes-produccion.dto';

@Controller('ordenes-produccion')
export class OrdenesProduccionController {
  constructor(private readonly ordenesProduccionService: OrdenesProduccionService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() createOrdenesProduccionDto: CreateOrdenesProduccionDto) {
    return this.ordenesProduccionService.create(createOrdenesProduccionDto);
  }

  @Get()
  findAll() {
    return this.ordenesProduccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordenesProduccionService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrdenesProduccionDto: UpdateOrdenesProduccionDto
  ) {
    return this.ordenesProduccionService.update(id, updateOrdenesProduccionDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordenesProduccionService.remove(id);
  }
}
