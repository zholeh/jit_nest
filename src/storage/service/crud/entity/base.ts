import { Knex } from 'nestjs-knex';
import { DictionaryUnknown } from '../../../../helper/types';
import { ColumnsType, EntitySchema, EntityType, KeyofEntity } from './types';

export abstract class BaseCrud<Entity extends EntitySchema> {
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
      let schema = this.schema.omit({});
      Object.entries(this.schema.shape).map(([key]) => {
        if (!fields.find((el) => el === key)) schema = schema.omit({ [key]: true });
      });
      return schema.parse(obj);
    }
    return this.schema.parse(obj);
  }

  protected db(entity: EntityType<Entity>): DictionaryUnknown {
    const obj: DictionaryUnknown = Object.fromEntries(
      Object.entries(entity).map(([key, value]) => {
        const field = this.dbField(key);
        return [field, value];
      }),
    );
    return obj;
  }

  protected entityField(field: string): KeyofEntity<Entity> {
    return this.columns.entity.get(field) || field.toString();
  }

  protected dbFields(arr?: KeyofEntity<Entity>[]): string[] {
    if (!arr) return ['*'];
    return arr.map((el) => this.dbField(el));
  }

  protected dbField(field: KeyofEntity<Entity>): string {
    return this.columns.db.get(field) || field.toString();
  }
}
