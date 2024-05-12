import { IsNumber } from 'class-validator';

export class SeedDto {
  @IsNumber()
  nbSeeds: number;
}
