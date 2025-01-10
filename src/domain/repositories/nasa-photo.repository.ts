import { NasaPhoto } from '@domain/entities/nasa-photo.entity';

export interface NasaPhotoRepository {
  fetchPhotoOfTheDay(): Promise<NasaPhoto>;
}
