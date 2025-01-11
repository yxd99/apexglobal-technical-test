import { MongooseModuleOptions } from '@nestjs/mongoose';

import { envs } from '@config/envs';

export function getMongoConfig(): MongooseModuleOptions {
  let uri: string;
  if (envs.DB_CONNECTION_SCHEMA === 'mongodb') {
    uri = `mongodb://${envs.DB_HOST}:${envs.DB_PORT}`;
  } else {
    uri = `mongodb+srv://${envs.DB_USER}:${envs.DB_PASSWORD}@${envs.DB_HOST}/${envs.DB_NAME}?retryWrites=true&w=majority`;
  }
  return {
    autoCreate: true,
    auth: {
      username: envs.DB_USER,
      password: envs.DB_PASSWORD,
    },
    dbName: envs.DB_NAME,
    uri,
  };
}
