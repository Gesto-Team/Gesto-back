import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './modules/companies/companies.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeedModule } from './modules/seed/seed.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    AuthModule,
    CompaniesModule,
    ConfigModule.forRoot({ load: [configuration] }),
    MongooseModule.forRoot(
      `${configuration().database.host}/${configuration().database.name}`,
    ),
    SeedModule,
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
