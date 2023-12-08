import { SupplyCategory } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = SupplyCategory.shape;

export class SupplyCategoryEntity extends DatabaseEntity<typeof SupplyCategory> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'supply_category' as const;

  readonly schema = SupplyCategory;

  readonly conventionalTableName = 'supplyCategory' as const;
  readonly alias = undefined;
}
