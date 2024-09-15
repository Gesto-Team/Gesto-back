import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string = 'Produit test';

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  unit: string;

  @IsNotEmpty()
  expirationDate: Date;

  @IsNotEmpty()
  quantity: number;
}
