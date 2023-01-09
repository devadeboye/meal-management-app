import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from 'src/auth/services/token.service';
import { TokenDto } from 'src/auth/dtos/token.dto';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) return next();
    const authorizationHeader = req.headers.authorization;
    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer') {
      throw new NotFoundException('please provide a Bearer token');
    }

    if (!token) {
      throw new Notification('token not found');
    }
    const tokenData: TokenDto = await this.tokenService.verify(token);

    res.locals.tokenData = tokenData;
    next();
  }
}
