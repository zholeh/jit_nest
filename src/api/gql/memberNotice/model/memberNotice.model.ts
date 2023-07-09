import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { MemberNotice } from '../../../../schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class MemberNoticeModel extends modelFromZod(MemberNotice, prepareModelFromZodOptions('MemberNoticeModel')) {}
