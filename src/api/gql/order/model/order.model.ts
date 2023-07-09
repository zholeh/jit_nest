import { Field, ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { z } from 'zod';
import { Order, OrderSupply } from '../../../../schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

// TODO: Fix bug: unnecessary class declaration
@ObjectType()
export class OrderSupplyModel extends modelFromZod(
  z.object(OrderSupply.shape),
  prepareModelFromZodOptions('OrderSupplyModel'),
) {}

@ObjectType()
export class OrderModel extends modelFromZod(Order.omit({ supplies: true }), prepareModelFromZodOptions('OrderModel')) {
  @Field(() => [OrderSupplyModel])
  supplies!: OrderSupplyModel[];
}
