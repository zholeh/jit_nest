import { TeamMate } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = TeamMate.shape;

export class TeamMateEntity extends DatabaseEntity<typeof TeamMate> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'team_mate' as const;

  readonly schema = TeamMate;

  readonly conventionalTableName = 'teamMate' as const;
  readonly alias = undefined;
}
