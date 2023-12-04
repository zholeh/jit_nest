import { ServiceExceptions } from '../../../../exception';
import { objectKeys } from '../../../../helper/object';
import { EntityFields, FindAllOptions, FindOneOptions, FindReturn } from '../../../../helper/types';
import { buildCursor, buildFilters } from '../../../helper/filter';
import { buildOrders } from '../../../helper/order';
import { BaseValueObjectCrud } from './base';
import { ValueObjectSchema, ValueObjectType } from './types';

export abstract class Read<ValueObject extends ValueObjectSchema> extends BaseValueObjectCrud<ValueObject> {
  async findAll(
    options?: FindAllOptions<ValueObjectType<ValueObject>>,
  ): Promise<readonly FindReturn<ValueObjectType<ValueObject>>[]> {
    const fields = this.fieldsToArray(options?.fields);
    const result = await this.buildQuery(options);
    return result.map((valueObject) => this.dbEntity.entity(valueObject, fields));
  }

  async findValues(
    options?: FindOneOptions<ValueObjectType<ValueObject>>,
  ): Promise<FindReturn<ValueObjectType<ValueObject>>[] | undefined> {
    const result = await this.findAll(options);

    const fields = this.fieldsToArray(options?.fields);
    if (result.length) return result.map((valueObject) => this.dbEntity.entity(valueObject, fields));
    return undefined;
  }

  async findValuesOrFail(
    options: FindOneOptions<ValueObjectType<ValueObject>>,
  ): Promise<FindReturn<ValueObjectType<ValueObject>>> {
    const value = await this.findValues(options);
    if (!value) {
      throw new ServiceExceptions.NotFound(`Entity with options: ${JSON.stringify(options)} not found`);
    }

    return value;
  }

  private buildQuery(options: FindAllOptions<ValueObjectType<ValueObject>> | undefined) {
    const fields = this.fieldsToArray(options?.fields);
    const query = this.builder.select(this.dbEntity.dbFields(fields));

    if (options?.filters) buildFilters(query, options.filters, this.dbEntity.columns.db);
    if (options?.orders) query.orderBy(buildOrders(options.orders));
    if (options?.pagination?.limit) query.limit(options.pagination.limit);
    // TODO: offset should be by code
    // if (options?.pagination?.offset) query.offset(options.pagination.offset);
    if (options?.pagination?.cursor) buildCursor(options.pagination?.cursor, query);
    return query;
  }

  private fieldsToArray(fields?: EntityFields<ValueObjectType<ValueObject>>): string[] | undefined {
    if (!fields) return undefined;

    return objectKeys(fields).filter((v) => fields[v]);
  }
}
