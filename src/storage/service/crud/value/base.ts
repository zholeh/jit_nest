import { Logger } from '@nestjs/common';
import { Knex } from 'nestjs-knex';
import { DatabaseEntity } from '../../../entity/entity.abstract';
import { KeyofValueObject, ValueObjectSchema } from './types';

export abstract class BaseValueObjectCrud<ValueObject extends ValueObjectSchema> {
  protected abstract readonly dbEntity: DatabaseEntity<ValueObject>;
  // protected abstract readonly table: string;
  // protected abstract readonly schema: ValueObject;
  // protected abstract readonly columns: ColumnsValueObjectType<ValueObject>;
  protected abstract readonly keyFields: [KeyofValueObject<ValueObject>, ...KeyofValueObject<ValueObject>[]];
  protected abstract readonly logger: Logger;

  protected abstract readonly knex: Knex;

  get builder() {
    return this.knex(this.dbEntity.table);
  }

  // protected valueObject(
  //   valueObject: DictionaryUnknown,
  //   fields?: KeyofValueObject<ValueObject>[],
  // ): ValueObjectType<ValueObject> {
  //   const obj = Object.fromEntries(
  //     Object.entries(valueObject).map(([key, value]) => {
  //       const field = this.dbEntity.dbField(key);
  //       return [field, value];
  //     }),
  //   );

  //   if (fields) {
  //     let schema = this.dbEntity.schema.omit({});
  //     Object.entries(this.dbEntity.schema.shape).map(([key]) => {
  //       if (!fields.find((el) => el === key)) schema = schema.omit({ [key]: true });
  //     });
  //     return schema.parse(obj);
  //   }
  //   return this.dbEntity.schema.parse(obj);
  // }

  // protected valueObjectField(field: string): KeyofValueObject<ValueObject> {
  //   return this.dbEntity.columns.entity.get(field) || field.toString();
  // }
}
