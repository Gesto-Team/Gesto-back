import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  username: string = 'example@example.com';

  @IsNotEmpty()
  password: string = 'password';
}
