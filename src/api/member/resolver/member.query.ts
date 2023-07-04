import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MemberFindAll, MemberFindOne } from '../model/member.input';
import { MemberModel } from '../model/member.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { MemberType } from '../../../schema';
import { MemberService } from '../../../storage/service/member/member.service';

@ObjectType()
export class MemberQuery {}

@Resolver(MemberQuery)
export class MemberQueryResolver {
  constructor(private readonly service: MemberService) {}

  @Query(() => MemberQuery)
  member(): boolean {
    return true;
  }

  @ResolveField(() => [MemberModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => MemberFindAll })
    options?: MemberFindAll,
  ): Promise<readonly Partial<MemberModel>[]> {
    const fields = astFields<MemberType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => MemberModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => MemberFindOne })
    options?: MemberFindOne,
  ): Promise<Partial<MemberModel> | undefined> {
    const fields = astFields<MemberType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
