import { Knex } from 'nestjs-knex';
import { Order, OrderCreate, OrderLink, OrderUpdate } from '../../../schema/order';
import { orderColumns, orderTable } from '../../entity/order.entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class OrderStorage extends CrudEntityFactory({
  entity: Order,
  create: OrderCreate,
  update: OrderUpdate,
  delete: OrderLink,
}) {
  protected readonly table = orderTable;
  protected readonly columns = orderColumns;
  protected readonly schema = Order;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
