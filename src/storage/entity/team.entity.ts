import { Team } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = Team.shape;

export class TeamEntity extends DatabaseEntity<typeof Team> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'team' as const;

  readonly schema = Team;

  readonly conventionalTableName = undefined;
}
