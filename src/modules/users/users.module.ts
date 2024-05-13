import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { MongooseUserService } from './mongoose-user.service';
import { CrudProvider } from 'src/interface/crud.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: CrudProvider<UserDocument>,
      useClass: MongooseUserService,
    },
    JwtService,
  ],
})
export class UsersModule {}
