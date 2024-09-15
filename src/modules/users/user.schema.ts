import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema()
export class User {
  @IsNotEmpty()
  @Prop()
  username: string;

  @IsNotEmpty()
  @Prop()
  password: string;

  @IsNotEmpty()
  @Prop()
  role: Role;
}
export const UserSchema = SchemaFactory.createForClass(User);
