import {
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
import { ObjectSchema, ArraySchema, StringSchema, BooleanSchema } from 'joi';

@Injectable()
export class JoiObjectValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}
  async transform(data: any) {
    try {
      const value = await this.schema
        .unknown(false)
        .validateAsync(data, { stripUnknown: true });
      return value;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}

@Injectable()
export class JoiArrayValidationPipe implements PipeTransform {
  constructor(private readonly schema: ArraySchema) {}
  async transform(data: any) {
    try {
      const value = await this.schema.validateAsync(data, {
        stripUnknown: true,
      });
      return value;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}

@Injectable()
export class StringValidationPipe implements PipeTransform {
  constructor(private readonly schema: StringSchema) {}
  async transform(data: any) {
    try {
      const value = await this.schema.validateAsync(data, {
        stripUnknown: true,
      });
      return value;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}

@Injectable()
export class BooleanValidationPipe implements PipeTransform {
  constructor(private readonly schema: BooleanSchema) {}
  async transform(data: any) {
    try {
      const value = await this.schema.validateAsync(data, {
        stripUnknown: true,
      });
      return value;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
