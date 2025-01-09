import { MongooseModuleOptions } from "@nestjs/mongoose";
import { envs } from "../../config/envs";
import { Logger } from "@nestjs/common";

export function getMongoConfig(): MongooseModuleOptions {
  return {
    auth: {
      username: envs.DB_USER,
      password: envs.DB_PASSWORD,
    },
    dbName: envs.DB_NAME,
    uri: `mongodb://${envs.DB_HOST}:${envs.DB_PORT}`,
  }
}
