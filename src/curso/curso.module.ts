import { forwardRef, Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [CursoController],
  providers: [CursoService],
  imports : [forwardRef(() => UsersModule)],
  exports : [CursoService]
})
export class CursoModule {}
