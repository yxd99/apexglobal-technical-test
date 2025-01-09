import 'dotenv/config';
import * as joi from 'joi';

const envSchema = joi.object({
  NODE_ENV: joi.string().valid('development', 'production', 'test').default('development'),
  PORT: joi.number().default(3000),
  JWT_SECRET: joi.string(),
  ENCRYPT_PASSWORD: joi.string(),
  DB_HOST: joi.string().default('mongodb://localhost'),
  DB_PORT: joi.number().default(27017),
  DB_USER: joi.string(),
  DB_PASSWORD: joi.string(),
  DB_NAME: joi.string(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  NODE_ENV: value.NODE_ENV,
  PORT: value.PORT,
  JWT_SECRET: value.JWT_SECRET,
  ENCRYPT_PASSWORD: value.ENCRYPT_PASSWORD,
  DB_HOST: value.DB_HOST,
  DB_PORT: value.DB_PORT,
  DB_USER: value.DB_USER,
  DB_PASSWORD: value.DB_PASSWORD,
  DB_NAME: value.DB_NAME,
};
