import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import {
  TeamMateCreate,
  TeamMateFilter,
  TeamMateOrder,
  TeamMatePagination,
  TeamMateType,
  TeamMateUpdate,
} from '../../../../schema';
import { Field, InputType } from '@nestjs/graphql';
import { FindAllOptions, FindOneOptions } from '../../../../helper/types';

@InputType()
export class TeamMateCreateInput extends inputFromZod(
  TeamMateCreate,
  prepareInputFromZodOptions('TeamMateCreateInput'),
) {}

@InputType()
export class TeamMateUpdateInput extends inputFromZod(
  TeamMateUpdate,
  prepareInputFromZodOptions('TeamMateUpdateInput'),
) {}

@InputType()
export class TeamMateFilterInput extends inputFromZod(
  TeamMateFilter,
  prepareInputFromZodOptions('TeamMateFilterInput'),
) {}

@InputType()
export class TeamMateOrderInput extends inputFromZod(TeamMateOrder, prepareInputFromZodOptions('TeamMateOrderInput')) {}

@InputType()
export class TeamMatePaginationInput extends inputFromZod(
  TeamMatePagination,
  prepareInputFromZodOptions('TeamMatePaginationInput'),
) {}

@InputType()
export class TeamMateFindAll implements FindAllOptions<TeamMateType> {
  @Field(() => [TeamMateFilterInput], { nullable: true })
  filters?: TeamMateFilterInput[];

  @Field(() => [TeamMateOrderInput], { nullable: true })
  orders?: TeamMateOrderInput[];

  @Field(() => TeamMatePaginationInput, { nullable: true })
  pagination?: TeamMatePaginationInput;
}

@InputType()
export class TeamMateFindOne implements FindOneOptions<TeamMateType> {
  @Field(() => [TeamMateFilterInput], { nullable: true })
  filters?: TeamMateFilterInput[];
}
