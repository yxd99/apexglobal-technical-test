import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class MongoConnectionService implements OnModuleInit {
  private readonly logger = new Logger(MongoConnectionService.name);

  async onModuleInit() {
    mongoose.connection.on('connected', () => {
      this.logger.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error(`Error connecting to MongoDB: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      this.logger.log('MongoDB disconnected');
    });

    this.logger.log({ totalConnections: mongoose.connections.length });
    mongoose.connections.forEach((connection, index) => {
      console.log({
        index,
        connection
      })
    });
  }
}
