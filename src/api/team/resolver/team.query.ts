import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TeamFindAll, TeamFindOne } from '../model/team.input';
import { TeamModel } from '../model/team.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { TeamType } from '../../../schema';
import { TeamService } from '../../../storage/service/team/team.service';

@ObjectType()
export class TeamQuery {}

@Resolver(TeamQuery)
export class TeamQueryResolver {
  constructor(private readonly service: TeamService) {}

  @Query(() => TeamQuery)
  team(): boolean {
    return true;
  }

  @ResolveField(() => [TeamModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => TeamFindAll })
    options?: TeamFindAll,
  ): Promise<readonly Partial<TeamModel>[]> {
    const fields = astFields<TeamType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => TeamModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => TeamFindOne })
    options?: TeamFindOne,
  ): Promise<Partial<TeamModel> | undefined> {
    const fields = astFields<TeamType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
