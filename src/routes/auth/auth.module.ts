import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './Passport/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './Jwt/jwt.strategy';
import configuration from 'src/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtRefreshStrategy } from './Jwt/jwtRefresh.strategy';
import { MongooseUserService } from 'src/external-services/mongoose-user/mongoose-user.service';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from '../../schemas/user.schema';
import { HasherService } from 'src/external-services/hasher/hasher.service';
import { UsersService } from '../users/users.service';

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
    MongooseUserService,
    UsersService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
