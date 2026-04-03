import { Transport, RmqOptions } from '@nestjs/microservices';

export const NOTIFICATION_RMQ_NAME = 'notification-rmq-service'

export const NotificationRmqConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://admin:admin@localhost:5672'], // Replace with your RabbitMQ server URL
    queue: 'notification_queue', // Define the queue name
    queueOptions: {
      durable: true
    },
  },
});