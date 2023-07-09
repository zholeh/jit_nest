import { BaseEntityCrud } from './base';
import { EntityLink, EntitySchema } from './types';

export abstract class Delete<Entity extends EntitySchema> extends BaseEntityCrud<Entity> {
  async delete(link: EntityLink<Entity>, softDelete = true): Promise<boolean> {
    if (softDelete) return this.softDelete(link.id);
    return this.hardDelete(link.id);
  }

  async deleteMany(link: EntityLink<Entity>[], softDelete = true): Promise<boolean> {
    const ids = link.map((v) => v.id);

    if (softDelete) return this.softDelete(ids);
    return this.hardDelete(ids);
  }

  private async softDelete(id: EntityLink<Entity>['id'] | EntityLink<Entity>['id'][]): Promise<boolean> {
    const input = { deletedAt: new Date() };
    const result = await this.builder.where('id', id).update(input);

    if (result > 0) return true;
    return false;
  }

  private async hardDelete(id: EntityLink<Entity>['id'] | EntityLink<Entity>['id'][]): Promise<boolean> {
    const result = await this.builder.where('id', id).delete();

    if (result > 0) return true;
    return false;
  }
}
