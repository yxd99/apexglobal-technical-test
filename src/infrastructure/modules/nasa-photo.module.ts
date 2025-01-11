import { Module } from '@nestjs/common';

import { NasaPhotoUseCase } from '@application/use-cases/nasa-photo.use-case';
import { NasaController } from '@infrastructure/http/controllers/nasa-photo.controller';
import { HttpClientModule } from '@infrastructure/http/http-client.module';
import { NasaPhotoService } from '@infrastructure/services/nasa.service';

@Module({
  imports: [HttpClientModule],
  providers: [
    NasaPhotoService,
    {
      provide: 'NasaPhotoRepository',
      useClass: NasaPhotoService,
    },
    NasaPhotoUseCase,
  ],
  controllers: [NasaController],
  exports: [NasaPhotoUseCase],
})
export class NasaPhotoModule {}
