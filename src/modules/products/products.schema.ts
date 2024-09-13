import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @IsNotEmpty()
  @Prop()
  name: string;

  @IsNotEmpty()
  @Prop()
  price: number;

  @IsNotEmpty()
  @Prop()
  unit: string;

  @IsNotEmpty()
  @Prop()
  expirationDate: Date;

  @IsNotEmpty()
  @Prop()
  quantity: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
