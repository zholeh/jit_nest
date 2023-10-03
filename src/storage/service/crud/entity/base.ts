import { Knex } from 'nestjs-knex';
import { DictionaryUnknown } from '../../../../helper/types';
import { ColumnsType, EntitySchema, EntityType, KeyofEntity } from './types';

export abstract class BaseEntityCrud<Entity extends EntitySchema> {
  protected abstract readonly table: string;
  protected abstract readonly schema: Entity;
  protected abstract readonly columns: ColumnsType<Entity>;

  protected abstract readonly knex: Knex;

  get builder() {
    return this.knex(this.table);
  }

  protected entity(entity: DictionaryUnknown, fields?: KeyofEntity<Entity>[]): EntityType<Entity> {
    const obj = Object.fromEntries(
      Object.entries(entity).map(([key, value]) => {
        const field = this.entityField(key);
        return [field, value];
      }),
    );

    if (fields) {
      const shape = Object.keys(this.schema.shape).reduce<Partial<Record<KeyofEntity<Entity>, true>>>(
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

  protected db(entity: EntityType<Entity>): DictionaryUnknown {
    const obj = Object.keys(entity).reduce<DictionaryUnknown>((acc, key) => {
      acc[this.dbField(key)] = entity[key];
      return acc;
    }, {});
    return obj;
  }

  protected entityField(field: string): KeyofEntity<Entity> {
    return this.columns.entity.get(field) || field;
  }

  protected dbFields(arr?: KeyofEntity<Entity>[]): string[] {
    if (!arr) return ['*'];
    return arr.map((el) => this.dbField(el));
  }

  protected dbField(field: KeyofEntity<Entity>): string {
    return this.columns.db.get(field) || field.toString();
  }

  private hasField(fields: (keyof EntityType<Entity>)[], key: keyof EntityType<Entity>): boolean {
    return fields.find((el) => el === key) !== undefined;
  }
}
