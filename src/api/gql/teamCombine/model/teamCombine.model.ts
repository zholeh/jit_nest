import { ObjectType } from '@nestjs/graphql';
import { modelFromZod } from 'nestjs-graphql-zod';
import { z } from 'zod';
import { TeamCombine } from '../../../../schema';
import { prepareModelFromZodOptions } from '../../helper/scalar';

@ObjectType()
export class TeamCombineModel extends modelFromZod(
  z.object({}).extend(TeamCombine.shape),
  prepareModelFromZodOptions('TeamCombineModel'),
) {}
