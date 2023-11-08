import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { UserViewLayer } from '../../../../schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class UserViewLayerModel extends modelFromZod(
  UserViewLayer,
  prepareModelFromZodOptions('UserViewLayerModel'),
) {}
