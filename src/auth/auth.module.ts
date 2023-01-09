import { Global, Module } from '@nestjs/common';
import { TokenService } from './services/token.service';

@Global()
@Module({
  imports: [],
  providers: [TokenService],
  exports: [TokenService],
  controllers: [],
})
export class AuthModule {}
