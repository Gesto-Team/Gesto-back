import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongooseCompanyService } from 'src/external-services/mongoose-companies/mongoose-companies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './companies.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    MongooseCompanyService,
  ],
})
export class CompaniesModule {}
