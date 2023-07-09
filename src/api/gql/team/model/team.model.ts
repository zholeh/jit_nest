import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { Team } from '../../../../schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class TeamModel extends modelFromZod(Team, prepareModelFromZodOptions('TeamModel')) {}
