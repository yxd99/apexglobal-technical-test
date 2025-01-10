import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from '@infrastructure/http/controllers/products.controller';
import { ProductSchema } from '@infrastructure/database/models/product.model';
import { ProductRepositoryImpl } from '@infrastructure/database/repositories/product.repository.impl';
import { ProductUseCase } from '@application/use-cases/product.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductUseCase,
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    },
  ],
})
export class ProductsModule {}
