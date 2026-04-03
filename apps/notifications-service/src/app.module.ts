import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { ProcessorModule } from './processor/processor.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HealthcheckModule,
    ProcessorModule,
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
