import * as Joi from 'joi';
import { RoleEnum } from 'src/utils/enums/role.enum';

export const createUserValidator = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string()
    .trim()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required()
    .messages({
      'string.base': `"password" should be a type of 'text'`,
      'any.required': `"password" is a required`,
      'string.pattern.base':
        'Password must be minimum of 8 characters, contain an uppercase letter, a number and a special character',
    }),
});

export const loginValidator = Joi.object({
  username: Joi.string().trim().required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'any.required': `"username" is a required field`,
  }),
  password: Joi.string()
    .trim()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required()
    .messages({
      'string.base': `"password" should be a type of 'text'`,
      'any.required': `"password" is a required`,
      'string.pattern.base':
        'Password must be minimum of 8 characters, contain an uppercase letter, a number and a special character',
    }),
});
