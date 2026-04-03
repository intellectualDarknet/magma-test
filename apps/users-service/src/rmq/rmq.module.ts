import { Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ConfigService } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices';
import { NOTIFICATION_RMQ_SERVICE, NotificationRmqConfig } from '@repo/microservices';

@Module({
  providers: [RmqService],
  exports: [RmqService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: NOTIFICATION_RMQ_SERVICE,
        useFactory: async (configService: ConfigService) =>
          NotificationRmqConfig([configService.getOrThrow<string>('RMQ_URL')]),
        inject: [ConfigService],
      },
    ]),
  ]
})
export class RmqModule {}
