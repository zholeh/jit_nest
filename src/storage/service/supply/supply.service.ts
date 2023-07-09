import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { SupplyStorage } from './supply.storage';
import { SupplyCreateType, SupplyLinkType, SupplyType, SupplyUpdateType } from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class SupplyService {
  private storage: SupplyStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new SupplyStorage(this.knex);
  }

  async findAll(input: FindAllOptions<SupplyType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<SupplyType>) {
    return this.storage.findOne(input);
  }
  async create(input: SupplyCreateType) {
    return this.storage.create(input);
  }

  async update(input: SupplyUpdateType) {
    return this.storage.update(input);
  }

  async delete(input: SupplyLinkType) {
    return this.storage.delete(input);
  }
}
