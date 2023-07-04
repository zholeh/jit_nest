import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import {
  MemberNoticeCreate,
  MemberNoticeFilter,
  MemberNoticeOrder,
  MemberNoticePagination,
  MemberNoticeType,
  MemberNoticeUpdate,
} from '../../../../schema/memberNotice';
import { Field, InputType } from '@nestjs/graphql';
import { FindAllOptions, FindOneOptions } from '../../../../helper/types';

@InputType()
export class MemberNoticeCreateInput extends inputFromZod(
  MemberNoticeCreate,
  prepareInputFromZodOptions('MemberNoticeCreateInput'),
) {}

@InputType()
export class MemberNoticeUpdateInput extends inputFromZod(
  MemberNoticeUpdate,
  prepareInputFromZodOptions('MemberNoticeUpdateInput'),
) {}

@InputType()
export class MemberNoticeFilterInput extends inputFromZod(
  MemberNoticeFilter,
  prepareInputFromZodOptions('MemberNoticeFilterInput'),
) {}

@InputType()
export class MemberNoticeOrderInput extends inputFromZod(
  MemberNoticeOrder,
  prepareInputFromZodOptions('MemberNoticeOrderInput'),
) {}

@InputType()
export class MemberNoticePaginationInput extends inputFromZod(
  MemberNoticePagination,
  prepareInputFromZodOptions('MemberNoticePaginationInput'),
) {}

@InputType()
export class MemberNoticeFindAll implements FindAllOptions<MemberNoticeType> {
  @Field(() => [MemberNoticeFilterInput], { nullable: true })
  filters?: MemberNoticeFilterInput[];

  @Field(() => [MemberNoticeOrderInput], { nullable: true })
  orders?: MemberNoticeOrderInput[];

  @Field(() => MemberNoticePaginationInput, { nullable: true })
  pagination?: MemberNoticePaginationInput;
}

@InputType()
export class MemberNoticeFindOne implements FindOneOptions<MemberNoticeType> {
  @Field(() => [MemberNoticeFilterInput], { nullable: true })
  filters?: MemberNoticeFilterInput[];
}
