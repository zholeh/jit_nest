import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TeamCombineFindAll, TeamCombineFindOne } from '../model/teamCombine.input';
import { TeamCombineModel } from '../model/teamCombine.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { TeamCombineType } from '../../../../schema';
import { TeamCombineService } from '../../../../storage/service/teamCombine/teamCombine.service';

@ObjectType()
export class TeamCombineQuery {}

@Resolver(TeamCombineQuery)
export class TeamCombineQueryResolver {
  constructor(private readonly service: TeamCombineService) {}

  @Query(() => TeamCombineQuery)
  teamCombine(): boolean {
    return true;
  }

  @ResolveField(() => [TeamCombineModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => TeamCombineFindAll })
    options?: TeamCombineFindAll,
  ): Promise<readonly Partial<TeamCombineModel>[]> {
    const fields = astFields<TeamCombineType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => TeamCombineModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => TeamCombineFindOne })
    options?: TeamCombineFindOne,
  ): Promise<Partial<TeamCombineModel> | undefined> {
    const fields = astFields<TeamCombineType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
