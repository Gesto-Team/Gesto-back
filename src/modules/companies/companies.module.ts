import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { MongooseCompanyService } from 'src/modules/companies/mongoose-companies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanyDocument, CompanySchema } from './companies.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { NodeMailerService } from 'src/modules/companies/mailer/nodemailer.service';
import { MailerProvider } from './mailer/mailer.interface';
import { CompanyProvider } from './companies.interface';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    {
      provide: CompanyProvider,
      useClass: MongooseCompanyService,
    },
    {
      provide: MailerProvider<CompanyDocument>,
      useClass: NodeMailerService,
    },
    NodeMailerService,
  ],
})
export class CompaniesModule {}
