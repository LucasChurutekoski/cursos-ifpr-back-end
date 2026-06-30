import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriaService.listarCategorias();
  }

  @Get("/:id")
  findOne(@Param ("id") id : string){
    return this.categoriaService.buscarCategoriaPorId(id);
  }

  @Get('/filtro/:nome')
  buscaUmPorNome(@Query('nome') nome : string){
    return this.categoriaService.buscaCategoriaPorNome(nome)
  }

  @UseGuards(AdminGuard)
  @Patch("/:id")
  update(@Param("id") id : string, @Body() dto : UpdateCategoriaDto){
    return this.categoriaService.editaCategoriaPorId(id, dto)
  }

  @UseGuards(AdminGuard)
  @Delete("/:id")
  delete(@Param("id") id : string){
    return this.categoriaService.deletarCategoriaPorId(id);
  }
}
