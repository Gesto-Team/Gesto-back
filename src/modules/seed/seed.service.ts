import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { MongooseUserService } from 'src/modules/users/mongoose-user.service';
import { MongooseCompanyService } from 'src/modules/companies/mongoose-companies.service';
import { MongooseProductService } from '../products/mongoose-products.service';
import { Role } from '../users/user.schema';
import { SeedDto, SeedProductDto } from './dto/seed.dto';
import { DateEnum } from './seed.interface';

@Injectable()
export class SeedService {
  constructor(
    private mgUserService: MongooseUserService,
    private mgCompanyService: MongooseCompanyService,
    private mgProductService: MongooseProductService,
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
      role: Role.USER,
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

  /**
   * Seed products in database
   * @param seedProductDto nbSeeds
   * @returns nbSeeds products
   */
  public async seedProducts(seedProductDto: SeedProductDto) {
    const { nbSeeds, dateEnum } = seedProductDto;
    const fakerProduct = (): any => ({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      unit: 'kg',
      expirationDate: this.getFakerDate(dateEnum),
      quantity: faker.number.int({ max: 100 }),
    });
    const products = Array.from({ length: nbSeeds }, fakerProduct);
    return products.map((product) => this.mgProductService.create(product));
  }

  /**
   * Generates a fake date based on the provided date enumeration.
   *
   * @param {DateEnum} dateEnum - The date category to generate the fake date for.
   * @returns {Date} A fake date corresponding to the specified date category.
   *
   * - `DateEnum.EXPIRED`: Returns a date between 7 days ago and today.
   * - `DateEnum.ALMOST_EXPIRED`: Returns a date between today and 7 days from now.
   * - `DateEnum.NOT_EXPIRED`: Returns a date between 7 days from now and 14 days from now.
   * - Default: Returns a future date.
   */
  private getFakerDate(dateEnum: DateEnum): Date {
    const today = new Date();
    switch (dateEnum) {
      case DateEnum.EXPIRED:
        return faker.date.between(
          today.setDate(today.getDate() - 7),
          new Date(),
        );
      case DateEnum.ALMOST_EXPIRED:
        return faker.date.between(
          new Date(),
          today.setDate(today.getDate() + 7),
        );
      case DateEnum.NOT_EXPIRED:
        return faker.date.between(
          today.setDate(today.getDate() + 7),
          today.setDate(today.getDate() + 14),
        );
      default:
        return faker.date.future();
    }
  }
}
