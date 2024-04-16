import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRoot(
      `${configuration().database.host}:${configuration().database.port}/${configuration().database.name}`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
