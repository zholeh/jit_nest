import { ServiceExceptions } from '../../../../exception';
import { DictionaryUnknown } from '../../../../helper/types';
import { BaseEntityCrud } from './base';
import { EntitySchema, EntityType } from './types';

export abstract class Create<
  Entity extends EntitySchema,
  EntityCreate extends DictionaryUnknown,
> extends BaseEntityCrud<Entity> {
  async create(input: EntityCreate): Promise<EntityType<Entity>> {
    // Have to open a transaction
    const result = await this.builder.insert(this.dbEntity.db(input)).returning('*');
    if (result?.length) return this.dbEntity.entity(result[0]);
    throw new ServiceExceptions.UnprocessableEntity(`Incorrect insert ${JSON.stringify(input)}`);
  }

  async createMany(input: EntityCreate[]): Promise<EntityType<Entity>[]> {
    // Have to open a transaction
    const result = await this.builder.insert(input).returning('*');
    if (result?.length) return result.map((el) => this.dbEntity.entity(el));
    throw new ServiceExceptions.UnprocessableEntity(`Incorrect insert many ${JSON.stringify(input)}`);
  }
}
