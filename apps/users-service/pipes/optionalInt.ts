import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class OptionalIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return Number.isFinite(+value) ? +value : value;
  }
}