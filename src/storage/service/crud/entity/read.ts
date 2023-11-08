import { ServiceExceptions } from '../../../../exception';
import { FindAllOptions, FindOneOptions, FindReturn } from '../../../../helper/types';
import { buildCursor, buildFilters } from '../../../helper/filter';
import { buildOrders } from '../../../helper/order';
import { BaseEntityCrud } from './base';
import { EntitySchema, EntityType } from './types';

export abstract class Read<Entity extends EntitySchema> extends BaseEntityCrud<Entity> {
  async findAll(options?: FindAllOptions<EntityType<Entity>>): Promise<readonly FindReturn<EntityType<Entity>>[]> {
    console.log(options);
    const result = await this.buildQuery(options);
    return result.map((entity) => this.entity(entity, options?.fields));
  }

  async findOne(options?: FindOneOptions<EntityType<Entity>>): Promise<FindReturn<EntityType<Entity>> | undefined> {
    const result = await this.findAll(this.addLimitToOptions(1, options));

    if (result.length) return result.map((entity) => this.entity(entity, options?.fields))[0];
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

  private buildQuery(options: FindAllOptions<EntityType<Entity>> | undefined) {
    const query = this.builder.select(this.dbFields(options?.fields));

    if (options?.filters) buildFilters(options.filters, query, this.columns.db);
    if (options?.orders) query.orderBy(buildOrders(options.orders));
    if (options?.pagination?.limit) query.limit(options.pagination.limit);
    if (options?.pagination?.offset) query.offset(options.pagination.offset);
    if (options?.pagination?.cursor) buildCursor(options.pagination?.cursor, query);
    return query;
  }
}
