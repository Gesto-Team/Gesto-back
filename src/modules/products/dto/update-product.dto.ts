import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  name: string = 'Produit test';

  @IsOptional()
  price: number;

  @IsOptional()
  unit: string;

  @IsOptional()
  expirationDate: Date;

  @IsOptional()
  quantity: number;
}
