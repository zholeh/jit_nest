import { Args, ID, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderIdType } from '../../../../schema';
import { OrderCreateInput, OrderUpdateInput } from '../model/order.input';
import { OrderModel } from '../model/order.model';
import { OrderService } from '../../../../storage/service/order/order.service';

@ObjectType()
export class OrderMutation {}

@Resolver(OrderMutation)
export class OrderMutationResolver {
  constructor(private readonly service: OrderService) {}

  @Mutation(() => OrderMutation)
  order(): boolean {
    return true;
  }

  @ResolveField(() => OrderModel)
  async create(@Args('input') input: OrderCreateInput): Promise<OrderModel> {
    return this.service.create({ ...input });
  }

  @ResolveField(() => OrderModel)
  async update(@Args('input') input: OrderUpdateInput): Promise<OrderModel> {
    return this.service.update(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: OrderIdType): Promise<boolean> {
    return this.service.delete({ id });
  }
}
