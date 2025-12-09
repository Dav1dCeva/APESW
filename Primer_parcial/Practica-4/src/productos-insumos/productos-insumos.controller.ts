import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpCode } from '@nestjs/common';
import { ProductosInsumosService } from './productos-insumos.service';
import { CreateProductoInsumoDto } from './dto/create-producto-insumo.dto';
import { UpdateProductoInsumoDto } from './dto/update-producto-insumo.dto';

@Controller('productos-insumos')
export class ProductosInsumosController {
  constructor(private readonly productosInsumosService: ProductosInsumosService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  create(@Body() createProductoInsumoDto: CreateProductoInsumoDto) {
    return this.productosInsumosService.create(createProductoInsumoDto);
  }

  @Get()
  findAll() {
    return this.productosInsumosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosInsumosService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoInsumoDto: UpdateProductoInsumoDto
  ) {
    return this.productosInsumosService.update(id, updateProductoInsumoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosInsumosService.remove(id);
  }
}
