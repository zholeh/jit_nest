import { Team } from '../../schema/team';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const teamColumnMap = objectToSnakeCaseKeyMap(Team.shape);
export const teamColumns = {
  db: objectToSnakeCaseKeyMap(Team.shape),
  entity: objectToSnakeCaseValueMap(Team.shape),
};
export const teamTable = 'team';

export class TeamEntity extends Entity<typeof Team> {
  protected columns = teamColumnMap;

  constructor(readonly schema: typeof Team) {
    super();

    this.describeField('id', {
      name: 'id',
      type: 'uuid',
      primary: true,
    });
  }
}
