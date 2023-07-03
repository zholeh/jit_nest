import { Currency } from '../../schema/currency';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const currencyColumnMap = objectToSnakeCaseKeyMap(Currency.shape);
export const currencyColumns = {
  db: objectToSnakeCaseKeyMap(Currency.shape),
  entity: objectToSnakeCaseValueMap(Currency.shape),
};
export const currencyTable = 'currency';

export class CurrencyEntity extends Entity<typeof Currency> {
  protected columns = currencyColumnMap;

  constructor(readonly schema: typeof Currency) {
    super();

    this.describeField('id', {
      name: 'id',
      type: 'uuid',
      primary: true,
    });
  }
}
