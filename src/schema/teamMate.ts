import { z } from 'zod';
import { EntitySchema } from './entity';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { UserId } from './user';
import { TeamId } from './team';
import { TeamMateRole } from './teamMateRole';

export const TeamMateId = z.string().uuid().brand<'TeamMateId'>('TeamMateId');

export const TeamMate = z
  .object({
    id: TeamMateId,
    name: z.string().max(255).nonempty(),
    description: z.string().max(1024),
    userId: UserId,
    teamId: TeamId,
    role: z.nativeEnum(TeamMateRole),
  })
  .extend(EntitySchema.shape);

export const TeamMateCreate = TeamMate.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const TeamMateUpdate = TeamMateCreate.partial().extend(TeamMate.pick({ id: true }).shape);

export const TeamMateLink = z.object({
  id: TeamMateId,
});

export type TeamMateIdType = z.infer<typeof TeamMateId>;
export type TeamMateType = z.infer<typeof TeamMate>;
export type TeamMateCreateType = z.infer<typeof TeamMateCreate>;
export type TeamMateUpdateType = z.infer<typeof TeamMateUpdate>;
export type TeamMateLinkType = z.infer<typeof TeamMateLink>;

export const TeamMateOrder = buildOrderZodSchema<typeof TeamMate>(['createdAt', 'description', 'id', 'name']);
export const TeamMateFilter = buildFilterZodSchema(TeamMate);
export const TeamMatePagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: TeamMateId,
      startFrom: buildCursorZodSchema(TeamMate),
    })
    .optional(),
});

export type TeamMateOrderType = z.infer<typeof TeamMateOrder>;
export type TeamMateFilterType = z.infer<typeof TeamMateFilter>;
