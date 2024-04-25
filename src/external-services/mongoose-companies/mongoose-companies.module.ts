import { Module } from '@nestjs/common';
import { MongooseCompanyService } from './mongoose-companies.service';

@Module({
  providers: [MongooseCompanyService],
})
export class MyMongooseCompanyModule {}
