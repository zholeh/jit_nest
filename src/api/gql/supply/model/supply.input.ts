import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import {
  SupplyCreate,
  SupplyFilter,
  SupplyOrder,
  SupplyPagination,
  SupplyType,
  SupplyUpdate,
} from '../../../../schema/supply';
import { Field, InputType } from '@nestjs/graphql';
import { FindAllOptions, FindOneOptions } from '../../../../helper/types';

@InputType()
export class SupplyCreateInput extends inputFromZod(SupplyCreate, prepareInputFromZodOptions('SupplyCreateInput')) {}

@InputType()
export class SupplyUpdateInput extends inputFromZod(SupplyUpdate, prepareInputFromZodOptions('SupplyUpdateInput')) {}

@InputType()
export class SupplyFilterInput extends inputFromZod(SupplyFilter, prepareInputFromZodOptions('SupplyFilterInput')) {}

@InputType()
export class SupplyOrderInput extends inputFromZod(SupplyOrder, prepareInputFromZodOptions('SupplyOrderInput')) {}

@InputType()
export class SupplyPaginationInput extends inputFromZod(
  SupplyPagination,
  prepareInputFromZodOptions('SupplyPaginationInput'),
) {}

@InputType()
export class SupplyFindAll implements FindAllOptions<SupplyType> {
  @Field(() => [SupplyFilterInput], { nullable: true })
  filters?: SupplyFilterInput[];

  @Field(() => [SupplyOrderInput], { nullable: true })
  orders?: SupplyOrderInput[];

  @Field(() => SupplyPaginationInput, { nullable: true })
  pagination?: SupplyPaginationInput;
}

@InputType()
export class SupplyFindOne implements FindOneOptions<SupplyType> {
  @Field(() => [SupplyFilterInput], { nullable: true })
  filters?: SupplyFilterInput[];
}
