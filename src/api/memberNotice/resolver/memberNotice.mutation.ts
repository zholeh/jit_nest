import { Args, ID, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { MemberNoticeIdType } from '../../../schema';
import { MemberNoticeCreateInput, MemberNoticeUpdateInput } from '../model/memberNotice.input';
import { MemberNoticeModel } from '../model/memberNotice.model';
import { MemberNoticeService } from '../../../storage/service/memberNotice/memberNotice.service';

@ObjectType()
export class MemberNoticeMutation {}

@Resolver(MemberNoticeMutation)
export class MemberNoticeMutationResolver {
  constructor(private readonly service: MemberNoticeService) {}

  @Mutation(() => MemberNoticeMutation)
  memberNotice(): boolean {
    return true;
  }

  @ResolveField(() => MemberNoticeModel)
  async create(@Args('input') input: MemberNoticeCreateInput): Promise<MemberNoticeModel> {
    return this.service.create({ ...input });
  }

  @ResolveField(() => MemberNoticeModel)
  async update(@Args('input') input: MemberNoticeUpdateInput): Promise<MemberNoticeModel> {
    return this.service.update(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: MemberNoticeIdType): Promise<boolean> {
    return this.service.delete({ id });
  }
}
