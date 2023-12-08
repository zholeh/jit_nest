import { Knex } from 'knex';
import { ServiceExceptions } from '../../../../exception';
import { objectEntries, objectKeys } from '../../../../helper/object';
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
import { AnySchema } from '../../../helper/zod';
import { BaseEntityCrud, Rule, SubRelation } from './base';
import { EntitySchema, EntityType } from './types';

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

  private buildFields(query: Knex.QueryBuilder, fields?: EntityFields<EntityType<Entity>>) {
    const [joins, dbFields] = this.prepareFields(fields);
    query.select(dbFields);
    return joins;
  }

  private prepareFields(fields?: EntityFields<EntityType<Entity>>, parentRelation?: SubRelation, alias = '') {
    const joins: [DatabaseEntity<AnySchema> | DatabaseEntity<MainEntity>, Rule][] = [];
    const result: string[] = [];
    if (!fields) {
      Array.from(this.mainEntity.columns.db).forEach(([, field]) => {
        const prepared = this.prepareDbFieldAndAlias(field, this.mainEntity.table);
        result.push(prepared);
      });
    } else {
      objectKeys(fields).forEach((field) => {
        const value = fields[field];
        console.log(value);

        if (typeof value === 'boolean') {
          const prepared = this.prepareDbFieldAndAlias(field, alias, parentRelation);
          result.push(prepared);
        } else {
          const subRelation = this.getRelation(field);
          if (subRelation) {
            const currentAlias = `${alias}${subRelation.alias || subRelation.entity.table}_`;
            const left = parentRelation?.entity || this.mainEntity;
            joins.push([left, subRelation]);
            const subfields = this.prepareFields(value as EntityFields<EntityType<Entity>>, subRelation, currentAlias);
            console.log(subfields);

            subfields[0].forEach((v) => joins.push(v));
            subfields[1].forEach((v) => result.push(v));
          }
        }
      });
    }

    return [joins, result] as const;
  }

  private prepareDbFieldAndAlias(field: string, alias: string, joinTable?: SubRelation) {
    const table = joinTable?.entity ? joinTable?.entity.table : this.mainEntity.table;
    // const alias = joinTable?.entity ? `${joinTable?.entity.table}_` : '';
    const fieldName = joinTable?.entity ? joinTable?.entity.dbField(field) : this.mainEntity.dbField(field);
    return `${table}.${fieldName} as ${alias}${fieldName}` as const;
  }

  private prepareFilters(mapping: Map<keyof EntityType<Entity>, string>, filters: Filter<EntityType<Entity>>[]) {
    const joins1: [DatabaseEntity<AnySchema> | DatabaseEntity<MainEntity>, Rule][] = [];
    const joins: string[] = [];
    const newFiltersEntries = filters.map((filter) => {
      const newFilter = objectEntries(filter).map(([filterKey, filterOperator]) => {
        if (filterKey === 'or') {
          const [or, orJoins] = this.prepareFilters(mapping, filterOperator as Filter<EntityType<Entity>>[]);
          orJoins.forEach((v) => joins.push(v));
          return ['or', or] as const;
        } else {
          // const [field, alias, table] = this.replacePrefixCache(filterKey);
          // if (table) joins.push(table);
          // return [`${field} ${alias}`, filterOperator as Operator] as const;
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

  // private replacePrefix(value: string) {
  //   for (let i = 0; i < this.joinedTables.length; i++) {
  //     const tableEntity = this.joinedTables[i];
  //     let tableName: string;
  //     let prefix: string;

  //     if (tableEntity instanceof DatabaseEntity) {
  //       tableName = tableEntity.table;
  //       prefix = tableEntity.table;
  //     } else if (tableEntity) {
  //       tableName = tableEntity.entity.table;
  //       prefix = tableEntity.incomingName ?? tableEntity.entity.table;
  //     } else {
  //       throw new UnprocessableEntityServiceError(
  //         `replacePrefix: unrecognized tableEntity: ${JSON.stringify(tableEntity)}}`,
  //       );
  //     }

  //     if (prefix === value) {
  //       return [tableName, value.replace('search', `${tableName}.`)] as const;
  //     }
  //   }
  //   return [] as const;
  // }

  // private replacePrefixCache(value: string) {
  //   this.fieldsCache = this.fieldsCache ?? {};

  //   const cache = this.fieldsCache[value];
  //   if (cache) return cache;

  //   const [tableName, field] = this.replacePrefix(value);
  //   const result = [field ?? `${this.mainEntity.table}.${value}`, value, tableName] as const;
  //   this.fieldsCache[value] = result;
  //   return result;
  // }

  private buildQuery(
    options: FindAllOptions<EntityType<Entity>> | undefined,
    withoutDeleted = true,
  ): Knex.QueryBuilder<DictionaryUnknown, DictionaryUnknown[]> {
    const query = this.knex.from(this.mainEntity.table);
    const joinsByFields = this.buildFields(query, options?.fields);
    const hasDeletedAtColumn = this.mainEntity.columns.db.get('deletedAt');
    if (hasDeletedAtColumn && withoutDeleted) query.whereNull(hasDeletedAtColumn);
    const joinsByFilters = this.buildFilters(query, this.mainEntity.columns.db, options?.filters);
    // console.log(joinsByFilters);
    // if (options?.orders) query.orderBy(buildOrders(options.orders));
    // if (options?.pagination?.limit) query.limit(options.pagination.limit);
    // if (options?.pagination?.offset) query.offset(options.pagination.offset);
    // if (options?.pagination?.cursor) buildCursor(options.pagination?.cursor, query);

    const joins = new Set(joinsByFields);
    query.from(`${this.mainEntity.table} as ${this.mainEntity.alias || this.mainEntity.table}`);
    if (joins.size) {
      for (const join of joins) {
        const leftRule = join[0];
        const rightRule = join[1];
        const joinMethod = this.joinMethod(rightRule, query);

        joinMethod(rightRule.entity.table, function () {
          return this.on(
            `${leftRule.alias || leftRule.table}.${leftRule.dbField(rightRule.left)}`,
            rightRule.condition || '=',
            `${rightRule.alias || rightRule.entity.table}.${rightRule.entity.dbField(rightRule.right)}`,
          );
        });
      }
    }

    console.log(query.toSQL());

    return query as unknown as Knex.QueryBuilder<DictionaryUnknown, DictionaryUnknown[]>;
  }

  private fieldsToArray(fields?: EntityFields<EntityType<Entity>>): string[] | undefined {
    if (!fields) return undefined;

    return objectKeys(fields).filter((v) => fields[v] === true);
  }

  private joinMethod<Q extends Knex.QueryBuilder>(rule: Rule, query: Q): Q['join'] {
    if (rule.method) {
      if (rule.method === 'leftJoin') return query.leftJoin.bind(query);
      if (rule.method === 'rightJoin') return query.rightJoin.bind(query);

      assertNever(rule.method, 'Unknown join method');
    }

    return query.leftJoin.bind(query);
  }
}
