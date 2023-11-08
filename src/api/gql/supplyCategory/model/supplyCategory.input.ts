import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import {
  SupplyCategoryCreate,
  SupplyCategoryFilter,
  SupplyCategoryOrder,
  SupplyCategoryPagination,
  SupplyCategoryType,
  SupplyCategoryUpdate,
} from '../../../../schema';
import { Field, InputType } from '@nestjs/graphql';
import { FindAllOptions, FindOneOptions } from '../../../../helper/types';

@InputType()
export class SupplyCategoryCreateInput extends inputFromZod(
  SupplyCategoryCreate,
  prepareInputFromZodOptions('SupplyCategoryCreateInput'),
) {}

@InputType()
export class SupplyCategoryUpdateInput extends inputFromZod(
  SupplyCategoryUpdate,
  prepareInputFromZodOptions('SupplyCategoryUpdateInput'),
) {}

@InputType()
export class SupplyCategoryFilterInput extends inputFromZod(
  SupplyCategoryFilter,
  prepareInputFromZodOptions('SupplyCategoryFilterInput'),
) {}

@InputType()
export class SupplyCategoryOrderInput extends inputFromZod(
  SupplyCategoryOrder,
  prepareInputFromZodOptions('SupplyCategoryOrderInput'),
) {}

@InputType()
export class SupplyCategoryPaginationInput extends inputFromZod(
  SupplyCategoryPagination,
  prepareInputFromZodOptions('SupplyCategoryPaginationInput'),
) {}

@InputType()
export class SupplyCategoryFindAll implements FindAllOptions<SupplyCategoryType> {
  @Field(() => [SupplyCategoryFilterInput], { nullable: true })
  filters?: SupplyCategoryFilterInput[];

  @Field(() => [SupplyCategoryOrderInput], { nullable: true })
  orders?: SupplyCategoryOrderInput[];

  @Field(() => SupplyCategoryPaginationInput, { nullable: true })
  pagination?: SupplyCategoryPaginationInput;
}

@InputType()
export class SupplyCategoryFindOne implements FindOneOptions<SupplyCategoryType> {
  @Field(() => [SupplyCategoryFilterInput], { nullable: true })
  filters?: SupplyCategoryFilterInput[];
}
