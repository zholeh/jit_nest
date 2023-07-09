import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import {
  OrderCreate,
  OrderFilter,
  OrderOrder,
  OrderPagination,
  OrderType,
  OrderUpdate,
} from '../../../../schema/order';
import { Field, InputType } from '@nestjs/graphql';
import { FindAllOptions, FindOneOptions } from '../../../../helper/types';

@InputType()
export class OrderCreateInput extends inputFromZod(OrderCreate, prepareInputFromZodOptions('OrderCreateInput')) {}

@InputType()
export class OrderUpdateInput extends inputFromZod(OrderUpdate, prepareInputFromZodOptions('OrderUpdateInput')) {}

@InputType()
export class OrderFilterInput extends inputFromZod(OrderFilter, prepareInputFromZodOptions('OrderFilterInput')) {}

@InputType()
export class OrderOrderInput extends inputFromZod(OrderOrder, prepareInputFromZodOptions('OrderOrderInput')) {}

@InputType()
export class OrderPaginationInput extends inputFromZod(
  OrderPagination,
  prepareInputFromZodOptions('OrderPaginationInput'),
) {}

@InputType()
export class OrderFindAll implements FindAllOptions<OrderType> {
  @Field(() => [OrderFilterInput], { nullable: true })
  filters?: OrderFilterInput[];

  @Field(() => [OrderOrderInput], { nullable: true })
  orders?: OrderOrderInput[];

  @Field(() => OrderPaginationInput, { nullable: true })
  pagination?: OrderPaginationInput;
}

@InputType()
export class OrderFindOne implements FindOneOptions<OrderType> {
  @Field(() => [OrderFilterInput], { nullable: true })
  filters?: OrderFilterInput[];
}
