import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './products.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductProvider } from './products.interface';
import { MongooseProductService } from './mongoose-products.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductService,
    {
      provide: ProductProvider,
      useClass: MongooseProductService,
    },
  ],
})
export class ProductsModule {}
