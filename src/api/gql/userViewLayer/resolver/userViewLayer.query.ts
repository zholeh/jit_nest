import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserViewLayerService } from '../../../../storage/service/userViewLayer/userViewLayer.service';
import { GraphQLResolveInfo } from 'graphql';
import { UserViewLayerFindAllInput } from '../model/userViewLayer.input';
import { UserViewLayerModel } from '../model/userViewLayer.model';
import { astFields } from '../../helper/field';
import { UserViewLayerType } from '../../../../schema';

@ObjectType()
export class UserViewLayerQuery {}

@Resolver(UserViewLayerQuery)
export class UserViewLayerQueryResolver {
  constructor(private readonly service: UserViewLayerService) {}

  @Query(() => UserViewLayerQuery)
  userViewLayer(): boolean {
    return true;
  }

  @ResolveField(() => [UserViewLayerModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => UserViewLayerFindAllInput })
    options?: UserViewLayerFindAllInput,
  ): Promise<readonly Partial<UserViewLayerModel>[]> {
    const fields = astFields<UserViewLayerType>(info);
    return this.service.findAll({ ...options, fields });
  }

  // @ResolveField(() => UserViewLayerModel, { nullable: true })
  // async findOne(
  //   @Info() info: GraphQLResolveInfo,
  //   @Args('options', { nullable: true, type: () => UserViewLayerFindOne })
  //   options?: UserViewLayerFindOne,
  // ): Promise<Partial<UserViewLayerModel> | undefined> {
  //   const fields = astFields<UserViewLayerType>(info);
  //   return this.service.findOne({ ...options, fields });
  // }
}
