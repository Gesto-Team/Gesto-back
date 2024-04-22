import { IsNumber } from 'class-validator';

export class SeedUserDto {
  @IsNumber()
  nbSeeds: number;
}
