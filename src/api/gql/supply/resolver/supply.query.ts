import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SupplyFindAll, SupplyFindOne } from '../model/supply.input';
import { SupplyModel } from '../model/supply.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { SupplyType } from '../../../../schema';
import { SupplyService } from '../../../../storage/service/supply/supply.service';

@ObjectType()
export class SupplyQuery {}

@Resolver(SupplyQuery)
export class SupplyQueryResolver {
  constructor(private readonly service: SupplyService) {}

  @Query(() => SupplyQuery)
  supply(): boolean {
    return true;
  }

  @ResolveField(() => [SupplyModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => SupplyFindAll })
    options?: SupplyFindAll,
  ): Promise<readonly Partial<SupplyModel>[]> {
    const fields = astFields<SupplyType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => SupplyModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => SupplyFindOne })
    options?: SupplyFindOne,
  ): Promise<Partial<SupplyModel> | undefined> {
    const fields = astFields<SupplyType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
