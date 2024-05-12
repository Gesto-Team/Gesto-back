import { Module } from '@nestjs/common';
import { UsersModule } from './routes/users/users.module';
import { AuthModule } from './routes/auth/auth.module';
import { SeedModule } from './routes/seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './routes/companies/companies.module';

@Module({
  imports: [
    AuthModule,
    CompaniesModule,
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRoot(
      `${configuration().database.host}:${configuration().database.port}/${configuration().database.name}`,
    ),
    SeedModule,
    UsersModule,
  ],
})
export class AppModule {}
