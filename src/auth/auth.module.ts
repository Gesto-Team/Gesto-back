import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './Jwt/jwt.strategy';
import configuration from 'src/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';
import { HasherService } from 'src/hasher/hasher.service';
import { JwtRefreshStrategy } from './Jwt/jwtRefresh.strategy';
import { MyMongooseUserService } from 'src/external-services/my-mongoose/my-mongoose-user/my-mongoose-user.service';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forRoot({ load: [configuration] }),
    JwtModule.register({
      secret: configuration().jwtSecret,
      signOptions: { expiresIn: '1000s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AuthService,
    HasherService,
    LocalStrategy,
    MyMongooseUserService,
    UsersService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
