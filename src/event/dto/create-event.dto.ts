import { IsBoolean, IsDate, IsString, MinLength } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  notes: string;

  @IsDate()
  start: string;

  @IsDate()
  end: string;

  @IsBoolean()
  take: boolean;
}
