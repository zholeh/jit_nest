import { z } from 'zod';
import { EntitySchema } from './entity';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { TeamId } from './team';

export const SupplyCategoryId = z.string().uuid().brand<'SupplyCategoryId'>('SupplyCategoryId');

export const SupplyCategory = z
  .object({
    id: SupplyCategoryId,
    name: z.string().max(255),
    description: z.string().max(1024),
    teamId: TeamId,
    timeAfterService: z.number().int(),
    nextVisit: z.number().int(),
    timeRange: z.number().int(),
  })
  .extend(EntitySchema.shape);

export const SupplyCategoryCreate = SupplyCategory.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const SupplyCategoryUpdate = SupplyCategoryCreate.partial().extend(SupplyCategory.pick({ id: true }).shape);

export const SupplyCategoryLink = z.object({
  id: SupplyCategoryId,
});

export type SupplyCategoryIdType = z.infer<typeof SupplyCategoryId>;
export type SupplyCategoryType = z.infer<typeof SupplyCategory>;
export type SupplyCategoryCreateType = z.infer<typeof SupplyCategoryCreate>;
export type SupplyCategoryUpdateType = z.infer<typeof SupplyCategoryUpdate>;
export type SupplyCategoryLinkType = z.infer<typeof SupplyCategoryLink>;

export const SupplyCategoryOrder = buildOrderZodSchema<typeof SupplyCategory>(['createdAt', 'teamId', 'name']);
export const SupplyCategoryFilter = buildFilterZodSchema(SupplyCategory);
export const SupplyCategoryPagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: SupplyCategoryId,
      startFrom: buildCursorZodSchema(SupplyCategory),
    })
    .optional(),
});

export type SupplyCategoryOrderType = z.infer<typeof SupplyCategoryOrder>;
export type SupplyCategoryFilterType = z.infer<typeof SupplyCategoryFilter>;
