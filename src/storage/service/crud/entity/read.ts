import { ServiceExceptions } from '../../../../exception';
import { objectKeys } from '../../../../helper/object';
import { EntityFields, FindAllOptions, FindOneOptions, FindReturn } from '../../../../helper/types';
import { buildCursor, buildFilters } from '../../../helper/filter';
import { buildOrders } from '../../../helper/order';
import { BaseEntityCrud } from './base';
import { EntitySchema, EntityType } from './types';

export abstract class Read<Entity extends EntitySchema> extends BaseEntityCrud<Entity> {
  async findAll(options?: FindAllOptions<EntityType<Entity>>): Promise<readonly FindReturn<EntityType<Entity>>[]> {
    const result = await this.buildQuery(options);
    const fields = this.fieldsToArray(options?.fields);
    return result.map((entity) => this.dbEntity.entity(entity, fields));
  }

  async findOne(options?: FindOneOptions<EntityType<Entity>>): Promise<FindReturn<EntityType<Entity>> | undefined> {
    const result = await this.findAll(this.addLimitToOptions(1, options));

    const fields = this.fieldsToArray(options?.fields);
    if (result.length) return result.map((entity) => this.dbEntity.entity(entity, fields))[0];
    return undefined;
  }

  async findOneOrFail(options: FindOneOptions<EntityType<Entity>>): Promise<FindReturn<EntityType<Entity>>> {
    const entity = await this.findOne(options);
    if (!entity) {
      throw new ServiceExceptions.NotFound(`Entity with options: ${JSON.stringify(options)} not found`);
    }

    return entity;
  }

  private addLimitToOptions(limit: number, options?: FindAllOptions<EntityType<Entity>>) {
    const result: FindAllOptions<EntityType<Entity>> = options ? { ...options } : {};
    const pagination = result.pagination ? { ...result.pagination } : { limit };
    pagination.limit = limit;
    result.pagination = pagination;
    return result;
  }

  private buildQuery(options: FindAllOptions<EntityType<Entity>> | undefined, withoutDeleted = true) {
    const fields = this.fieldsToArray(options?.fields);
    const query = this.builder.select(this.dbEntity.dbFields(fields));

    const hasDeletedAtColumn = this.dbEntity.columns.db.get('deletedAt');
    if (hasDeletedAtColumn && withoutDeleted) query.whereNull(hasDeletedAtColumn.toString());
    if (options?.filters) buildFilters(query, options.filters, this.dbEntity.columns.db);
    if (options?.orders) query.orderBy(buildOrders(options.orders));
    if (options?.pagination?.limit) query.limit(options.pagination.limit);
    if (options?.pagination?.offset) query.offset(options.pagination.offset);
    if (options?.pagination?.cursor) buildCursor(options.pagination?.cursor, query);
    return query;
  }

  private fieldsToArray(fields?: EntityFields<EntityType<Entity>>): string[] | undefined {
    if (!fields) return undefined;

    return objectKeys(fields).filter((v) => fields[v]);
  }
}
