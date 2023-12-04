import { Knex } from 'nestjs-knex';
import { Order, OrderCreate, OrderLink, OrderUpdate } from '../../../schema';
import { orderEntity } from '../../entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class OrderStorage extends CrudEntityFactory({
  entity: Order,
  create: OrderCreate,
  update: OrderUpdate,
  delete: OrderLink,
}) {
  protected readonly dbEntity = orderEntity;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
