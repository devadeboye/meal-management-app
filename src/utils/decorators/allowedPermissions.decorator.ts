import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../enums/role.enum';

export const AllowedRole = (...roles: RoleEnum[]) => SetMetadata('role', roles);
