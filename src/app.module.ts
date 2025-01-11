import { Logger, Module } from '@nestjs/common';

import { DatabaseModule } from '@infrastructure/database/mongo/database.module';

import { NasaPhotoModule } from './infrastructure/modules/nasa-photo.module';
import { ProductsModule } from './infrastructure/modules/products.module';

@Module({
  imports: [DatabaseModule, NasaPhotoModule, ProductsModule],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
