import { TeamMate } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const teamMateColumnMap = objectToSnakeCaseKeyMap(TeamMate.shape);
export const teamMateColumns = {
  db: objectToSnakeCaseKeyMap(TeamMate.shape),
  entity: objectToSnakeCaseValueMap(TeamMate.shape),
};
export const teamMateTable = 'teamMate';

export class TeamMateEntity extends Entity<typeof TeamMate> {
  protected columns = teamMateColumnMap;

  constructor(readonly schema: typeof TeamMate) {
    super();

    this.describeField('id', {
      name: 'id',
      type: 'uuid',
      primary: true,
    });
  }
}
