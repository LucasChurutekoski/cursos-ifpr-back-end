import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CursoService {

  constructor(private readonly prisma: PrismaService, private readonly userService: UsersService) { }

  async criarCurso(dto: CreateCursoDto) {
    try {

      const novoCurso = await this.prisma.curso.create({
        data: {
          titulo: dto.titulo,
          descricao: dto.descricao,
          cargaHoraria: dto.cargaHoraria,
          categoriaId: dto.idCategoria
        }
      })
      return { message: "Curso cadastrado com sucesso" };

    } catch (error) {
      console.log("ERRO AO TENTAR CRIAR CURSO", error)
    }
  }

  async listarTodos() {
    return await this.prisma.curso.findMany({
      select: {
        id: true,
        titulo: true,
        descricao: true,
        cargaHoraria: true,
        categoria: true
      }
    })
  }

  async buscaCursoPorId(id: string) {
    const cursoExiste = await this.prisma.curso.findUnique({
      select: {
        id: true,
        titulo: true,
        descricao: true,
        cargaHoraria: true,
        categoria: true
      },
      where: {
        id: id
      }
    })
    if (!cursoExiste) {
      throw new NotFoundException("Não foi encontrada nenhum curso com este id", id)
    }
    return cursoExiste;

  }

  async atualizaPorId(id: string, updateCursoDto: UpdateCursoDto) {
    try {
      const cursoAtualizado = await this.prisma.curso.update({
        select: {
          titulo: true,
          descricao: true,
          cargaHoraria: true,
          categoria: true
        },
        data: updateCursoDto,
        where: {
          id: id
        }
      })
      return { message: "atualizado com sucesso", cursoAtualizado }
    }
    catch (error) {
      throw new NotFoundException("Não foi possível atualizar o curso");
    }
  }
  async excluirCursoPorId(id: string) {
    try {
      const cursoRemovido = await this.prisma.curso.delete({
        select: {
          titulo: true
        },
        where: {
          id: id
        }
      })
      return { message: "Curso excluído com sucesso", curso: cursoRemovido };
    } catch (error) {
      throw new NotFoundException(`Não foi possível excluir o curso com o id: ${id}. Id não encontrado`)
    }
  }
}
