import { Controller, Post, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.criarUsuario(createUserDto);
  }
  @Get()
  findAll() { return this.usersService.listaTodosUsuarios(); }

  @Get("/:id")
  findOne(@Param('id') id: string) {
    return this.usersService.buscaUsuarioPorId(id)
  }

  @Patch('/:id')
  atualiza(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.editarUsuarioPorId(id, dto)
  }

  @Delete('/:id')
  deletar(@Param("id") id: string) {
    return this.usersService.excluirUsuario(id);
  }

}
