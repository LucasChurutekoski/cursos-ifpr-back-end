import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { PrismaModule } from './prisma/prisma.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CursoModule } from './curso/curso.module';
import { MatriculaModule } from './matricula/matricula.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { CursoController } from './curso/curso.controller';
import { MatriculaController } from './matricula/matricula.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),UsersModule, PrismaModule, CategoriaModule, CursoModule, MatriculaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
    .forRoutes(CursoController, MatriculaController)
  }
}
