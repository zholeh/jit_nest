import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MemberNoticeFindAll, MemberNoticeFindOne } from '../model/memberNotice.input';
import { MemberNoticeModel } from '../model/memberNotice.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { MemberNoticeType } from '../../../schema';
import { MemberNoticeService } from '../../../storage/service/memberNotice/memberNotice.service';

@ObjectType()
export class MemberNoticeQuery {}

@Resolver(MemberNoticeQuery)
export class MemberNoticeQueryResolver {
  constructor(private readonly service: MemberNoticeService) {}

  @Query(() => MemberNoticeQuery)
  memberNotice(): boolean {
    return true;
  }

  @ResolveField(() => [MemberNoticeModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => MemberNoticeFindAll })
    options?: MemberNoticeFindAll,
  ): Promise<readonly Partial<MemberNoticeModel>[]> {
    const fields = astFields<MemberNoticeType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => MemberNoticeModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => MemberNoticeFindOne })
    options?: MemberNoticeFindOne,
  ): Promise<Partial<MemberNoticeModel> | undefined> {
    const fields = astFields<MemberNoticeType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
