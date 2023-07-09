import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SupplyCategoryFindAll, SupplyCategoryFindOne } from '../model/supplyCategory.input';
import { SupplyCategoryModel } from '../model/supplyCategory.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { SupplyCategoryType } from '../../../../schema';
import { SupplyCategoryService } from '../../../../storage/service/supplyCategory/supplyCategory.service';

@ObjectType()
export class SupplyCategoryQuery {}

@Resolver(SupplyCategoryQuery)
export class SupplyCategoryQueryResolver {
  constructor(private readonly service: SupplyCategoryService) {}

  @Query(() => SupplyCategoryQuery)
  supplyCategory(): boolean {
    return true;
  }

  @ResolveField(() => [SupplyCategoryModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => SupplyCategoryFindAll })
    options?: SupplyCategoryFindAll,
  ): Promise<readonly Partial<SupplyCategoryModel>[]> {
    const fields = astFields<SupplyCategoryType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => SupplyCategoryModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => SupplyCategoryFindOne })
    options?: SupplyCategoryFindOne,
  ): Promise<Partial<SupplyCategoryModel> | undefined> {
    const fields = astFields<SupplyCategoryType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
