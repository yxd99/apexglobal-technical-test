import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/database/mongo/database.module';
import { NasaPhotoModule } from './infrastructure/modules/nasa-photo.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    DatabaseModule,
    NasaPhotoModule
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
