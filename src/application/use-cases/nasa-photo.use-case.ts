import { Inject, Injectable } from '@nestjs/common';

import { NasaPhoto } from '@domain/entities/nasa-photo.entity';
import { NasaPhotoRepository } from '@domain/repositories/nasa-photo.repository';

@Injectable()
export class NasaPhotoUseCase {
  constructor(
    @Inject('NasaPhotoRepository')
    private readonly nasaPhotoRepository: NasaPhotoRepository,
  ) {}

  async getPhotoOfTheDay(): Promise<NasaPhoto> {
    return this.nasaPhotoRepository.fetchPhotoOfTheDay();
  }
}
