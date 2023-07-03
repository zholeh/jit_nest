import { z } from 'zod';
import { EntitySchema } from './entity';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';

export const CurrencyId = z.string().uuid().brand<'CurrencyId'>('CurrencyId');

export const Currency = z
  .object({
    id: CurrencyId,
    name: z.string().max(255).nonempty(),
    description: z.string().max(1024),
    code: z.number().int(),
    shortName: z.string().max(5),
  })
  .extend(EntitySchema.shape);

export const CurrencyCreate = Currency.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const CurrencyUpdate = CurrencyCreate.partial().extend(Currency.pick({ id: true }).shape);

export const CurrencyLink = z.object({
  id: CurrencyId,
});

export type CurrencyIdType = z.infer<typeof CurrencyId>;
export type CurrencyType = z.infer<typeof Currency>;
export type CurrencyCreateType = z.infer<typeof CurrencyCreate>;
export type CurrencyUpdateType = z.infer<typeof CurrencyUpdate>;
export type CurrencyLinkType = z.infer<typeof CurrencyLink>;

export const CurrencyOrder = buildOrderZodSchema<typeof Currency>(['createdAt', 'description', 'id', 'name']);
export const CurrencyFilter = buildFilterZodSchema(Currency);
export const CurrencyPagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: CurrencyId,
      startFrom: buildCursorZodSchema(Currency),
    })
    .optional(),
});

export type CurrencyOrderType = z.infer<typeof CurrencyOrder>;
export type CurrencyFilterType = z.infer<typeof CurrencyFilter>;
