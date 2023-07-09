import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { SupplyCategoryStorage } from './supplyCategory.storage';
import {
  SupplyCategoryCreateType,
  SupplyCategoryLinkType,
  SupplyCategoryType,
  SupplyCategoryUpdateType,
} from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class SupplyCategoryService {
  private storage: SupplyCategoryStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new SupplyCategoryStorage(this.knex);
  }

  async findAll(input: FindAllOptions<SupplyCategoryType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<SupplyCategoryType>) {
    return this.storage.findOne(input);
  }
  async create(input: SupplyCategoryCreateType) {
    return this.storage.create(input);
  }

  async update(input: SupplyCategoryUpdateType) {
    return this.storage.update(input);
  }

  async delete(input: SupplyCategoryLinkType) {
    return this.storage.delete(input);
  }
}
