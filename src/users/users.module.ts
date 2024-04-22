import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { HasherService } from 'src/hasher/hasher.service';
import { MyMongooseUserService } from 'src/external-services/my-mongoose/my-mongoose-user/my-mongoose-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    MyMongooseUserService,
    HasherService,
    JwtService,
  ],
})
export class UsersModule {}
