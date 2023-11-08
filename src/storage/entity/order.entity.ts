import { Order } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const orderColumnMap = objectToSnakeCaseKeyMap(Order.shape);
export const orderColumns = {
  db: objectToSnakeCaseKeyMap(Order.shape),
  entity: objectToSnakeCaseValueMap(Order.shape),
};
export const orderTable = 'order';

export class OrderEntity extends Entity<typeof Order> {
  protected columns = orderColumnMap;

  constructor(readonly schema: typeof Order) {
    super();

    this.describeField('id', {
      name: 'id',
      type: 'uuid',
      primary: true,
    });
  }
}
