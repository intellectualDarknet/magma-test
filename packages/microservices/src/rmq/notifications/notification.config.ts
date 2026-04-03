import { Transport } from '@nestjs/microservices'
import { RmqOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface'

import { NOTIFICATION_QUEUE } from './notification.queues'

export const NOTIFICATION_RMQ_SERVICE = 'NOTIFICATION_RMQ_SERVICE'

export const NotificationRmqConfig = (urls: string[] | string): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: Array.isArray(urls) ? urls : [urls],
    queue: NOTIFICATION_QUEUE,
    queueOptions: {
      durable: true
    },
  },
});
