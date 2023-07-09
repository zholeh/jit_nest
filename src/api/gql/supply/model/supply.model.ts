import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { Supply } from '../../../../schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class SupplyModel extends modelFromZod(Supply, prepareModelFromZodOptions('SupplyModel')) {}
