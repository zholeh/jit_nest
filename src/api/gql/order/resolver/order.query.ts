import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderFindAll, OrderFindOne } from '../model/order.input';
import { OrderModel } from '../model/order.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { OrderType } from '../../../../schema';
import { OrderService } from '../../../../storage/service/order/order.service';

@ObjectType()
export class OrderQuery {}

@Resolver(OrderQuery)
export class OrderQueryResolver {
  constructor(private readonly service: OrderService) {}

  @Query(() => OrderQuery)
  order(): boolean {
    return true;
  }

  @ResolveField(() => [OrderModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => OrderFindAll })
    options?: OrderFindAll,
  ): Promise<readonly Partial<OrderModel>[]> {
    const fields = astFields<OrderType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => OrderModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => OrderFindOne })
    options?: OrderFindOne,
  ): Promise<Partial<OrderModel> | undefined> {
    const fields = astFields<OrderType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
