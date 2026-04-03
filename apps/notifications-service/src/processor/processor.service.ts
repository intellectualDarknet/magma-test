import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProcessorService {
private readonly logger = new Logger(ProcessorService.name);

  create(str: string) {
    this.logger.log(str)
  }

  delete(str: string) {
    this.logger.log(str)
  }
}
