import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { rabbitMQConfig } from 'temp/rabbitmq.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice(rabbitMQConfig());
  await app.listen(3000);
}
bootstrap();
