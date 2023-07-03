import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserFindAll, UserFindOne } from '../model/user.input';
import { UserModel } from '../model/user.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { UserType } from '../../../schema';
import { UserService } from '../../../storage/service/user/user.service';

@ObjectType()
export class UserQuery {}

@Resolver(UserQuery)
export class UserQueryResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => UserQuery)
  user(): boolean {
    return true;
  }

  @ResolveField(() => [UserModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => UserFindAll })
    options?: UserFindAll,
  ): Promise<readonly Partial<UserModel>[]> {
    const fields = astFields<UserType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => UserModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => UserFindOne })
    options?: UserFindOne,
  ): Promise<Partial<UserModel> | undefined> {
    const fields = astFields<UserType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
