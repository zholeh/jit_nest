import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { SupplyCategory } from '../../../../schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class SupplyCategoryModel extends modelFromZod(
  SupplyCategory,
  prepareModelFromZodOptions('SupplyCategoryModel'),
) {}
