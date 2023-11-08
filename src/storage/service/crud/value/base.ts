import { Knex } from 'nestjs-knex';
import { DictionaryUnknown } from '../../../../helper/types';
import { ColumnsValueObjectType, KeyofValueObject, ValueObjectSchema, ValueObjectType } from './types';
import { Logger } from '@nestjs/common';

export abstract class BaseValueObjectCrud<ValueObject extends ValueObjectSchema> {
  protected abstract readonly table: string;
  protected abstract readonly schema: ValueObject;
  protected abstract readonly keyFields: [KeyofValueObject<ValueObject>, ...KeyofValueObject<ValueObject>[]];
  // protected abstract readonly keyFields: KeyofValueObject<ValueObject>[];
  protected abstract readonly columns: ColumnsValueObjectType<ValueObject>;
  protected abstract readonly logger: Logger;

  protected abstract readonly knex: Knex;

  get builder() {
    return this.knex(this.table);
  }

  protected valueObject(
    valueObject: DictionaryUnknown,
    fields?: KeyofValueObject<ValueObject>[],
  ): ValueObjectType<ValueObject> {
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

  protected db(valueObject: ValueObjectType<ValueObject>): DictionaryUnknown {
    const obj: DictionaryUnknown = Object.fromEntries(
      Object.entries(valueObject).map(([key, value]) => {
        const field = this.dbField(key);
        return [field, value];
      }),
    );
    return obj;
  }

  protected valueObjectField(field: string): KeyofValueObject<ValueObject> {
    return this.columns.valueObject.get(field) || field.toString();
  }

  protected dbFields(arr?: KeyofValueObject<ValueObject>[]): string[] {
    if (!arr) return ['*'];
    return arr.map((el) => this.dbField(el));
  }

  protected dbField(field: KeyofValueObject<ValueObject>): string {
    return this.columns.db.get(field) || field.toString();
  }
}
