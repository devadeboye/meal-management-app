import { Model } from 'objection';
import { AddonCategory } from 'src/addon-category/models/addon-category.model';
import { Brand } from 'src/brand/models/brand.model';
import { BaseModel } from 'src/database/models/base.model';

export class Addon extends BaseModel {
  static tableName = 'addons';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'description', 'price'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        description: { type: 'string', maxLength: 255 },
        price: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      brandId: {
        relation: Model.BelongsToOneRelation,
        modelClass: Brand,
        join: {
          from: 'addons.brand',
          to: 'brands.id',
        },
      },
      categoryId: {
        relation: Model.BelongsToOneRelation,
        modelClass: AddonCategory,
        join: {
          from: 'addons.category',
          to: 'addoncategories.id',
        },
      },
    };
  }
}
