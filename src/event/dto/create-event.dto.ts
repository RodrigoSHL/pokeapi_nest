import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  notes: string;

  @IsDateString()
  start: string;

  @IsDateString()
  end: string;

  @IsBoolean()
  take: boolean;
}
