import * as Joi from 'joi';

export const createBrandValidator = Joi.object({
  name: Joi.string().trim().required(),
});
