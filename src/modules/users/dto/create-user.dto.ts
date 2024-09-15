import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../user.schema';

export class CreateUserDto {
  @IsEmail()
  username: string = 'example@example.com';

  @IsNotEmpty()
  password: string = 'password';

  @IsNotEmpty()
  role: Role = Role.USER;
}
