import { Knex } from 'nestjs-knex';
import { Calendar, CalendarCreate, CalendarType } from '../../../schema/calendar';
import { calendarColumns, calendarTable } from '../../entity/calendar.entity';
import { CrudValueObjectFactory } from '../crud/value/crud.value';

export class CalendarStorage extends CrudValueObjectFactory({
  valueObject: Calendar,
  create: CalendarCreate,
}) {
  protected readonly keyFields: [keyof CalendarType, ...(keyof CalendarType)[]] = ['teamMateId', 'date'];
  protected readonly table = calendarTable;
  protected readonly columns = calendarColumns;
  protected readonly schema = Calendar;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
