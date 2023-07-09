import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { Channel } from '../../../../schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class ChannelModel extends modelFromZod(Channel, prepareModelFromZodOptions('ChannelModel')) {}
