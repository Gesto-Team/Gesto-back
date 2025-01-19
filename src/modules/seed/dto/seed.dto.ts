import { IsEnum, IsNumber } from 'class-validator';
import { DateEnum } from '../seed.interface';

export class SeedDto {
  @IsNumber()
  nbSeeds: number;
}

export class SeedProductDto extends SeedDto {
  @IsEnum(DateEnum)
  dateEnum: DateEnum;
}
