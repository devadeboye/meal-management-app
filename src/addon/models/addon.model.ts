import { Model } from 'objection';
import { Brand } from 'src/brand/models/brand.model';
import { BaseModel } from 'src/database/models/base.model';

export class Addon extends BaseModel {
  name: string;
  description: string;
  price: number;
  category: number;
  brand: number;

  static tableName = 'addons';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'description', 'price', 'category', 'brand'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 5, maxLength: 255 },
        description: { type: 'string', minLength: 5, maxLength: 255 },
        price: { type: 'integer' },
        category: { type: 'integer' },
        brand: { type: 'integer' },
      },
    };
  }

  static relationMappings = {
    brand: {
      relation: Model.BelongsToOneRelation,
      modelClass: Brand,
      join: {
        from: 'addons.brand',
        to: 'brands.id',
      },
    },
  };
}
