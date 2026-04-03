import { Module } from '@nestjs/common';
import { RmqService } from './rmq.service';
import { ClientsModule } from '@nestjs/microservices';
import { NOTIFICATION_RMQ_NAME, NotificationRmqConfig } from 'temp/rabbitmq.options';

@Module({
  providers: [RmqService],
  exports: [RmqService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: NOTIFICATION_RMQ_NAME,
        useFactory: async () => NotificationRmqConfig()
      },
    ]),
  ]
})
export class RmqModule {}
