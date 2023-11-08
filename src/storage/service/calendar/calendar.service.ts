import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CalendarStorage } from './calendar.storage';
import { CalendarCreateType, CalendarLinkType, CalendarType } from '../../../schema';
import { FindAllOptions } from '../../../helper/types';

@Injectable()
export class CalendarService {
  private storage: CalendarStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new CalendarStorage(this.knex);
  }

  async findAll(input: FindAllOptions<CalendarType>) {
    return this.storage.findAll(input);
  }

  async findValues(input: FindAllOptions<CalendarType>) {
    return this.storage.findValues(input);
  }

  async findValuesOrFail(input: FindAllOptions<CalendarType>) {
    return this.storage.findValuesOrFail(input);
  }

  async create(link: CalendarLinkType, input: CalendarCreateType[]) {
    return this.storage.deleteThanInsert(link, input);
  }
}
