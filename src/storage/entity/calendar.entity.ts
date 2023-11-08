import { Calendar } from '../../schema';
import { objectToSnakeCaseKeyMap, objectToSnakeCaseValueMap } from '../helper/caseProcessing';
import { Entity } from './entity.abstract';

const calendarColumnMap = objectToSnakeCaseKeyMap(Calendar.shape);
export const calendarColumns = {
  db: objectToSnakeCaseKeyMap(Calendar.shape),
  valueObject: objectToSnakeCaseValueMap(Calendar.shape),
};
export const calendarTable = 'calendar';

export class CalendarEntity extends Entity<typeof Calendar> {
  protected columns = calendarColumnMap;

  constructor(readonly schema: typeof Calendar) {
    super();
  }
}
