import { IsEmail, IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  monthlyWaste: string
}
