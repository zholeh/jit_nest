import { TypeOf, ZodObject, ZodRawShape, z } from 'zod';
import { Cursor, Filter, OrderDirection } from '../../helper/types';
import { Knex } from 'knex';
import { ServiceExceptions } from '../../exception';
import { isArray, isBetweenObject, isBoolean, isNumber, isString } from '../../helper/predicates';
import { isDate } from 'util/types';
import { objectEntries } from '../../helper/object';

type DbValue = string | number | boolean | Date;

function getDbValue(value: unknown): DbValue {
  if (isBoolean(value) || isString(value) || isNumber(value) || isDate(value)) return value;
  else
    throw new ServiceExceptions.UnprocessableEntity(
      `Incorrect operator value type: ${typeof value}, ${JSON.stringify(value)}`,
    );
}

function getBetweenValue(value: unknown): [DbValue, DbValue] {
  if (isBetweenObject(value)) return [getDbValue(value.start), getDbValue(value.end)];
  else throw new ServiceExceptions.UnprocessableEntity(`Incorrect operator value between type: ${value}`);
}

function getInValue(value: unknown): DbValue[] {
  if (isArray(value)) return value.map((el) => getDbValue(el));
  else throw new ServiceExceptions.UnprocessableEntity(`Incorrect operator value array type: ${value}`);
}

function addWhere(
  builder: Knex.QueryBuilder,
  { key, value, operator }: { key: string; value: unknown; operator: string },
): Knex.QueryBuilder {
  if (operator === 'eq') return builder.andWhere(key, '=', getDbValue(value));
  else if (operator === 'notEq') return builder.andWhere(key, '<>', getDbValue(value));
  else if (operator === 'lt') return builder.andWhere(key, '<', getDbValue(value));
  else if (operator === 'lte') return builder.andWhere(key, '<=', getDbValue(value));
  else if (operator === 'gt') return builder.andWhere(key, '>', getDbValue(value));
  else if (operator === 'gte') return builder.andWhere(key, '>=', getDbValue(value));
  else if (operator === 'between') return builder.andWhereBetween(key, getBetweenValue(value));
  else if (operator === 'notBetween') return builder.andWhereNotBetween(key, getBetweenValue(value));
  else if (operator === 'isNull') return builder.andWhere(key, 'IS NULL');
  else if (operator === 'isNotNull') return builder.andWhere(key, 'IS NOT NULL');
  else if (operator === 'in') return builder.andWhere(key, 'IN', getInValue(value));
  else if (operator === 'notIn') return builder.andWhere(key, 'NOT IN', getInValue(value));
  else if (operator === 'contains') return builder.andWhereILike(key, `%${getDbValue(value)}%`);
  else if (operator === 'notContains') return builder.andWhere(key, 'NOT ILIKE', `%${getDbValue(value)}%`);
  else if (operator === 'startsWith') return builder.andWhereILike(key, `${value}%`);
  else if (operator === 'notStartsWith') return builder.andWhere(key, 'NOT ILIKE', `${getDbValue(value)}%`);
  else if (operator === 'endsWith') return builder.andWhereILike(key, `%${getDbValue(value)}`);
  else if (operator === 'notEndsWith') return builder.andWhere(key, 'NOT ILIKE', `%${getDbValue(value)}`);
  throw new ServiceExceptions.UnprocessableEntity(`Unknown operator: ${key}`);
}

function getCursorOperator(direction: OrderDirection) {
  return direction === OrderDirection.ASC ? '>' : '<';
}

export function buildFilters<Entity extends ZodObject<ZodRawShape>>(
  query: Knex.QueryBuilder,
  filters: Filter<TypeOf<Entity>>[],
  mapping: Map<string | number | symbol, string>,
): Knex.QueryBuilder<any, any> {
  query.andWhere((builderAnd) => {
    filters.forEach((filter) => {
      builderAnd.orWhere((builder) => {
        objectEntries(filter).forEach(([filterKey, filterOperator]) => {
          if (filterKey === 'or') {
            builder = buildFilters(builder, filterOperator as Filter<TypeOf<Entity>>[], mapping);
          } else {
            if (!filterOperator) return;
            objectEntries(filterOperator).forEach(([operatorKey, operatorValue]) => {
              builder = addWhere(builder, {
                key: mapping.get(filterKey) || filterKey,
                value: operatorValue,
                operator: operatorKey,
              });
            });
          }
        });
        return builder;
      });
      return builderAnd;
    });
  });
  return query;
}

export function buildCursor<Entity extends ZodObject<ZodRawShape>>(
  cursor: Cursor<z.infer<Entity>>,
  query: Knex.QueryBuilder,
) {
  // EXAMPLE:
  // select * from TABLE t
  // order by "type" desc, text desc, id asc
  // ;
  // select * from TABLE t
  // where (type = 'audio' and val = 1 and id > 2517) or (type > 'audio' or val > 1)
  // order by "type" asc, val asc, id asc
  // limit 100
  // ;

  const startFrom = cursor.startFrom;
  query.andWhere((builderCursor) => {
    builderCursor.orWhere((builderEqualGroup) => {
      objectEntries(startFrom).forEach(([key, pointer]) => {
        builderEqualGroup.andWhere(key, '=', getDbValue(pointer?.value));
      });
      builderEqualGroup.andWhere('id', '>', getDbValue(cursor.id));
      return builderEqualGroup;
    });
    builderCursor.orWhere((builderEqualGroup) => {
      let key: keyof typeof startFrom;
      for (key in startFrom) {
        const pointerValue = startFrom[key];
        if (!pointerValue)
          throw new ServiceExceptions.UnprocessableEntity(`Unknown pointer value for key: ${key.toString()}`);
        builderEqualGroup.orWhere(key, getCursorOperator(pointerValue.order), getDbValue(pointerValue.value));
      }
      return builderEqualGroup;
    });
  });
}
