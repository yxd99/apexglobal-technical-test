import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/database/mongo/database.module';
import { ProductsModule } from './infrastructure/modules/products.module';

@Module({
  imports: [
    DatabaseModule,
    ProductsModule
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
