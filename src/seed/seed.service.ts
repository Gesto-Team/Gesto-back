import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { faker } from '@faker-js/faker';
import { SeedUserDto } from './dto/seed-user.dto';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async seedUsers(seedUserDto: SeedUserDto) {
    const fakerUser = (): User => ({
      username: faker.internet.email(),
      password: faker.internet.password(),
    });
    const users = Array.from({ length: seedUserDto.nbSeeds }, fakerUser);
    return users.map((user) => new this.userModel(user).save());
  }
}
