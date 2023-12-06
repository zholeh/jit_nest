import { z } from 'zod';
import { Currency } from './currency';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { Team } from './team';
import { TeamMate, TeamMateId } from './teamMate';

const getRelation = () => TeamMate.extend({ team: z.object({ ...Team.shape, currency: z.object(Currency.shape) }) });
export const TeamMateRelation = getRelation();

export type TeamMateRelationType = z.infer<typeof TeamMateRelation>;

export const TeamMateRelationOrder = buildOrderZodSchema<typeof TeamMateRelation>([
  'createdAt',
  'description',
  'id',
  'name',
]);
export const TeamMateRelationFilter = buildFilterZodSchema(getRelation());
export const TeamMateRelationPagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: TeamMateId,
      startFrom: buildCursorZodSchema(getRelation()),
    })
    .optional(),
});

export type TeamMateRelationOrderType = z.infer<typeof TeamMateRelationOrder>;
export type TeamMateRelationFilterType = z.infer<typeof TeamMateRelationFilter>;
