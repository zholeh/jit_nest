import { Args, ID, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrencyIdType } from '../../../../schema';
import { CurrencyCreateInput, CurrencyUpdateInput } from '../model/currency.input';
import { CurrencyModel } from '../model/currency.model';
import { CurrencyService } from '../../../../storage/service/currency/currency.service';

@ObjectType()
export class CurrencyMutation {}

@Resolver(CurrencyMutation)
export class CurrencyMutationResolver {
  constructor(private readonly service: CurrencyService) {}

  @Mutation(() => CurrencyMutation)
  currency(): boolean {
    return true;
  }

  @ResolveField(() => CurrencyModel)
  async create(@Args('input') input: CurrencyCreateInput): Promise<CurrencyModel> {
    return this.service.create({ ...input });
  }

  @ResolveField(() => CurrencyModel)
  async update(@Args('input') input: CurrencyUpdateInput): Promise<CurrencyModel> {
    return this.service.update(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: CurrencyIdType): Promise<boolean> {
    return this.service.delete({ id });
  }
}
