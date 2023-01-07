import * as Joi from 'joi';
import { RoleEnum } from 'src/utils/enums/role.enum';

export const createUserValidator = Joi.object({
  username: Joi.string().trim().required(),
  role: Joi.string()
    .trim()
    .valid(...Object.values(RoleEnum))
    .required(),
});
