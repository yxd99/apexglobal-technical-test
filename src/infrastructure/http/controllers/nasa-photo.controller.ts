import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { NasaPhotoUseCase } from '@application/use-cases/nasa-photo.use-case';
import { NasaPhoto } from '@domain/entities/nasa-photo.entity';
import { GetNasaPhotoFindOneOkSchema } from '@infrastructure/http/docs/nasa-photo/ok.schema';

@Controller('nasa')
export class NasaController {
  constructor(private readonly nasaPhotoUseCase: NasaPhotoUseCase) {}

  @ApiOkResponse(GetNasaPhotoFindOneOkSchema)
  @Get('photo-of-the-day')
  async getPhotoOfTheDay(): Promise<NasaPhoto> {
    return this.nasaPhotoUseCase.getPhotoOfTheDay();
  }
}
