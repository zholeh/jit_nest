import { z } from 'zod';
import { EntitySchema, entityOmit } from './base/entity';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { UserId } from './user';
import { CurrencyId } from './currency';

export const SupplyId = z.string().uuid().brand<'SupplyId'>('SupplyId');

export const Supply = z
  .object({
    id: SupplyId,
    name: z.string().max(255).min(1),
    description: z.string().max(1024),
    referralId: UserId,
    currencyId: CurrencyId,
  })
  .extend(EntitySchema.shape);

export const SupplyCreate = Supply.omit({
  id: true,
  ...entityOmit,
});

export const SupplyUpdate = SupplyCreate.partial().extend(Supply.pick({ id: true }).shape);

export const SupplyLink = z.object({
  id: SupplyId,
});

export type SupplyIdType = z.infer<typeof SupplyId>;
export type SupplyType = z.infer<typeof Supply>;
export type SupplyCreateType = z.infer<typeof SupplyCreate>;
export type SupplyUpdateType = z.infer<typeof SupplyUpdate>;
export type SupplyLinkType = z.infer<typeof SupplyLink>;

export const SupplyOrder = buildOrderZodSchema<typeof Supply>(['createdAt', 'description', 'id', 'name']);
export const SupplyFilter = buildFilterZodSchema(Supply);
export const SupplyPagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: SupplyId,
      startFrom: buildCursorZodSchema(Supply),
    })
    .optional(),
});

export type SupplyOrderType = z.infer<typeof SupplyOrder>;
export type SupplyFilterType = z.infer<typeof SupplyFilter>;
