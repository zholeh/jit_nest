import { Knex } from 'knex';
import { ServiceExceptions } from '../../../../exception';
import { UnprocessableEntityServiceError } from '../../../../exception/service/unprocessableEntity';
import { objectKeys } from '../../../../helper/object';
import { assertNever } from '../../../../helper/predicates';
import {
  DictionaryUnknown,
  EntityFields,
  Filter,
  FindAllOptions,
  FindOneOptions,
  FindReturn,
  Operator,
} from '../../../../helper/types';
import { DatabaseEntity } from '../../../entity/entity.abstract';
import { buildFilters } from '../../../helper/filter';
import { BaseEntityCrud } from './base';
import { EntitySchema, EntityType, JoinRule, Rule } from './types';

export abstract class Read<
  Entity extends EntitySchema,
  MainEntity extends EntitySchema,
> extends BaseEntityCrud<MainEntity> {
  private fieldsCache: Record<string, any> = {};
  async findAll(options?: FindAllOptions<EntityType<Entity>>): Promise<readonly FindReturn<EntityType<Entity>>[]> {
    const result = await this.buildQuery(options);
    const fields = this.fieldsToArray(options?.fields);
    return result.map((entity) => this.mainEntity.entity(entity, fields));
  }

  async findOne(options?: FindOneOptions<EntityType<Entity>>): Promise<FindReturn<EntityType<Entity>> | undefined> {
    const result = await this.findAll(this.addLimitToOptions(1, options));

    const fields = this.fieldsToArray(options?.fields);
    if (result.length) return result.map((entity) => this.mainEntity.entity(entity, fields))[0];
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

  private prepareFields(fields?: EntityFields<EntityType<Entity>>, joinTable?: JoinRule<MainEntity>) {
    const joins: JoinRule<MainEntity>[] = [];
    const result: string[] = [];
    if (!fields) {
      Array.from(this.mainEntity.columns.db).forEach(([, field]) => {
        const prepared = this.prepareDbFieldAndAlias1(field);
        result.push(prepared);
      });
    } else {
      objectKeys(fields).forEach((field) => {
        const value = fields[field];
        if (typeof value === 'boolean') {
          const prepared = this.prepareDbFieldAndAlias1(field, joinTable);
          result.push(prepared);
        } else {
          const joinedTable = this.getJoinedTable(field);
          joins.push(joinedTable);
          const subfields = this.prepareFields(value as EntityFields<EntityType<Entity>>, joinedTable);
          subfields[0].forEach((v) => joins.push(v));
          subfields[1].forEach((v) => result.push(v));
        }
      });
    }

    return [joins, result] as const;
  }

  private getJoinedTable(field: string) {
    const joinedTable = this.joinedTables.find((v) => {
      if (v.entity.table === field || v.incomingName === field) return true;
      return false;
    });

    if (joinedTable) return joinedTable;

    throw new UnprocessableEntityServiceError(`getJoinedTable: unrecognized table ${field}`);
  }

  private prepareDbFieldAndAlias1(field: string, joinTable?: JoinRule<MainEntity>) {
    const table = joinTable?.entity ? joinTable?.entity.table : this.mainEntity.table;
    const alias = joinTable?.entity ? `${joinTable?.entity.table}_` : '';
    const fieldName = joinTable?.entity ? joinTable?.entity.dbField(field) : this.mainEntity.dbField(field);
    return `${table}.${fieldName} as ${alias}${fieldName}` as const;
  }

  private prepareFilters(mapping: Map<keyof EntityType<Entity>, string>, filters: Filter<EntityType<Entity>>[]) {
    const joins: string[] = [];
    const newFiltersEntries = filters.map((filter) => {
      const newFilter = Object.entries(filter).map(([filterKey, filterOperator]) => {
        if (filterKey === 'or') {
          const [or, orJoins] = this.prepareFilters(mapping, filterOperator as Filter<EntityType<Entity>>[]);
          orJoins.forEach((v) => joins.push(v));
          return ['or', or] as const;
        } else {
          const [field, alias, table] = this.replacePrefixCache(filterKey);
          if (table) joins.push(table);
          return [`${field} ${alias}`, filterOperator as Operator] as const;
        }
      }) as (readonly ['or', (readonly [string, Operator])[]] | readonly [string, Operator])[];

      return Object.fromEntries(newFilter);
    });

    return [newFiltersEntries, joins] as const;
  }

  private buildFilters(
    query: Knex.QueryBuilder,
    mapping: Map<keyof EntityType<Entity>, string>,
    filters?: Filter<EntityType<Entity>>[],
  ): string[] {
    if (!filters) return [];
    const [newFilters, joins] = this.prepareFilters(mapping, filters);

    buildFilters(query, newFilters, mapping);
    return joins;
  }

  private replacePrefix(value: string) {
    for (let i = 0; i < this.joinedTables.length; i++) {
      const tableEntity = this.joinedTables[i];
      let tableName: string;
      let prefix: string;

      if (tableEntity instanceof DatabaseEntity) {
        tableName = tableEntity.table;
        prefix = tableEntity.table;
      } else if (tableEntity) {
        tableName = tableEntity.entity.table;
        prefix = tableEntity.incomingName ?? tableEntity.entity.table;
      } else {
        throw new UnprocessableEntityServiceError(
          `replacePrefix: unrecognized tableEntity: ${JSON.stringify(tableEntity)}}`,
        );
      }

      if (prefix === value) {
        return [tableName, value.replace('search', `${tableName}.`)] as const;
      }
    }
    return [] as const;
  }

  private replacePrefixCache(value: string) {
    this.fieldsCache = this.fieldsCache ?? {};

    const cache = this.fieldsCache[value];
    if (cache) return cache;

    const [tableName, field] = this.replacePrefix(value);
    const result = [field ?? `${this.mainEntity.table}.${value}`, value, tableName] as const;
    this.fieldsCache[value] = result;
    return result;
  }

  private buildQuery(
    options: FindAllOptions<EntityType<Entity>> | undefined,
    withoutDeleted = true,
  ): Knex.QueryBuilder<DictionaryUnknown, DictionaryUnknown[]> {
    const query = this.knex.from(this.mainEntity.table);
    const [joinsByFields, dbFields] = this.prepareFields(options?.fields);
    query.select(dbFields);

    // const hasDeletedAtColumn = this.mainEntity.columns.db.get('deletedAt');
    // if (hasDeletedAtColumn && withoutDeleted) query.whereNull(hasDeletedAtColumn);
    // const joinsByFilters = this.buildFilters(query, this.mainEntity.columns.db, options?.filters);
    // console.log(joinsByFilters);
    // if (options?.orders) query.orderBy(buildOrders(options.orders));
    // if (options?.pagination?.limit) query.limit(options.pagination.limit);
    // if (options?.pagination?.offset) query.offset(options.pagination.offset);
    // if (options?.pagination?.cursor) buildCursor(options.pagination?.cursor, query);

    const joins = new Set(joinsByFields);
    if (joins.size) {
      const mainEntity = this.mainEntity;
      for (const join of joins) {
        const rules = join.rules;
        if (rules && rules.length) {
          query.leftJoin(join.entity.table, function () {
            function recursive(rules: Rule[], or = true) {
              return rules;
            }
            for (const rule of rules) {
              if ('left' in rule) {
                this.andOn(
                  `${mainEntity.table}.${rule.left}`,
                  rule.condition ?? '=',
                  `${join.entity.table}.${rule.right}`,
                );
              } else if ('or' in rule) {
                // TODO: make recursive
                recursive.call(this, rule.or);
              } else if ('and' in rule) {
                // TODO: make recursive
                recursive.call(this, rule.and, false);
              } else {
                return assertNever(rule, `Build query -> Unprocessable conditional type`);
              }
            }
          });
        } else {
          query.leftJoin(
            join.entity.table,
            `${this.mainEntity.table}.${this.mainEntity.dbField('id')}`,
            `${join.entity.table}.${join.entity.table}_id`,
          );
        }
      }
    }

    console.log(query.toSQL());

    return query as unknown as Knex.QueryBuilder<DictionaryUnknown, DictionaryUnknown[]>;
  }

  private fieldsToArray(fields?: EntityFields<EntityType<Entity>>): string[] | undefined {
    if (!fields) return undefined;

    return objectKeys(fields).filter((v) => fields[v] === true);
  }
}
