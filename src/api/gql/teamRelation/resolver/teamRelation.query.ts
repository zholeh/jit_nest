import { Args, Info, ObjectType, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { TeamRelationFindAll, TeamRelationFindOne } from '../model/teamRelation.input';
import { TeamRelationModel } from '../model/teamRelation.model';
import { GraphQLResolveInfo } from 'graphql';
import { astFields } from '../../helper/field';
import { TeamRelationType } from '../../../../schema';
import { TeamRelationService } from '../../../../storage/service/teamRelation/teamRelation.service';

@ObjectType()
export class TeamRelationQuery {}

@Resolver(TeamRelationQuery)
export class TeamRelationQueryResolver {
  constructor(private readonly service: TeamRelationService) {}

  @Query(() => TeamRelationQuery)
  teamRelation(): boolean {
    return true;
  }

  @ResolveField(() => [TeamRelationModel])
  async findAll(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => TeamRelationFindAll })
    options?: TeamRelationFindAll,
  ): Promise<readonly Partial<TeamRelationModel>[]> {
    const fields = astFields<TeamRelationType>(info);
    return this.service.findAll({ ...options, fields });
  }

  @ResolveField(() => TeamRelationModel, { nullable: true })
  async findOne(
    @Info() info: GraphQLResolveInfo,
    @Args('options', { nullable: true, type: () => TeamRelationFindOne })
    options?: TeamRelationFindOne,
  ): Promise<Partial<TeamRelationModel> | undefined> {
    const fields = astFields<TeamRelationType>(info);
    return this.service.findOne({ ...options, fields });
  }
}
