import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { SeedDto } from './dto/seed.dto';
import { MongooseUserService } from 'src/modules/users/mongoose-user.service';
import { MongooseCompanyService } from 'src/modules/companies/mongoose-companies.service';

@Injectable()
export class SeedService {
  constructor(
    private mgUserService: MongooseUserService,
    private mgCompanyService: MongooseCompanyService,
  ) {}

  /**
   * Seed users in database
   * @param seedUserDto nbSeeds
   * @returns nbSeeds users
   */
  public async seedUsers(seedUserDto: SeedDto) {
    const fakerUser = (): any => ({
      username: faker.internet.email(),
      password: faker.internet.password(),
    });
    const users = Array.from({ length: seedUserDto.nbSeeds }, fakerUser);
    return users.map((user) => this.mgUserService.create(user));
  }

  /**
   * Seed companies in database
   * @param seedCompanyDto nbSeeds
   * @returns nbSeeds companies
   */
  public async seedCompanies(seedCompanyDto: SeedDto) {
    const fakerCompany = (): any => ({
      name: faker.company.name(),
      email: faker.internet.email(),
      monthlyWaste: faker.number.float({ max: 100 }) + '%',
    });
    const companies = Array.from(
      { length: seedCompanyDto.nbSeeds },
      fakerCompany,
    );
    return companies.map((company) => this.mgCompanyService.create(company));
  }
}
