import { Args, ID, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { SupplyIdType } from '../../../../schema';
import { SupplyCreateInput, SupplyUpdateInput } from '../model/supply.input';
import { SupplyModel } from '../model/supply.model';
import { SupplyService } from '../../../../storage/service/supply/supply.service';

@ObjectType()
export class SupplyMutation {}

@Resolver(SupplyMutation)
export class SupplyMutationResolver {
  constructor(private readonly service: SupplyService) {}

  @Mutation(() => SupplyMutation)
  supply(): boolean {
    return true;
  }

  @ResolveField(() => SupplyModel)
  async create(@Args('input') input: SupplyCreateInput): Promise<SupplyModel> {
    return this.service.create({ ...input });
  }

  @ResolveField(() => SupplyModel)
  async update(@Args('input') input: SupplyUpdateInput): Promise<SupplyModel> {
    return this.service.update(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: SupplyIdType): Promise<boolean> {
    return this.service.delete({ id });
  }
}
