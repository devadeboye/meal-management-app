import { Model } from 'objection';
import { Addon } from 'src/addon/models/addon.model';
import { Brand } from 'src/brand/models/brand.model';
import { BaseModel } from 'src/database/models/base.model';

export class AddonCategory extends BaseModel {
  name: string;
  brand: number;
  static tableName = 'addoncategories';

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
    addon: {
      relation: Model.HasManyRelation,
      modelClass: Addon,
      join: {
        from: 'addoncategories.id',
        to: 'addons.category',
      },
    },
  };
}
