import { Module } from '@nestjs/common';
import { MongooseUserService } from './mongoose-user.service';

@Module({
  providers: [MongooseUserService],
})
export class MyMongooseUserModule {}
