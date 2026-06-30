import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = new Date().toLocaleTimeString();
    if(req.originalUrl.includes('/curso') && req.method === 'GET'){
      console.log("Acesso para listar cursos");
    }
    if(req.originalUrl.includes('/matricula') && req.method === 'POST'){
      console.log('Tentativa de matrícula');
    }
    if(req.originalUrl.includes('/curso') && req.method === 'DELETE'){
      console.log("Tentativa de exclusão de curso");
    }
    if(req.originalUrl.includes('/curso')){
      console.log(`Hora do log: [${now}]. Método: ${req.method} Rota:${req.originalUrl}`);
    }
    next();
  }
}
