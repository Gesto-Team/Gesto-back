import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string = 'Entreprise test';

  @IsEmail()
  @IsNotEmpty()
  email: string = 'example@example.com';

  @IsOptional()
  monthlyWaste: string = '12,6%';
}
