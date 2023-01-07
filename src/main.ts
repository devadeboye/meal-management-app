import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { EnvConfigEnum } from './config/env.enum';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<number>(EnvConfigEnum.PORT);
  await app.listen(port);
  Logger.debug(`listening on port ${port}`);
}
bootstrap();
