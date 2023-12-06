import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import { TeamRelationFilter, TeamRelationOrder, TeamRelationPagination, TeamRelationType } from '../../../../schema';
import { Field, InputType } from '@nestjs/graphql';

import { FindAllOptions, FindOneOptions } from '../../../../helper/types';

@InputType()
export class TeamRelationFilterInput extends inputFromZod(
  TeamRelationFilter,
  prepareInputFromZodOptions('TeamRelationFilterInput'),
) {}

@InputType()
export class TeamRelationOrderInput extends inputFromZod(
  TeamRelationOrder,
  prepareInputFromZodOptions('TeamRelationOrderInput'),
) {}

@InputType()
export class TeamRelationPaginationInput extends inputFromZod(
  TeamRelationPagination,
  prepareInputFromZodOptions('TeamRelationPaginationInput'),
) {}

@InputType()
export class TeamRelationFindAll implements FindAllOptions<TeamRelationType> {
  @Field(() => [TeamRelationFilterInput], { nullable: true })
  filters?: TeamRelationFilterInput[];

  @Field(() => [TeamRelationOrderInput], { nullable: true })
  orders?: TeamRelationOrderInput[];

  @Field(() => TeamRelationPaginationInput, { nullable: true })
  pagination?: TeamRelationPaginationInput;
}

@InputType()
export class TeamRelationFindOne implements FindOneOptions<TeamRelationType> {
  @Field(() => [TeamRelationFilterInput], { nullable: true })
  filters?: TeamRelationFilterInput[];
}
