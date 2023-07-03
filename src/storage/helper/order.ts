import { Order, OrderDirection } from '../../helper/types';
import { TypeOf, ZodObject, ZodRawShape } from 'zod';

export function buildOrders<Entity extends ZodObject<ZodRawShape>>(orders: Order<TypeOf<Entity>>[]) {
  const arr = [];
  orders.forEach((el) => {
    arr.push({ column: el.column, order: el.order || OrderDirection.ASC });
  });
  arr.push({ column: 'id', order: OrderDirection.ASC });
  return arr;
}
