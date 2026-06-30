// admin.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const userId = request.headers['user-id'];

    if (!userId) {
      throw new UnauthorizedException('"user-id" do usuário não fornecido no header');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (user.tipoAcesso !== 'ADMIN') {
      throw new ForbiddenException('Acesso negado: Somente administradores');
    }
    request.user = user; 
    
    return true;
  }
}