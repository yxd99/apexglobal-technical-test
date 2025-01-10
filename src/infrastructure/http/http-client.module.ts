import { Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';

@Module({
  providers: [
    HttpClientService,
    {
      provide: 'HttpClientService',
      useClass: HttpClientService,
    },
  ],
  exports: [HttpClientService],
})
export class HttpClientModule {}
