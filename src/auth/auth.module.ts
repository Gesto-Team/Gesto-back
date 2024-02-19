import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import configuration from 'src/config/configuration';
import { ConfigModule } from '@nestjs/config';

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
  ],
  providers: [AuthService, LocalStrategy, UsersService, JwtStrategy],
})
export class AuthModule {}
