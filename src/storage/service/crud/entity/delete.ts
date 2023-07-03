import { UnprocessableEntityServiceError } from '../../../../exception';
import { BaseCrud } from './base';
import { EntityLink, EntitySchema } from './types';

export abstract class Delete<Entity extends EntitySchema> extends BaseCrud<Entity> {
  async delete(link: EntityLink<Entity>, softDelete = true): Promise<boolean> {
    if (!link?.id) throw new UnprocessableEntityServiceError(`Can't delete the entity ${this.table}`);
    if (softDelete) return this.softDelete(link.id);
    return this.hardDelete(link.id);
  }

  private async softDelete(id: EntityLink<Entity>['id']): Promise<boolean> {
    const input = { deletedAt: new Date() };
    const result = await this.builder.where('id', id).update(input);

    if (result > 0) return true;
    return false;
  }

  private async hardDelete(id: EntityLink<Entity>['id']): Promise<boolean> {
    const result = await this.builder.where('id', id).delete();

    if (result > 0) return true;
    return false;
  }
}
