import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { TokenDto } from '../dtos/token.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { EnvConfigEnum } from 'src/config/env.enum';

@Injectable()
export class TokenService {
  constructor(private config: ConfigService) {}

  tokenize({
    data,
    expiresIn = this.config.get(EnvConfigEnum.JWT_LIFESPAN),
  }: {
    data: TokenDto;
    expiresIn?: string;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      const tokenSecret = this.config.get(EnvConfigEnum.TOKEN_SECRET);
      jwt.sign(data, tokenSecret, { expiresIn }, (err, decoded) => {
        if (err) reject(new InternalServerErrorException(err));
        resolve(decoded);
      });
    });
  }

  verify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const tokenSecret = this.config.get(EnvConfigEnum.TOKEN_SECRET);
      jwt.verify(token, tokenSecret, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            throw new UnauthorizedException('Token has expired');
          }
          reject(new UnauthorizedException(err));
        }
        resolve(decoded);
      });
    });
  }

  decode(token: string) {
    return jwt.decode(token, { complete: true });
  }

  /**function that abstract generation of jwt */
  async generateTokens(user: UserDto) {
    // generate jwt
    try {
      const authorizationToken = await this.tokenize({
        data: {
          username: user.username,
          role: user.role,
          user: user.id,
        },
        expiresIn: this.config.get(EnvConfigEnum.JWT_LIFESPAN),
      });

      return { authorizationToken };
    } catch (e) {
      Logger.error(e, e.message);
    }
  }
}
