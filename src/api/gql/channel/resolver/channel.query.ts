import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ChannelFindAll, ChannelFindOne } from '../model/channel.input';
import { ChannelModel } from '../model/channel.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { ChannelType } from '../../../../schema';
import { ChannelService } from '../../../../storage/service/channel/channel.service';

@ObjectType()
export class ChannelQuery {}

@Resolver(ChannelQuery)
export class ChannelQueryResolver {
  constructor(private readonly service: ChannelService) {}

  @Query(() => ChannelQuery)
  channel(): boolean {
    return true;
  }

  @ResolveField(() => [ChannelModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => ChannelFindAll })
    options?: ChannelFindAll,
  ): Promise<readonly Partial<ChannelModel>[]> {
    const fields = astFields<ChannelType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => ChannelModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => ChannelFindOne })
    options?: ChannelFindOne,
  ): Promise<Partial<ChannelModel> | undefined> {
    const fields = astFields<ChannelType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
