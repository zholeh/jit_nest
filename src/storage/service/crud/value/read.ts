import { NotFoundServiceError } from '../../../../exception';
import { FindAllOptions, FindOneOptions, FindReturn } from '../../../../helper/types';
import { buildCursor, buildFilters } from '../../../helper/filter';
import { buildOrders } from '../../../helper/order';
import { BaseValueCrud } from './base';
import { ValueSchema, ValueType } from './types';

export abstract class Read<Value extends ValueSchema> extends BaseValueCrud<Value> {
  async findAll(options?: FindAllOptions<ValueType<Value>>): Promise<readonly FindReturn<ValueType<Value>>[]> {
    const result = await this.buildQuery(options);
    return result.map((valueObject) => this.valueObject(valueObject, options?.fields));
  }

  async findValues(options?: FindOneOptions<ValueType<Value>>): Promise<FindReturn<ValueType<Value>> | undefined> {
    const result = await this.findAll(this.addLimitToOptions(1, options));

    if (result.length) return result.map((valueObject) => this.valueObject(valueObject, options?.fields))[0];
    return undefined;
  }

  async findOneOrFail(options: FindOneOptions<ValueType<Value>>): Promise<FindReturn<ValueType<Value>>> {
    const value = await this.findValues(options);
    if (!value) {
      throw new NotFoundServiceError(`Entity with options: ${JSON.stringify(options)} not found`);
    }

    return value;
  }

  private addLimitToOptions(limit: number, options?: FindAllOptions<ValueType<Value>>) {
    const result: FindAllOptions<ValueType<Value>> = options ? { ...options } : {};
    const pagination = result.pagination ? { ...result.pagination } : { limit };
    pagination.limit = limit;
    result.pagination = pagination;
    return result;
  }

  private buildQuery(options: FindAllOptions<ValueType<Value>> | undefined) {
    const query = this.builder.select(this.dbFields(options?.fields));

    if (options?.filters) buildFilters(options.filters, query);
    if (options?.orders) query.orderBy(buildOrders(options.orders));
    if (options?.pagination?.limit) query.limit(options.pagination.limit);
    // TODO: offset should be by code
    // if (options?.pagination?.offset) query.offset(options.pagination.offset);
    if (options?.pagination?.cursor) buildCursor(options.pagination?.cursor, query);
    return query;
  }
}
