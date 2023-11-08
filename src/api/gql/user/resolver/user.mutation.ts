import { Args, ID, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { UserIdType } from '../../../../schema';
import { UserCreateInput, UserUpdateInput } from '../model/user.input';
import { UserModel } from '../model/user.model';
import { UserService } from '../../../../storage/service/user/user.service';
import { UseInterceptors } from '@nestjs/common';
import { ExceptionsGqlInterceptor } from '../../common/interceptor/exception.interceptor';

@ObjectType()
export class UserMutation {}

@Resolver(UserMutation)
@UseInterceptors(ExceptionsGqlInterceptor)
export class UserMutationResolver {
  constructor(private readonly service: UserService) {}

  @Mutation(() => UserMutation)
  user(): boolean {
    return true;
  }

  @ResolveField(() => UserModel)
  async create(@Args('input') input: UserCreateInput): Promise<UserModel> {
    return this.service.create({ ...input });
  }

  @ResolveField(() => UserModel)
  async update(@Args('input') input: UserUpdateInput): Promise<UserModel> {
    return this.service.update(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: UserIdType): Promise<boolean> {
    return this.service.delete({ id });
  }
}
