import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class ClientTakeTimeDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsEmail()
  clientEmail: string;

  @IsString()
  @MinLength(8)
  clientPhone: string;

  @IsBoolean()
  take: boolean;
}
