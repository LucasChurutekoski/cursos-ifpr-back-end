import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  
  async criarUsuario(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException(`Já existe o e-mail ${dto.email}.`);
    }
    const user = await this.prisma.user.create({
      select : {
        name : true,
        email : true
      },
      data: {
        name: dto.name,
        email: dto.email.toLowerCase(),
        tipoAcesso : dto.tipoAcesso
      },
    });
    return {message : "Usuário criado com sucesso", user : user }; 
  }
  async listaTodosUsuarios() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      },
    });
  }
  async buscaUsuarioPorId(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id : id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`ID ${id} não encontrado.`);
    }
    return user;
  }

  async editarUsuarioPorId(id : string, dto : UpdateUserDto){
    try {
      return await this.prisma.user.update({where : {id : id}, data : {
        name : dto.name,
        email : dto.email
      }})
    } catch (error) {
      throw new InternalServerErrorException("Ocorreu um erro interno ao tentar atualizar o usuário");
    }
  }

  async excluirUsuario(id : string) {
    try {
      return await this.prisma.user.delete({where : {id : id}})
    } catch (error) {
      throw new InternalServerErrorException("Não foi possível excluir este usuário")
    }
  }
}
