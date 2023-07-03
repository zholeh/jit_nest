import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CurrencyStorage } from './currency.storage';
import { CurrencyCreateType, CurrencyLinkType, CurrencyType, CurrencyUpdateType } from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class CurrencyService {
  private storage: CurrencyStorage;
  constructor(@InjectKnex() private knex: Knex) {
    this.storage = new CurrencyStorage(knex);
  }

  async findAll(input: FindAllOptions<CurrencyType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<CurrencyType>) {
    return this.storage.findOne(input);
  }
  async create(input: CurrencyCreateType) {
    return this.storage.create(input);
  }

  async update(input: CurrencyUpdateType) {
    return this.storage.update(input);
  }

  async delete(input: CurrencyLinkType) {
    return this.storage.delete(input);
  }
}
