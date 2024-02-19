import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  create(createUserDto: CreateUserDto) {
    this.users.push({ userId: this.users.length + 1, ...createUserDto });
    console.log(this.users);

    return `${createUserDto.username} has been created!`;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.userId === id) || 'User not found';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
