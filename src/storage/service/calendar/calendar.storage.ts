import { Knex } from 'nestjs-knex';
import { Calendar, CalendarCreate, CalendarType } from '../../../schema';
import { CrudValueObjectFactory } from '../crud/value/crud.value';
import { Logger } from '@nestjs/common';
import { calendarEntity } from '../../entity';

export class CalendarStorage extends CrudValueObjectFactory({
  valueObject: Calendar,
  create: CalendarCreate,
}) {
  protected readonly dbEntity = calendarEntity;
  protected readonly keyFields: [keyof CalendarType, ...(keyof CalendarType)[]] = ['teamMateId', 'date'];
  protected readonly knex;
  protected readonly logger = new Logger('Calendar storage');

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
