import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors} from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { usuarioValidoGuard } from '../common/guards/usuario-valido.guard';
import { LoggerMiddleware } from '../common/middleware/logger/logger.middleware';

@UseInterceptors(LoggerMiddleware)
@UseGuards(usuarioValidoGuard)
@Controller('matricula')
export class MatriculaController {
  constructor(private readonly matriculaService: MatriculaService) {}


  @Post()
  create(@Body() cursoId: CreateMatriculaDto, @Request() req : any) {
    const userId = req.user.id
    return this.matriculaService.CriarMatricula(userId, cursoId);
  }

  @Get()
  findAll() {
    return this.matriculaService.buscaTodasMatriculas();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matriculaService.retornaMatriculaPorId(id);
  }

  @Get('/aluno/:id')
  buscaPorAluno(@Param('id') id : string) {
    return this.matriculaService.buscaMatriculaPorAlunoId(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matriculaService.removerMatricula(id);
  }
}
