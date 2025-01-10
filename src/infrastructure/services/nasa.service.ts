import { NasaPhoto } from "@app/domain/entities/nasa-photo.entity";
import { NasaPhotoRepository } from "@app/domain/repositories/nasa-photo.repository";
import { Injectable } from "@nestjs/common";
import { envs } from "@config/envs";
import { HttpClientService } from "../http/http-client.service";

@Injectable()
export class NasaPhotoService implements NasaPhotoRepository {

  constructor(
    private readonly httpService: HttpClientService,
  ) {}
  async fetchPhotoOfTheDay(): Promise<NasaPhoto> {
    const {
      NASA_ENDPOINT,
      NASA_API_KEY,
    } = envs;
    return this.httpService.get<NasaPhoto>(`${NASA_ENDPOINT}?api_key=${NASA_API_KEY}`);
  }
}
