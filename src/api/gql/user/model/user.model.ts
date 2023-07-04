import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { User } from 'src/schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class UserModel extends modelFromZod(User, prepareModelFromZodOptions('UserModel')) {}
