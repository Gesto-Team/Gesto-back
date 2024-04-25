import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { SeedUserDto } from './dto/seed-user.dto';
import { MongooseUserService } from 'src/external-services/mongoose-user/mongoose-user.service';

@Injectable()
export class SeedService {
  constructor(private mgUserService: MongooseUserService) {}

  /**
   * Seed users in database
   * @param seedUserDto nbSeeds
   * @returns nbSeeds users
   */
  public async seedUsers(seedUserDto: SeedUserDto) {
    const fakerUser = (): any => ({
      username: faker.internet.email(),
      password: faker.internet.password(),
    });
    const users = Array.from({ length: seedUserDto.nbSeeds }, fakerUser);
    return users.map((user) => this.mgUserService.create(user));
  }
}
