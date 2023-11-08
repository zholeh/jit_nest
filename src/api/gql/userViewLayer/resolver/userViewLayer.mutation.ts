import { Args, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { UserViewLayerService } from '../../../../storage/service/userViewLayer/userViewLayer.service';
import { UserViewLayerModel } from '../model/userViewLayer.model';
import { UserViewLayerCreateInput, UserViewLayerLinkInput } from '../model/userViewLayer.input';

@ObjectType()
export class UserViewLayerMutation {}

@Resolver(UserViewLayerMutation)
export class UserViewLayerMutationResolver {
  constructor(private readonly service: UserViewLayerService) {}

  @Mutation(() => UserViewLayerMutation)
  userViewLayer(): boolean {
    return true;
  }

  @ResolveField(() => UserViewLayerModel)
  async upsert(
    @Args('link') link: UserViewLayerLinkInput,
    @Args('input', { type: () => [UserViewLayerCreateInput] }) input: UserViewLayerCreateInput[],
  ): Promise<UserViewLayerModel> {
    return this.service.upsert(link, input);
  }
}
