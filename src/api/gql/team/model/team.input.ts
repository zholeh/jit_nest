import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import { TeamCreate, TeamFilter, TeamOrder, TeamPagination, TeamType, TeamUpdate } from '../../../../schema/team';
import { Field, InputType } from '@nestjs/graphql';
import { FindAllOptions, FindOneOptions } from '../../../../helper/types';

@InputType()
export class TeamCreateInput extends inputFromZod(TeamCreate, prepareInputFromZodOptions('TeamCreateInput')) {}

@InputType()
export class TeamUpdateInput extends inputFromZod(TeamUpdate, prepareInputFromZodOptions('TeamUpdateInput')) {}

@InputType()
export class TeamFilterInput extends inputFromZod(TeamFilter, prepareInputFromZodOptions('TeamFilterInput')) {}

@InputType()
export class TeamOrderInput extends inputFromZod(TeamOrder, prepareInputFromZodOptions('TeamOrderInput')) {}

@InputType()
export class TeamPaginationInput extends inputFromZod(
  TeamPagination,
  prepareInputFromZodOptions('TeamPaginationInput'),
) {}

@InputType()
export class TeamFindAll implements FindAllOptions<TeamType> {
  @Field(() => [TeamFilterInput], { nullable: true })
  filters?: TeamFilterInput[];

  @Field(() => [TeamOrderInput], { nullable: true })
  orders?: TeamOrderInput[];

  @Field(() => TeamPaginationInput, { nullable: true })
  pagination?: TeamPaginationInput;
}

@InputType()
export class TeamFindOne implements FindOneOptions<TeamType> {
  @Field(() => [TeamFilterInput], { nullable: true })
  filters?: TeamFilterInput[];
}
