import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory } from "@nestjs/microservices";
import { lastValueFrom, timeout } from "rxjs";
import { NOTIFICATION_RMQ_NAME } from "temp/rabbitmq.options";

@Injectable()
export class RmqService {
  private readonly logger = new Logger(RmqService.name)

  constructor(
    @Inject(NOTIFICATION_RMQ_NAME)
    private readonly usersClient: ClientProxy,
  ) {
  }

  async onApplicationBootstrap() {
    await this.usersClient.connect()
      .then(() => {
        this.logger.log('Connected to RabbitMQ successfully');
      })
      .catch((e) => {
        this.logger.error(
          `Error with connection to Users Service: ${JSON.stringify(e)}`,
        )
      })
  }

  async sendMessage(type: 'create' | 'delete') {
    try {
      return await lastValueFrom(
        this.usersClient
          .emit<boolean, any>(
            { cmd: `notification:${type}` },
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