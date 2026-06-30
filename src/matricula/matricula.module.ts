import { Module } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { UsersModule } from '../users/users.module';
import { CursoModule } from '../curso/curso.module';

@Module({
  imports : [UsersModule, CursoModule],
  controllers: [MatriculaController],
  providers: [MatriculaService],
})
export class MatriculaModule {}
