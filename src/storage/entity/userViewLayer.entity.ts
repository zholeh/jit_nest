import { UserViewLayer } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = UserViewLayer.shape;

export class UserLayerEntity extends DatabaseEntity<typeof UserViewLayer> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'user_view_layer' as const;

  readonly schema = UserViewLayer;

  readonly conventionalTableName = 'userViewLayer' as const;
  readonly alias = undefined;
}
