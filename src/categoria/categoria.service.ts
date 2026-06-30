import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { contains } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateCategoriaDto) {
    const categoria = await this.prisma.categoria.create({
      data: {
        nome: dto.nome,
        descricao: dto.descricao.toLowerCase(),
      },
    });
    return categoria;
  }

  async listarCategorias() {
    return await this.prisma.categoria.findMany({
      select: {
        nome: true,
        descricao: true,
        id: true
      }
    });
  }

  async buscarCategoriaPorId(id: string) {
    const categoriaExiste = await this.prisma.categoria.findUnique({
      where: {
        id: id
      }
    })
    if (!categoriaExiste) {
      throw new NotFoundException("Categoria com esse id não existe");
    }
    return categoriaExiste;
  }

  async buscaCategoriaPorNome(nome: string) {
    const categoriaExiste = await this.prisma.categoria.findMany({
      where: {
        nome: {
          contains: nome
        }
      }
    })
    if (categoriaExiste.length === 0) {
      throw new NotFoundException("Nenhuma categoria encontrada");
    }
    return categoriaExiste;
  }

  async editaCategoriaPorId(id: string, dto: UpdateCategoriaDto) {
    const categoriaEditada = await this.prisma.categoria.update({
      where: {
        id: id
      },
      data: {
        descricao: dto.descricao,
        nome: dto.nome
      }
    })
    if (!categoriaEditada) {
      throw new NotFoundException("Não foi encontrado um curso com esse id");
    }
    return categoriaEditada
  }

  async deletarCategoriaPorId(id: string) {
    try {
      const categoriaExcluida = await this.prisma.categoria.delete({
        select: {
          nome: true,
          id: true
        },
        where: {
          id: id
        }
      })
      return { message: "Categoria excluída com sucesso", categoriaExcluida }
    }
    catch (error) {
      throw new NotFoundException("Categoria não encontrada para realizar a exclusão");
    }

  }
}
