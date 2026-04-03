import { Module } from '@nestjs/common';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { ProcessorModule } from './processor/processor.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule, pinoForRootConfig } from '@repo/pino-nestjs';

@Module({
  imports: [
    HealthcheckModule,
    ProcessorModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(pinoForRootConfig)
  ],
})

export class AppModule {}
