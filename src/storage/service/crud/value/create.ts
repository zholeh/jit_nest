import { UnprocessableEntityServiceError } from '../../../../exception';
import { DictionaryUnknown } from '../../../../helper/types';
import { BaseValueObjectCrud } from './base';
import { ValueObjectSchema as ValueObjectSchema, ValueObjectType } from './types';

export abstract class Create<
  ValueObject extends ValueObjectSchema,
  ValueObjectCreate extends DictionaryUnknown,
> extends BaseValueObjectCrud<ValueObject> {
  async create(
    link: {
      [K in BaseValueObjectCrud<ValueObject>['keyFields'][number]]: ValueObject[K];
    },
    input: ValueObjectCreate[],
  ): Promise<ValueObjectType<ValueObject>> {
    await this.delete(link);
    const result = await this.builder.insert(this.db(input)).returning('*');
    if (result.length) return this.valueObject(result[0]);
    throw new UnprocessableEntityServiceError(`Incorrect insert ${JSON.stringify(input)}`);
  }

  async delete(link: {
    [K in BaseValueObjectCrud<ValueObject>['keyFields'][number]]: ValueObject[K];
  }): Promise<boolean> {
    const where = this.db(link);
    const result = await this.builder.where(where).delete();
    if (result > 0) return true;
    return false;
  }
}
