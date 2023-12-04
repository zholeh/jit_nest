import { z } from 'zod';
import { Currency } from './currency';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { Team, TeamId } from './team';

const getCombine = () => Team.extend({ currency: z.object(Currency.shape) });
export const TeamCombine = getCombine();

export type TeamCombineType = z.infer<typeof TeamCombine>;

export const TeamCombineOrder = buildOrderZodSchema<typeof TeamCombine>(['createdAt', 'description', 'id', 'name']);
export const TeamCombineFilter = buildFilterZodSchema(getCombine());
export const TeamCombinePagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: TeamId,
      startFrom: buildCursorZodSchema(getCombine()),
    })
    .optional(),
});

export type TeamCombineOrderType = z.infer<typeof TeamCombineOrder>;
export type TeamCombineFilterType = z.infer<typeof TeamCombineFilter>;
