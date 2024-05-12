import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { MongooseUserService } from 'src/external-services/mongoose-user/mongoose-user.service';
import { MongooseCompanyService } from 'src/external-services/mongoose-companies/mongoose-companies.service';
import { Company, CompanySchema } from 'src/schemas/companies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [SeedController],
  providers: [SeedService, MongooseUserService, MongooseCompanyService],
})
export class SeedModule {}
