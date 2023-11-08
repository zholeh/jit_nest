import { User } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const userColumnMap = objectToSnakeCaseKeyMap(User.shape);
export const userColumns = {
  db: objectToSnakeCaseKeyMap(User.shape),
  entity: objectToSnakeCaseValueMap(User.shape),
};
export const userTable = 'user';

export class UserEntity extends Entity<typeof User> {
  protected columns = userColumnMap;

  constructor(readonly schema: typeof User) {
    super();

    this.describeField('id', {
      name: 'id',
      type: 'uuid',
      primary: true,
    });
  }
}
