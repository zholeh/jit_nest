import { ServiceExceptions } from '../../../../exception';
import { DictionaryUnknown } from '../../../../helper/types';
import { BaseEntityCrud } from './base';
import { EntityId, EntitySchema, EntityType } from './types';

export abstract class Update<
  Entity extends EntitySchema,
  EntityUpdate extends DictionaryUnknown & { id: EntityId },
> extends BaseEntityCrud<Entity> {
  async update(
    input: EntityUpdate & {
      id: EntityId;
    },
  ): Promise<EntityType<Entity>> {
    const result = await this.builder
      .where('id', input.id)
      .update({ ...input, updatedAt: new Date() })
      .returning('*');
    if (result.length) return this.entity(result[0]);
    throw new ServiceExceptions.UnprocessableEntity(`Incorrect update ${JSON.stringify(input)}`);
  }

  async patch(
    input: Partial<EntityUpdate> & {
      id: EntityId;
    },
  ): Promise<EntityType<Entity>> {
    const result = await this.builder
      .where('id', input.id)
      .update({ ...input, updatedAt: new Date() })
      .returning('*');
    if (result.length) return this.entity(result[0]);
    throw new ServiceExceptions.UnprocessableEntity(`Incorrect patch ${JSON.stringify(input)}`);
  }
}
