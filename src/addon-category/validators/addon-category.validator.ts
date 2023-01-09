import * as Joi from 'joi';

export const createAddonCategoryValidator = Joi.object({
  name: Joi.string().trim().required(),
});
