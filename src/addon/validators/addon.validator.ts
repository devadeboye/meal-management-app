import * as Joi from 'joi';

export const createAddonValidator = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().max(256).allow(''),
  price: Joi.number().greater(0).required(),
  category: Joi.number().required(),
  brand: Joi.number().required(),
});
