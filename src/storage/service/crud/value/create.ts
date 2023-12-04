import { ServiceExceptions } from '../../../../exception';
import { UnprocessableEntityServiceError } from '../../../../exception/service/unprocessableEntity';
import { objectKeys } from '../../../../helper/object';
import { DictionaryUnknown } from '../../../../helper/types';
import { BaseValueObjectCrud } from './base';
import { ValueObjectSchema as ValueObjectSchema, ValueObjectType } from './types';

export abstract class Create<
  ValueObject extends ValueObjectSchema,
  ValueObjectCreate extends DictionaryUnknown,
> extends BaseValueObjectCrud<ValueObject> {
  async upsert(
    link: Partial<{
      [K in BaseValueObjectCrud<ValueObject>['keyFields'][number]]: ValueObject[K];
    }>,
    input: ValueObjectCreate[],
  ): Promise<ValueObjectType<ValueObject>> {
    try {
      const linkKeys = this.dbEntity.dbFields(objectKeys(link));
      const result = await this.builder
        .insert(
          input.map((v) => {
            return this.dbEntity.db({ ...v, ...link });
          }),
        )
        .onConflict(linkKeys)
        .merge()
        .returning('*');

      if (result.length) return this.dbEntity.entity(result[0]);
      throw new ServiceExceptions.UnprocessableEntity(`Incorrect insert ${JSON.stringify(input)}`);
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityServiceError(`Can't insert ${this.dbEntity.table}: ${JSON.stringify(link)}`);
    }
  }

  async deleteThanInsert(
    link: Partial<{
      [K in BaseValueObjectCrud<ValueObject>['keyFields'][number]]: ValueObject[K];
    }>,
    input: ValueObjectCreate[],
  ): Promise<ValueObjectType<ValueObject>> {
    await this.delete(link);
    const result = await this.insert(link, input);
    if (result.length) return this.dbEntity.entity(result[0]);
    throw new ServiceExceptions.UnprocessableEntity(`Incorrect insert ${JSON.stringify(input)}`);
  }

  async delete(
    link: Partial<{
      [K in BaseValueObjectCrud<ValueObject>['keyFields'][number]]: ValueObject[K];
    }>,
  ): Promise<boolean> {
    try {
      const where = this.dbEntity.db(link);
      const result = await this.builder.where(where).delete();
      if (result > 0) return true;
      return false;
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityServiceError(`Can't delete ${this.dbEntity.table}: ${JSON.stringify(link)}`);
    }
  }

  private async insert(
    link: Partial<{
      [K in BaseValueObjectCrud<ValueObject>['keyFields'][number]]: ValueObject[K];
    }>,
    input: ValueObjectCreate[],
  ): Promise<ValueObjectType<ValueObject>> {
    try {
      return await this.builder
        .insert(
          input.map((v) => {
            return this.dbEntity.db({ ...v, ...link });
          }),
        )
        .returning('*');
    } catch (error) {
      this.logger.error(error);
      throw new UnprocessableEntityServiceError(`Can't insert ${this.dbEntity.table}: ${JSON.stringify(link)}`);
    }
  }
}
