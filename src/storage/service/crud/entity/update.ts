import { UnprocessableEntityServiceError } from '../../../../exception';
import { DictionaryUnknown } from '../../../../helper/types';
import { BaseCrud } from './base';
import { EntityId, EntitySchema, EntityType } from './types';

export abstract class Update<
  Entity extends EntitySchema,
  EntityUpdate extends DictionaryUnknown & { id: EntityId },
> extends BaseCrud<Entity> {
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
    throw new UnprocessableEntityServiceError(`Incorrect update ${JSON.stringify(input)}`);
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
    throw new UnprocessableEntityServiceError(`Incorrect patch ${JSON.stringify(input)}`);
  }
}
