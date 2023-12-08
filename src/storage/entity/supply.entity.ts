import { Supply } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = Supply.shape;

export class SupplyEntity extends DatabaseEntity<typeof Supply> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'supply' as const;

  readonly schema = Supply;

  readonly conventionalTableName = undefined;
  readonly alias = undefined;
}
