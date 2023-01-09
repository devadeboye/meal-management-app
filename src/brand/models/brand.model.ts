import { Model } from 'objection';
import { Addon } from 'src/addon/models/addon.model';
import { BaseModel } from 'src/database/models/base.model';

export class Brand extends BaseModel {
  name: string;

  static tableName = 'brands';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 5, maxLength: 255 },
      },
    };
  }

  static relationMappings = {
    brand: {
      relation: Model.HasManyRelation,
      modelClass: Addon,
      join: {
        from: 'brands.id',
        to: 'addons.brand',
      },
    },
  };
}
