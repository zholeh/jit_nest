import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TeamMateRelationFindAll, TeamMateRelationFindOne } from '../model/teamMateRelation.input';
import { TeamMateRelationModel } from '../model/teamMateRelation.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { TeamMateRelationService } from '../../../../storage/service/teamMateRelation/teamMateRelation.service';
import { TeamMateRelationType } from '../../../../schema/teamMateRelation';

@ObjectType()
export class TeamMateRelationQuery {}

@Resolver(TeamMateRelationQuery)
export class TeamMateRelationQueryResolver {
  constructor(private readonly service: TeamMateRelationService) {}

  @Query(() => TeamMateRelationQuery)
  teamMateRelation(): boolean {
    return true;
  }

  @ResolveField(() => [TeamMateRelationModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => TeamMateRelationFindAll })
    options?: TeamMateRelationFindAll,
  ): Promise<readonly Partial<TeamMateRelationModel>[]> {
    const fields = astFields<TeamMateRelationType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => TeamMateRelationModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => TeamMateRelationFindOne })
    options?: TeamMateRelationFindOne,
  ): Promise<Partial<TeamMateRelationModel> | undefined> {
    const fields = astFields<TeamMateRelationType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
