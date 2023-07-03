import { Args, ID, Mutation, ObjectType, ResolveField, Resolver } from '@nestjs/graphql';
import { TeamMateIdType } from '../../../schema';
import { TeamMateCreateInput, TeamMateUpdateInput } from '../model/teamMate.input';
import { TeamMateModel } from '../model/teamMate.model';
import { TeamMateService } from '../../../storage/service/teamMate/teamMate.service';

@ObjectType()
export class TeamMateMutation {}

@Resolver(TeamMateMutation)
export class TeamMateMutationResolver {
  constructor(private readonly service: TeamMateService) {}

  @Mutation(() => TeamMateMutation)
  teamMate(): boolean {
    return true;
  }

  @ResolveField(() => TeamMateModel)
  async create(@Args('input') input: TeamMateCreateInput): Promise<TeamMateModel> {
    return this.service.create({ ...input });
  }

  @ResolveField(() => TeamMateModel)
  async update(@Args('input') input: TeamMateUpdateInput): Promise<TeamMateModel> {
    return this.service.update(input);
  }

  @ResolveField(() => Boolean)
  async delete(@Args('id', { type: () => ID }) id: TeamMateIdType): Promise<boolean> {
    return this.service.delete({ id });
  }
}
