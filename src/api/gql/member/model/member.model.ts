import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { Member } from '../../../../schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class MemberModel extends modelFromZod(Member, prepareModelFromZodOptions('MemberModel')) {}
