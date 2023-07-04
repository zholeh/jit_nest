import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import {
  MemberCreate,
  MemberFilter,
  MemberOrder,
  MemberPagination,
  MemberType,
  MemberUpdate,
} from '../../../schema/member';
import { Field, InputType } from '@nestjs/graphql';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@InputType()
export class MemberCreateInput extends inputFromZod(MemberCreate, prepareInputFromZodOptions('MemberCreateInput')) {}

@InputType()
export class MemberUpdateInput extends inputFromZod(MemberUpdate, prepareInputFromZodOptions('MemberUpdateInput')) {}

@InputType()
export class MemberFilterInput extends inputFromZod(MemberFilter, prepareInputFromZodOptions('MemberFilterInput')) {}

@InputType()
export class MemberOrderInput extends inputFromZod(MemberOrder, prepareInputFromZodOptions('MemberOrderInput')) {}

@InputType()
export class MemberPaginationInput extends inputFromZod(
  MemberPagination,
  prepareInputFromZodOptions('MemberPaginationInput'),
) {}

@InputType()
export class MemberFindAll implements FindAllOptions<MemberType> {
  @Field(() => [MemberFilterInput], { nullable: true })
  filters?: MemberFilterInput[];

  @Field(() => [MemberOrderInput], { nullable: true })
  orders?: MemberOrderInput[];

  @Field(() => MemberPaginationInput, { nullable: true })
  pagination?: MemberPaginationInput;
}

@InputType()
export class MemberFindOne implements FindOneOptions<MemberType> {
  @Field(() => [MemberFilterInput], { nullable: true })
  filters?: MemberFilterInput[];
}
