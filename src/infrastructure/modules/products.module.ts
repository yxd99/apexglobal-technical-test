import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from '@interfaces/controllers/products.controller';
import { ProductSchema } from '@infrastructure/database/models/product.model';
import { ProductRepositoryImpl } from '@infrastructure/database/repositories/product.repository.impl';
import { ProductUseCase } from '@application/use-cases/product.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    },
    ProductUseCase,
  ],
})
export class ProductsModule {}
