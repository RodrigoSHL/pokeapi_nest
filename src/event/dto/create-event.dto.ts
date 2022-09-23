import {
  IsBoolean,
  IsDateString,
  IsEmail,
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

  @IsEmail()
  clientEmail: string;

  @IsString()
  @MinLength(8)
  clientPhone: string;

  @IsString()
  @MinLength(4)
  color: string;
}
