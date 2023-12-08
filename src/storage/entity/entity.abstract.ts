import { TypeOf } from 'zod';
import { objectEntries, objectKeys } from '../../helper/object';
import { DictionaryUnknown } from '../../helper/types';
import { AnySchema } from '../helper/zod';

type EntityShapeDescription = string;
type ColumnMap<T extends AnySchema> = {
  db: Map<keyof TypeOf<T>, EntityShapeDescription>;
  entity: Map<string, keyof TypeOf<T>>;
};

type EntityType<Entity extends AnySchema> = TypeOf<Entity>;
type KeyofEntity<Entity extends AnySchema> = keyof EntityType<Entity>;

export abstract class DatabaseEntity<Entity extends AnySchema> {
  abstract readonly schema: Entity;
  abstract readonly columns: ColumnMap<Entity>;
  abstract readonly table: string;
  abstract readonly conventionalTableName?: string;
  abstract readonly alias?: string;

  entity(entity: DictionaryUnknown, fields?: KeyofEntity<Entity>[]): EntityType<Entity> {
    const obj = Object.fromEntries(
      objectEntries(entity).map(([key, value]) => {
        const field = this.entityField(key);
        return [field, value];
      }),
    );

    if (fields) {
      const shape = objectKeys(this.schema.shape).reduce<Partial<Record<KeyofEntity<Entity>, true>>>(
        (acc, key: KeyofEntity<Entity>) => {
          if (!this.hasField(fields, key)) acc[key] = true;
          return acc;
        },
        {},
      );
      const schema = this.schema.omit(shape);
      return schema.parse(obj);
    }
    return this.schema.parse(obj);
  }

  db(entity: EntityType<Entity>): DictionaryUnknown {
    const obj = objectKeys(entity).reduce<DictionaryUnknown>((acc, key) => {
      acc[this.dbField(key)] = entity[key];
      return acc;
    }, {});
    return obj;
  }

  entityField(field: string): KeyofEntity<Entity> {
    return this.columns.entity.get(field) || field;
  }

  dbFields(arr?: KeyofEntity<Entity>[]): string[] {
    if (!arr) return ['*'];
    return arr.map((el) => this.dbField(el));
  }

  dbField(field: KeyofEntity<Entity>): string {
    return this.columns.db.get(field) || field.toString();
  }

  hasField(fields: (keyof EntityType<Entity>)[], key: keyof EntityType<Entity>): boolean {
    return fields.find((el) => el === key) !== undefined;
  }
}
