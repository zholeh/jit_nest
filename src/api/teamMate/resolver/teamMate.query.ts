import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TeamMateFindAll, TeamMateFindOne } from '../model/teamMate.input';
import { TeamMateModel } from '../model/teamMate.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { TeamMateType } from '../../../schema';
import { TeamMateService } from '../../../storage/service/teamMate/teamMate.service';

@ObjectType()
export class TeamMateQuery {}

@Resolver(TeamMateQuery)
export class TeamMateQueryResolver {
  constructor(private readonly service: TeamMateService) {}

  @Query(() => TeamMateQuery)
  teamMate(): boolean {
    return true;
  }

  @ResolveField(() => [TeamMateModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => TeamMateFindAll })
    options?: TeamMateFindAll,
  ): Promise<readonly Partial<TeamMateModel>[]> {
    const fields = astFields<TeamMateType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => TeamMateModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => TeamMateFindOne })
    options?: TeamMateFindOne,
  ): Promise<Partial<TeamMateModel> | undefined> {
    const fields = astFields<TeamMateType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
