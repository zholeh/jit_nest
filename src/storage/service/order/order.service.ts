import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { OrderStorage } from './order.storage';
import { OrderCreateType, OrderLinkType, OrderType, OrderUpdateType } from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class OrderService {
  private storage: OrderStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new OrderStorage(this.knex);
  }

  async findAll(input: FindAllOptions<OrderType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<OrderType>) {
    return this.storage.findOne(input);
  }
  async create(input: OrderCreateType) {
    return this.storage.create(input);
  }

  async update(input: OrderUpdateType) {
    return this.storage.update(input);
  }

  async delete(input: OrderLinkType) {
    return this.storage.delete(input);
  }
}
