import { Args, ID, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { SupplyCategoryIdType } from '../../../../schema';
import { SupplyCategoryCreateInput, SupplyCategoryUpdateInput } from '../model/supplyCategory.input';
import { SupplyCategoryModel } from '../model/supplyCategory.model';
import { SupplyCategoryService } from '../../../../storage/service/supplyCategory/supplyCategory.service';

@ObjectType()
export class SupplyCategoryMutation {}

@Resolver(SupplyCategoryMutation)
export class SupplyCategoryMutationResolver {
  constructor(private readonly service: SupplyCategoryService) {}

  @Mutation(() => SupplyCategoryMutation)
  supplyCategory(): boolean {
    return true;
  }

  @ResolveField(() => SupplyCategoryModel)
  async create(@Args('input') input: SupplyCategoryCreateInput): Promise<SupplyCategoryModel> {
    return this.service.create({ ...input });
  }

  @ResolveField(() => SupplyCategoryModel)
  async update(@Args('input') input: SupplyCategoryUpdateInput): Promise<SupplyCategoryModel> {
    return this.service.update(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: SupplyCategoryIdType): Promise<boolean> {
    return this.service.delete({ id });
  }
}
