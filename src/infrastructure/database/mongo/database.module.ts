import { Module } from "@nestjs/common";
import { MongoConnectionService } from "./mongo-connection.service";
import { MongooseModule } from "@nestjs/mongoose";
import { getMongoConfig } from "./mongo-config";

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