import { Order } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = Order.shape;

export class OrderEntity extends DatabaseEntity<typeof Order> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'order' as const;

  readonly schema = Order;

  readonly conventionalTableName = undefined;
}
