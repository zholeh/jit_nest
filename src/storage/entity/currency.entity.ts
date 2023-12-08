import { Currency } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = Currency.shape;

export class CurrencyEntity extends DatabaseEntity<typeof Currency> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'currency' as const;

  readonly schema = Currency;

  readonly conventionalTableName = undefined;
  readonly alias = undefined;
}
