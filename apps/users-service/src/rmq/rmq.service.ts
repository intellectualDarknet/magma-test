import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { lastValueFrom, timeout } from "rxjs";
import { rabbitMQConfig } from "temp/rabbitmq.options";

@Injectable()
export class RmqService {
  private readonly logger = new Logger(RmqService.name)

  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(rabbitMQConfig());
  }

  async onApplicationBootstrap() {
    await this.client.connect()
      .then(() => {
        this.logger.log('Connected to RabbitMQ successfully');
      })
      .catch((e) => {
        this.logger.error(
          `Error with connection to Users Service: ${JSON.stringify(e)}`,
        )
      })
  }

  async sendMessage() {
    try {
      return await lastValueFrom(
        this.client
          .send<boolean, any>(
            { cmd: 'cmd' },
            Math.random().toString(),
          )
          .pipe(timeout(5000)),
      )
    } catch (e) {
      console.log(JSON.stringify(e))
      throw new InternalServerErrorException('Something went wrong')
    }
  }
}