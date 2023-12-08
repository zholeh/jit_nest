import { Calendar } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { DatabaseEntity } from './entity.abstract';

const shape = Calendar.shape;

export class CalendarEntity extends DatabaseEntity<typeof Calendar> {
  readonly columns = {
    db: objectToSnakeCaseKeyMap(shape),
    entity: objectToSnakeCaseValueMap(shape),
  };
  readonly table = 'calendar' as const;

  readonly schema = Calendar;

  readonly conventionalTableName = undefined;
  readonly alias = undefined;
}
