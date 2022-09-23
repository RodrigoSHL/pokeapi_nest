import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsString()
  _id?: string;
}
