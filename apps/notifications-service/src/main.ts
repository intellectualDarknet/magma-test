import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { NotificationRmqConfig } from '@repo/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@repo/pino-nestjs'
import { signalExceptionHandler } from '@repo/be-common-utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(Logger)
  app.useLogger(logger)

  signalExceptionHandler(logger)

  const config = app.get(ConfigService)
  const url = config.getOrThrow<string>('RMQ_URL')

  await app.connectMicroservice<MicroserviceOptions>(
    NotificationRmqConfig(url)
  )

  await app.startAllMicroservices()
  
  await app.listen(3001);
}
bootstrap();
