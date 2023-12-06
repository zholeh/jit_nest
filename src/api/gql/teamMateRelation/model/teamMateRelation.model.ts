import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { z } from 'zod';
import { TeamMateRelation } from '../../../../schema/teamMateRelation';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class TeamMateRelationModel extends modelFromZod(
  z.object({}).extend(TeamMateRelation.shape),
  prepareModelFromZodOptions('TeamMateRelationModel'),
) {}
