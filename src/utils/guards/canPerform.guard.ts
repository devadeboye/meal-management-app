import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { TokenDto } from 'src/auth/dtos/token.dto';

@Injectable()
export class CanPerformAction implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const allowedRole = this.reflector.get<string[]>(
      'role',
      context.getHandler(),
    );
    if (!allowedRole) return true;

    try {
      const response: Response = context.switchToHttp().getResponse();
      const tokenData: TokenDto = response.locals.tokenData;

      if (!tokenData) {
        throw new NotFoundException('authorization header not specified');
      }
      if (!tokenData.role) {
        throw new NotFoundException('user role not found');
      }
      const tokenDataRole: string[] = [tokenData.role];
      const hasRole = tokenDataRole.some((p) => allowedRole.includes(p));
      if (!hasRole) {
        throw new UnauthorizedException(
          'you are not authorized to perform this action',
        );
      }
      return true;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
