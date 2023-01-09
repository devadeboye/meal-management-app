import * as Joi from 'joi';

export const envConfigValidator = Joi.object({
  PORT: Joi.number().default(6000),
  DB_HOST: Joi.string().trim().required(),
  DB_PORT: Joi.string().trim().required(),
  DB_NAME: Joi.string().trim().required(),
  DB_USER: Joi.string().trim().required(),
  DB_CLIENT: Joi.string().trim().required(),
  DB_PASSWORD: Joi.string().trim().allow(''),
  NODE_ENV: Joi.string()
    .trim()
    .valid('production', 'development', 'test')
    .default('development')
    .required(),
  TOKEN_SECRET: Joi.string().trim().required(),
  JWT_LIFESPAN: Joi.string().trim().required(),
});
