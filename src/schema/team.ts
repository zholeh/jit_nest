import { z } from 'zod';
import { EntitySchema, entityOmit } from './base/entity';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { UserId } from './user';
import { CurrencyId } from './currency';

export const TeamId = z.string().uuid().brand<'TeamId'>('TeamId');

export const Team = z
  .object({
    id: TeamId,
    name: z.string().max(255).min(1),
    description: z.string().max(1024),
    referralId: UserId,
    currencyId: CurrencyId,
  })
  .extend(EntitySchema.shape);

export const TeamCreate = Team.omit({
  id: true,
  ...entityOmit,
});

export const TeamUpdate = TeamCreate.partial().extend(Team.pick({ id: true }).shape);

export const TeamLink = z.object({
  id: TeamId,
});

export type TeamIdType = z.infer<typeof TeamId>;
export type TeamType = z.infer<typeof Team>;
export type TeamCreateType = z.infer<typeof TeamCreate>;
export type TeamUpdateType = z.infer<typeof TeamUpdate>;
export type TeamLinkType = z.infer<typeof TeamLink>;

export const TeamOrder = buildOrderZodSchema<typeof Team>(['createdAt', 'description', 'id', 'name']);
export const TeamFilter = buildFilterZodSchema(Team);
export const TeamPagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: TeamId,
      startFrom: buildCursorZodSchema(Team),
    })
    .optional(),
});

export type TeamOrderType = z.infer<typeof TeamOrder>;
export type TeamFilterType = z.infer<typeof TeamFilter>;
