import { Transport } from '@nestjs/microservices'
import { RmqOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface'

import { NOTIFICATION_QUEUE } from './notification.queues'

export const NOTIFICATION_RMQ_SERVICE = 'NOTIFICATION_RMQ_SERVICE'

export const NotificationRmqConfig = (urls: string[] | string): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: Array.isArray(urls) ? urls : [urls], // Replace with your RabbitMQ server URL
    queue: NOTIFICATION_QUEUE, // Define the queue name
    queueOptions: {
      durable: true
    },
  },
});
