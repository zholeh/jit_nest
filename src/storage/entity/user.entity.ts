import { User } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = User.shape;

export class UserEntity extends DatabaseEntity<typeof User> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'user' as const;

  readonly schema = User;

  readonly conventionalTableName = undefined;
}
