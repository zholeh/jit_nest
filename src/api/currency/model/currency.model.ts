import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { Currency } from 'src/schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class CurrencyModel extends modelFromZod(Currency, prepareModelFromZodOptions('CurrencyModel')) {}
