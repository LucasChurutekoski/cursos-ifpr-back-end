import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CursoService } from '../curso/curso.service';
import { log } from 'console';

@Injectable()
export class MatriculaService {

  constructor(private prisma: PrismaService, private alunoService: UsersService, private cursoService: CursoService) { }

  async CriarMatricula(alunoId: string, dto: CreateMatriculaDto) {
    try {
      const alunoExiste = await this.alunoService.buscaUsuarioPorId(alunoId);
      const cursoExiste = await this.cursoService.buscaCursoPorId(dto.cursoId);

      const matriculaCriada = await this.prisma.matricula.create({
        data: {
          alunoId: alunoExiste.id,
          cursoId: cursoExiste.id
        }
      })
      return { message: "Matricula Criada com sucesso", matricula: matriculaCriada };
    } catch (error) {
      log(error)
      throw new NotFoundException("Ocorreu um erro ao criar a matrícula");
    }
  }

  buscaTodasMatriculas() {
    return this.prisma.matricula.findMany({
      select: {
        id: true,
        aluno: true,
        curso: true
      }
    });
  }

  async buscaMatriculaPorAlunoId(id: string) {
    const matriculas = await this.prisma.matricula.findMany({
      where: {
        alunoId: id
      },
      select: {
        id: true,
        aluno: true,
        curso: true
      }
    })
    if (matriculas.length === 0) {
      throw new NotFoundException("Matriculas não encontradas para este aluno");
    }
    return matriculas;
  }

  async retornaMatriculaPorId(id: string) {
    const matriculaExiste = await this.prisma.matricula.findUnique({
      where: {
        id: id
      },
      include: { aluno: true }
    })
    if (!matriculaExiste) {
      throw new NotFoundException("Não foi possível encontrar a matricula");
    }
    return matriculaExiste;
  }

  async removerMatricula(id: string) {
    const matriculaRemovida = await this.prisma.matricula.delete({
      where: {
        id: id
      },

    })
    if (!matriculaRemovida) {
      throw new NotFoundException("Não foi possível realizar a desmatrícula");
    }
    return matriculaRemovida;
  }
}
