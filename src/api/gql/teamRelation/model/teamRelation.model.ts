import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { z } from 'zod';
import { TeamRelation } from '../../../../schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class TeamRelationModel extends modelFromZod(
  z.object({}).extend(TeamRelation.shape),
  prepareModelFromZodOptions('TeamRelationModel'),
) {}
