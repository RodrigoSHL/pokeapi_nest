import {
  IsNumber,
  IsString,
  MinLength,
  Min,
  IsPositive,
} from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @MinLength(1)
  name: string;
  @IsNumber()
  @Min(1)
  @IsPositive()
  no: number;
}
