import { Supply } from '../../schema/supply';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const supplyColumnMap = objectToSnakeCaseKeyMap(Supply.shape);
export const supplyColumns = {
  db: objectToSnakeCaseKeyMap(Supply.shape),
  entity: objectToSnakeCaseValueMap(Supply.shape),
};
export const supplyTable = 'supply';

export class SupplyEntity extends Entity<typeof Supply> {
  protected columns = supplyColumnMap;

  constructor(readonly schema: typeof Supply) {
    super();

    this.describeField('id', {
      name: 'id',
      type: 'uuid',
      primary: true,
    });
  }
}
