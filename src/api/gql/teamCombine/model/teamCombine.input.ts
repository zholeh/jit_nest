import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import { TeamCombineFilter, TeamCombineOrder, TeamCombinePagination, TeamCombineType } from '../../../../schema';
import { Field, InputType } from '@nestjs/graphql';

import { FindAllOptions, FindOneOptions } from '../../../../helper/types';

@InputType()
export class TeamCombineFilterInput extends inputFromZod(
  TeamCombineFilter,
  prepareInputFromZodOptions('TeamCombineFilterInput'),
) {}

@InputType()
export class TeamCombineOrderInput extends inputFromZod(
  TeamCombineOrder,
  prepareInputFromZodOptions('TeamCombineOrderInput'),
) {}

@InputType()
export class TeamCombinePaginationInput extends inputFromZod(
  TeamCombinePagination,
  prepareInputFromZodOptions('TeamCombinePaginationInput'),
) {}

@InputType()
export class TeamCombineFindAll implements FindAllOptions<TeamCombineType> {
  @Field(() => [TeamCombineFilterInput], { nullable: true })
  filters?: TeamCombineFilterInput[];

  @Field(() => [TeamCombineOrderInput], { nullable: true })
  orders?: TeamCombineOrderInput[];

  @Field(() => TeamCombinePaginationInput, { nullable: true })
  pagination?: TeamCombinePaginationInput;
}

@InputType()
export class TeamCombineFindOne implements FindOneOptions<TeamCombineType> {
  @Field(() => [TeamCombineFilterInput], { nullable: true })
  filters?: TeamCombineFilterInput[];
}
