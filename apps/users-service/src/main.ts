import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@repo/pino-nestjs'
import { signalExceptionHandler } from '@repo/be-common-utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(Logger)
  app.useLogger(logger)

  signalExceptionHandler(logger)

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
