import { Inject, Injectable } from '@nestjs/common';
import { NasaPhotoRepository } from '@domain/repositories/nasa-photo.repository';
import { NasaPhoto } from '@domain/entities/nasa-photo.entity';

@Injectable()
export class NasaPhotoUseCase {
  constructor(
    @Inject('NasaPhotoRepository') private readonly nasaPhotoRepository: NasaPhotoRepository,
  ) {}

  async getPhotoOfTheDay(): Promise<NasaPhoto> {
    return this.nasaPhotoRepository.fetchPhotoOfTheDay();
  }
}
