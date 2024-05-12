import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongooseCompanyService } from 'src/external-services/mongoose-companies/mongoose-companies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from '../../schemas/companies.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { NodeMailerService } from 'src/external-services/mailer/nodemailer.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, MongooseCompanyService, NodeMailerService],
})
export class CompaniesModule {}
