import { Args, ID, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { TeamIdType } from '../../../../schema';
import { TeamCreateInput, TeamUpdateInput } from '../model/team.input';
import { TeamModel } from '../model/team.model';
import { TeamService } from '../../../../storage/service/team/team.service';

@ObjectType()
export class TeamMutation {}

@Resolver(TeamMutation)
export class TeamMutationResolver {
  constructor(private readonly service: TeamService) {}

  @Mutation(() => TeamMutation)
  team(): boolean {
    return true;
  }

  @ResolveField(() => TeamModel)
  async create(@Args('input') input: TeamCreateInput): Promise<TeamModel> {
    return this.service.create({ ...input });
  }

  @ResolveField(() => TeamModel)
  async update(@Args('input') input: TeamUpdateInput): Promise<TeamModel> {
    return this.service.update(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: TeamIdType): Promise<boolean> {
    return this.service.delete({ id });
  }
}
