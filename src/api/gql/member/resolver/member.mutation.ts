import { Args, ID, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { MemberIdType } from '../../../../schema';
import { MemberCreateInput, MemberUpdateInput } from '../model/member.input';
import { MemberModel } from '../model/member.model';
import { MemberService } from '../../../../storage/service/member/member.service';

@ObjectType()
export class MemberMutation {}

@Resolver(MemberMutation)
export class MemberMutationResolver {
  constructor(private readonly service: MemberService) {}

  @Mutation(() => MemberMutation)
  member(): boolean {
    return true;
  }

  @ResolveField(() => MemberModel)
  async create(@Args('input') input: MemberCreateInput): Promise<MemberModel> {
    return this.service.create({ ...input });
  }

  @ResolveField(() => MemberModel)
  async update(@Args('input') input: MemberUpdateInput): Promise<MemberModel> {
    return this.service.update(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: MemberIdType): Promise<boolean> {
    return this.service.delete({ id });
  }
}
