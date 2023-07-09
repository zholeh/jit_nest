import { UnprocessableEntityServiceError } from '../../../../exception';
import { DictionaryUnknown } from '../../../../helper/types';
import { BaseValueCrud } from './base';
import { ValueSchema, ValueType } from './types';

export abstract class Create<
  Value extends ValueSchema,
  ValueCreate extends DictionaryUnknown,
> extends BaseValueCrud<Value> {
  async create<K extends keyof Value>(
    link: { key: K; value: Value[K] }[],
    input: ValueCreate,
  ): Promise<ValueType<Value>> {
    await this.delete(link);
    const result = await this.builder.insert(this.db(input)).returning('*');
    if (result.length) return this.valueObject(result[0]);
    throw new UnprocessableEntityServiceError(`Incorrect insert ${JSON.stringify(input)}`);
  }

  // TODO: create many
  // async createMany(input: ValueCreate[]): Promise<ValueType<Value>[]> {
  //   const result = await this.builder.insert(input).returning('*');
  //   if (result.length) return result.map((el) => this.valueObject(el));
  //   throw new UnprocessableEntityServiceError(`Incorrect insert ${JSON.stringify(input)}`);
  // }

  async delete<K extends keyof Value>(link: { key: K; value: Value[K] }[]): Promise<boolean> {
    const where = link.reduce<DictionaryUnknown>((acc, v) => {
      acc[v.key.toString()] = v.value;
      return acc;
    }, {});
    const result = await this.builder.where(where).delete();
    if (result > 0) return true;
    return false;
  }
}
