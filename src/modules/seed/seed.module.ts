import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user.schema';
import { MongooseUserService } from 'src/modules/users/mongoose-user.service';
import { MongooseCompanyService } from 'src/modules/companies/mongoose-companies.service';
import { Company, CompanySchema } from 'src/modules/companies/companies.schema';
import { Product, ProductSchema } from '../products/products.schema';
import { MongooseProductService } from '../products/mongoose-products.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [SeedController],
  providers: [
    SeedService,
    MongooseUserService,
    MongooseCompanyService,
    MongooseProductService,
  ],
})
export class SeedModule {}
