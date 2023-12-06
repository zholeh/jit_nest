import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import { Field, InputType } from '@nestjs/graphql';

import { FindAllOptions, FindOneOptions } from '../../../../helper/types';
import {
  TeamMateRelationFilter,
  TeamMateRelationOrder,
  TeamMateRelationPagination,
  TeamMateRelationType,
} from '../../../../schema/teamMateRelation';

@InputType()
export class TeamMateRelationFilterInput extends inputFromZod(
  TeamMateRelationFilter,
  prepareInputFromZodOptions('TeamMateRelationFilterInput'),
) {}

@InputType()
export class TeamMateRelationOrderInput extends inputFromZod(
  TeamMateRelationOrder,
  prepareInputFromZodOptions('TeamMateRelationOrderInput'),
) {}

@InputType()
export class TeamMateRelationPaginationInput extends inputFromZod(
  TeamMateRelationPagination,
  prepareInputFromZodOptions('TeamMateRelationPaginationInput'),
) {}

@InputType()
export class TeamMateRelationFindAll implements FindAllOptions<TeamMateRelationType> {
  @Field(() => [TeamMateRelationFilterInput], { nullable: true })
  filters?: TeamMateRelationFilterInput[];

  @Field(() => [TeamMateRelationOrderInput], { nullable: true })
  orders?: TeamMateRelationOrderInput[];

  @Field(() => TeamMateRelationPaginationInput, { nullable: true })
  pagination?: TeamMateRelationPaginationInput;
}

@InputType()
export class TeamMateRelationFindOne implements FindOneOptions<TeamMateRelationType> {
  @Field(() => [TeamMateRelationFilterInput], { nullable: true })
  filters?: TeamMateRelationFilterInput[];
}
