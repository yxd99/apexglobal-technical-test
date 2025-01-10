import { Controller, Get } from '@nestjs/common';
import { NasaPhotoUseCase } from '@application/use-cases/nasa-photo.use-case';
import { NasaPhoto } from '@domain/entities/nasa-photo.entity';

@Controller('nasa')
export class NasaController {
  constructor(private readonly nasaPhotoUseCase: NasaPhotoUseCase) {}

  @Get('photo-of-the-day')
  async getPhotoOfTheDay(): Promise<NasaPhoto> {
    return this.nasaPhotoUseCase.getPhotoOfTheDay();
  }
}
