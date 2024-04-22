import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @IsNotEmpty()
  @Prop()
  username: string;

  @IsNotEmpty()
  @Prop()
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
