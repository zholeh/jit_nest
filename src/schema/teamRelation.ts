import { z } from 'zod';
import { Currency } from './currency';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { Team, TeamId } from './team';

const getRelation = () => Team.extend({ currency: z.object(Currency.shape) });
export const TeamRelation = getRelation();

export type TeamRelationType = z.infer<typeof TeamRelation>;

export const TeamRelationOrder = buildOrderZodSchema<typeof TeamRelation>(['createdAt', 'description', 'id', 'name']);
export const TeamRelationFilter = buildFilterZodSchema(getRelation());
export const TeamRelationPagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: TeamId,
      startFrom: buildCursorZodSchema(getRelation()),
    })
    .optional(),
});

export type TeamRelationOrderType = z.infer<typeof TeamRelationOrder>;
export type TeamRelationFilterType = z.infer<typeof TeamRelationFilter>;
