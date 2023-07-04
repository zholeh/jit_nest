import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import {
  ChannelCreate,
  ChannelFilter,
  ChannelOrder,
  ChannelPagination,
  ChannelType,
  ChannelUpdate,
} from '../../../schema/channel';
import { Field, InputType } from '@nestjs/graphql';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@InputType()
export class ChannelCreateInput extends inputFromZod(ChannelCreate, prepareInputFromZodOptions('ChannelCreateInput')) {}

@InputType()
export class ChannelUpdateInput extends inputFromZod(ChannelUpdate, prepareInputFromZodOptions('ChannelUpdateInput')) {}

@InputType()
export class ChannelFilterInput extends inputFromZod(ChannelFilter, prepareInputFromZodOptions('ChannelFilterInput')) {}

@InputType()
export class ChannelOrderInput extends inputFromZod(ChannelOrder, prepareInputFromZodOptions('ChannelOrderInput')) {}

@InputType()
export class ChannelPaginationInput extends inputFromZod(
  ChannelPagination,
  prepareInputFromZodOptions('ChannelPaginationInput'),
) {}

@InputType()
export class ChannelFindAll implements FindAllOptions<ChannelType> {
  @Field(() => [ChannelFilterInput], { nullable: true })
  filters?: ChannelFilterInput[];

  @Field(() => [ChannelOrderInput], { nullable: true })
  orders?: ChannelOrderInput[];

  @Field(() => ChannelPaginationInput, { nullable: true })
  pagination?: ChannelPaginationInput;
}

@InputType()
export class ChannelFindOne implements FindOneOptions<ChannelType> {
  @Field(() => [ChannelFilterInput], { nullable: true })
  filters?: ChannelFilterInput[];
}
