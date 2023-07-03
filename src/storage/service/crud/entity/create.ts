import { UnprocessableEntityServiceError } from '../../../../exception';
import { DictionaryUnknown } from '../../../../helper/types';
import { BaseCrud } from './base';
import { EntitySchema, EntityType } from './types';

export abstract class Create<
  Entity extends EntitySchema,
  EntityCreate extends DictionaryUnknown,
> extends BaseCrud<Entity> {
  async create(input: EntityCreate): Promise<EntityType<Entity>> {
    const result = await this.builder.insert(this.db(input)).returning('*');
    if (result.length) return this.entity(result[0]);
    throw new UnprocessableEntityServiceError(`Incorrect insert ${JSON.stringify(input)}`);
  }

  async createMany(input: EntityCreate[]): Promise<EntityType<Entity>[]> {
    const result = await this.builder.insert(input).returning('*');
    if (result.length) return result.map((el) => this.entity(el));
    throw new UnprocessableEntityServiceError(`Incorrect insert ${JSON.stringify(input)}`);
  }
}
