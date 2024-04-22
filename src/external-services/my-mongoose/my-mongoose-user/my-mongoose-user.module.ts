import { Module } from '@nestjs/common';
import { MyMongooseUserService } from './my-mongoose-user.service';

@Module({
  providers: [MyMongooseUserService],
})
export class MyMongooseUserModule {}
