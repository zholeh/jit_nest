import { Args, ID, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { ChannelIdType } from '../../../../schema';
import { ChannelCreateInput, ChannelUpdateInput } from '../model/channel.input';
import { ChannelModel } from '../model/channel.model';
import { ChannelService } from '../../../../storage/service/channel/channel.service';

@ObjectType()
export class ChannelMutation {}

@Resolver(ChannelMutation)
export class ChannelMutationResolver {
  constructor(private readonly service: ChannelService) {}

  @Mutation(() => ChannelMutation)
  channel(): boolean {
    return true;
  }

  @ResolveField(() => ChannelModel)
  async create(@Args('input') input: ChannelCreateInput): Promise<ChannelModel> {
    return this.service.create({ ...input });
  }

  @ResolveField(() => ChannelModel)
  async update(@Args('input') input: ChannelUpdateInput): Promise<ChannelModel> {
    return this.service.update(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: ChannelIdType): Promise<boolean> {
    return this.service.delete({ id });
  }
}
