import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { TeamMate } from 'src/schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class TeamMateModel extends modelFromZod(TeamMate, prepareModelFromZodOptions('TeamMateModel')) {}
