import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { MongooseUserService } from 'src/external-services/mongoose-user/mongoose-user.service';
import { AuthService } from '../auth/auth.service';
import { HasherService } from 'src/external-services/hasher/hasher.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    MongooseUserService,
    HasherService,
    JwtService,
  ],
})
export class UsersModule {}
