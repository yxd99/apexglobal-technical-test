import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { getMongoConfig } from './mongo-config';
import { MongoConnectionService } from './mongo-connection.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: getMongoConfig,
    }),
  ],
  providers: [MongoConnectionService],
  exports: [MongoConnectionService],
})
export class DatabaseModule {}
