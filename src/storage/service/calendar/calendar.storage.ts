import { Knex } from 'nestjs-knex';
import { Calendar, CalendarCreate, CalendarType } from '../../../schema';
import { calendarColumns, calendarTable } from '../../entity/calendar.entity';
import { CrudValueObjectFactory } from '../crud/value/crud.value';
import { Logger } from '@nestjs/common';

export class CalendarStorage extends CrudValueObjectFactory({
  valueObject: Calendar,
  create: CalendarCreate,
}) {
  protected readonly keyFields: [keyof CalendarType, ...(keyof CalendarType)[]] = ['teamMateId', 'date'];
  protected readonly table = calendarTable;
  protected readonly columns = calendarColumns;
  protected readonly schema = Calendar;
  protected readonly knex;
  protected readonly logger = new Logger('Calendar storage');

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
