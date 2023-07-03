import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrencyFindAll, CurrencyFindOne } from '../model/currency.input';
import { CurrencyModel } from '../model/currency.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { CurrencyType } from '../../../schema';
import { CurrencyService } from '../../../storage/service/currency/currency.service';

@ObjectType()
export class CurrencyQuery {}

@Resolver(CurrencyQuery)
export class CurrencyQueryResolver {
  constructor(private readonly service: CurrencyService) {}

  @Query(() => CurrencyQuery)
  currency(): boolean {
    return true;
  }

  @ResolveField(() => [CurrencyModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => CurrencyFindAll })
    options?: CurrencyFindAll,
  ): Promise<readonly Partial<CurrencyModel>[]> {
    const fields = astFields<CurrencyType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => CurrencyModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => CurrencyFindOne })
    options?: CurrencyFindOne,
  ): Promise<Partial<CurrencyModel> | undefined> {
    const fields = astFields<CurrencyType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
