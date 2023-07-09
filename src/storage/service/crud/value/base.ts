import { Knex } from 'nestjs-knex';
import { DictionaryUnknown } from '../../../../helper/types';
import { ColumnsValueType, KeyofValue, ValueSchema, ValueType } from './types';

export abstract class BaseValueCrud<Value extends ValueSchema> {
  protected abstract readonly table: string;
  protected abstract readonly schema: Value;
  protected abstract readonly keyFields: [ColumnsValueType<Value>, ...ColumnsValueType<Value>[]];
  protected abstract readonly columns: ColumnsValueType<Value>;

  protected abstract readonly knex: Knex;

  get builder() {
    return this.knex(this.table);
  }

  protected valueObject(valueObject: DictionaryUnknown, fields?: KeyofValue<Value>[]): ValueType<Value> {
    const obj = Object.fromEntries(
      Object.entries(valueObject).map(([key, value]) => {
        const field = this.valueObjectField(key);
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

  protected db(valueObject: ValueType<Value>): DictionaryUnknown {
    const obj: DictionaryUnknown = Object.fromEntries(
      Object.entries(valueObject).map(([key, value]) => {
        const field = this.dbField(key);
        return [field, value];
      }),
    );
    return obj;
  }

  protected valueObjectField(field: string): KeyofValue<Value> {
    return this.columns.valueObject.get(field) || field.toString();
  }

  protected dbFields(arr?: KeyofValue<Value>[]): string[] {
    if (!arr) return ['*'];
    return arr.map((el) => this.dbField(el));
  }

  protected dbField(field: KeyofValue<Value>): string {
    return this.columns.db.get(field) || field.toString();
  }
}
