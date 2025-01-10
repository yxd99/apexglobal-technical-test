export class NasaPhoto {
  constructor(
    public copyright: string,
    public data: Date,
    public explanation: string,
    public hdurl: string,
    public media_type: string,
    public service_version: string,
    public title: string,
    public url: string,
  ) {}
}
