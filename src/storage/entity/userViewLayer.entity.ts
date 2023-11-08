import { UserViewLayer } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const userLayerColumnMap = objectToSnakeCaseKeyMap(UserViewLayer.shape);
export const userLayerColumns = {
  db: objectToSnakeCaseKeyMap(UserViewLayer.shape),
  valueObject: objectToSnakeCaseValueMap(UserViewLayer.shape),
};
export const userLayerTable = 'user_view_layer';

export class UserLayerEntity extends Entity<typeof UserViewLayer> {
  protected columns = userLayerColumnMap;

  constructor(readonly schema: typeof UserViewLayer) {
    super();
  }
}
