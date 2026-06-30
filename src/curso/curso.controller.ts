import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { AdminGuard } from '../common/guards/admin.guard';
import { LoggerMiddleware } from '../common/middleware/logger/logger.middleware';


@UseInterceptors(LoggerMiddleware)
@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.criarCurso(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursoService.listarTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoService.buscaCursoPorId(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.atualizaPorId(id, updateCursoDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.excluirCursoPorId(id);
  }
}
