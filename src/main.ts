import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { EnvConfigEnum } from './config/env.enum';
import { Logger } from '@nestjs/common';
import { CanPerformAction } from './utils/guards/canPerform.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const port = configService.get<number>(EnvConfigEnum.PORT);

  app.useGlobalGuards(new CanPerformAction(reflector));
  await app.listen(port);
  Logger.debug(`listening on port ${port}`);
}
bootstrap();
