import { SupplyCategory } from '../../schema/supplyCategory';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const supplyCategoryColumnMap = objectToSnakeCaseKeyMap(SupplyCategory.shape);
export const supplyCategoryColumns = {
  db: objectToSnakeCaseKeyMap(SupplyCategory.shape),
  entity: objectToSnakeCaseValueMap(SupplyCategory.shape),
};
export const supplyCategoryTable = 'supplyCategory';

export class SupplyCategoryEntity extends Entity<typeof SupplyCategory> {
  protected columns = supplyCategoryColumnMap;

  constructor(readonly schema: typeof SupplyCategory) {
    super();

    this.describeField('id', {
      name: 'id',
      type: 'uuid',
      primary: true,
    });
  }
}
