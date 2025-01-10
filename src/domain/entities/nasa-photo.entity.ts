export class NasaPhoto {
  constructor(
    public explanation: string,
    public hdurl: string,
    public url: string,
  ) {}

  static toEntity(nasaPhoto: NasaPhoto): NasaPhoto {
    return new NasaPhoto(
      nasaPhoto.explanation,
      nasaPhoto.hdurl,
      nasaPhoto.url,
    );
  }
}
