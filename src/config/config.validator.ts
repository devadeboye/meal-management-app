import * as Joi from 'joi';
import { EnvConfigEnum } from './env.enum';

export const envConfigValidator = Joi.object({
  PORT: Joi.number().default(6000),
});
