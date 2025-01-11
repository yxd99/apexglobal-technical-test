import 'dotenv/config';
import * as joi from 'joi';

const envSchema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test')
      .default('development'),
    PORT: joi.number().default(3000),
    DB_CONNECTION_SCHEMA: joi.string().default('mongodb'),
    DB_HOST: joi.string().default('mongodb://localhost'),
    DB_PORT: joi.number().default(27017).required(),
    DB_USER: joi.string(),
    DB_PASSWORD: joi.string(),
    DB_NAME: joi.string(),
    NASA_ENDPOINT: joi.string(),
    NASA_API_KEY: joi.string(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  NODE_ENV: value.NODE_ENV,
  PORT: value.PORT,
  DB_CONNECTION_SCHEMA: value.DB_CONNECTION_SCHEMA,
  DB_HOST: value.DB_HOST,
  DB_PORT: value.DB_PORT,
  DB_USER: value.DB_USER,
  DB_PASSWORD: value.DB_PASSWORD,
  DB_NAME: value.DB_NAME,
  NASA_ENDPOINT: value.NASA_ENDPOINT,
  NASA_API_KEY: value.NASA_API_KEY,
};
