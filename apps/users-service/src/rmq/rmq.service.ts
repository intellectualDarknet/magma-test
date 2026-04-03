import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CREATE_USER, DELETE_USER, NOTIFICATION_RMQ_SERVICE } from "@repo/microservices";
import { lastValueFrom, timeout } from "rxjs";

@Injectable()
export class RmqService {
  private readonly logger = new Logger(RmqService.name)

  constructor(
    @Inject(NOTIFICATION_RMQ_SERVICE)
    private readonly usersClient: ClientProxy,
  ) {}

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

  async createUser(message: string) {
    try {
      this.usersClient.emit(CREATE_USER, message)
    } catch (e) {
      this.logger.error(JSON.stringify(e))
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async deleteUser(message: string) {
    try {
      this.usersClient.emit(DELETE_USER, message)
    } catch (e) {
      this.logger.error(JSON.stringify(e))
      throw new InternalServerErrorException('Something went wrong')
    }
  }
}