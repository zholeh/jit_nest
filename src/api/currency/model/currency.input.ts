import { inputFromZod } from 'nestjs-graphql-zod';
import { prepareInputFromZodOptions } from '../../helper/scalar';
import {
  CurrencyCreate,
  CurrencyFilter,
  CurrencyOrder,
  CurrencyPagination,
  CurrencyType,
  CurrencyUpdate,
} from '../../../schema/currency';
import { Field, InputType } from '@nestjs/graphql';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@InputType()
export class CurrencyCreateInput extends inputFromZod(
  CurrencyCreate,
  prepareInputFromZodOptions('CurrencyCreateInput'),
) {}

@InputType()
export class CurrencyUpdateInput extends inputFromZod(
  CurrencyUpdate,
  prepareInputFromZodOptions('CurrencyUpdateInput'),
) {}

@InputType()
export class CurrencyFilterInput extends inputFromZod(
  CurrencyFilter,
  prepareInputFromZodOptions('CurrencyFilterInput'),
) {}

@InputType()
export class CurrencyOrderInput extends inputFromZod(CurrencyOrder, prepareInputFromZodOptions('CurrencyOrderInput')) {}

@InputType()
export class CurrencyPaginationInput extends inputFromZod(
  CurrencyPagination,
  prepareInputFromZodOptions('CurrencyPaginationInput'),
) {}

@InputType()
export class CurrencyFindAll implements FindAllOptions<CurrencyType> {
  @Field(() => [CurrencyFilterInput], { nullable: true })
  filters?: CurrencyFilterInput[];

  @Field(() => [CurrencyOrderInput], { nullable: true })
  orders?: CurrencyOrderInput[];

  @Field(() => CurrencyPaginationInput, { nullable: true })
  pagination?: CurrencyPaginationInput;
}

@InputType()
export class CurrencyFindOne implements FindOneOptions<CurrencyType> {
  @Field(() => [CurrencyFilterInput], { nullable: true })
  filters?: CurrencyFilterInput[];
}
