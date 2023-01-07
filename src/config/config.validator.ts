import * as Joi from 'joi';

export const envConfigValidator = Joi.object({
  PORT: Joi.number().default(6000),
  CONNECTION_STRING: Joi.string().trim().required(),
});
