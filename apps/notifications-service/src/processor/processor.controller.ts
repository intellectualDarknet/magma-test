import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ProcessorService } from './processor.service';
import { CREATE_USER, DELETE_USER } from '@repo/microservices'

@Controller()
export class ProcessorController {
  constructor(private readonly processorService: ProcessorService) {}

  @EventPattern(CREATE_USER)
  create(@Payload() str: string) {
    return this.processorService.create(str);
  }
  
  @EventPattern(DELETE_USER)
  delete(@Payload() str: string) {
    return this.processorService.delete(str);
  }
}
