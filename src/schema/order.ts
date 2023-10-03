import { z } from 'zod';
import { EntitySchema, entityOmit } from './base/entity';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { MemberId } from './member';
import { TeamMateId } from './teamMate';
import { SupplyId } from './supply';

export const OrderId = z.string().uuid().brand<'OrderId'>('OrderId');

export const OrderSupply = z.object({
  supply: SupplyId,
  amount: z.number(),
  price: z.number(),
  time: z.number().int(),
  sum: z.number(),
});

export const Order = z
  .object({
    id: OrderId,
    memberId: MemberId,
    completed: z.boolean(),
    startTime: z.date(),
    endTime: z.date(),
    teamMateId: TeamMateId,
    supplies: OrderSupply.array(),
    completedTime: z.date(),
    date: z.date(),
  })
  .extend(EntitySchema.shape);

export const OrderCreate = Order.omit({
  id: true,
  ...entityOmit,
});

export const OrderUpdate = OrderCreate.partial().extend(Order.pick({ id: true }).shape);

export const OrderLink = z.object({
  id: OrderId,
});

export type OrderIdType = z.infer<typeof OrderId>;
export type OrderType = z.infer<typeof Order>;
export type OrderCreateType = z.infer<typeof OrderCreate>;
export type OrderUpdateType = z.infer<typeof OrderUpdate>;
export type OrderLinkType = z.infer<typeof OrderLink>;

export const OrderOrder = buildOrderZodSchema<typeof Order>(['createdAt', 'startTime', 'endTime', 'date']);
export const OrderFilter = buildFilterZodSchema(Order.omit({ supplies: true }));
export const OrderPagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: OrderId,
      startFrom: buildCursorZodSchema(Order.omit({ supplies: true })),
    })
    .optional(),
});

export type OrderOrderType = z.infer<typeof OrderOrder>;
export type OrderFilterType = z.infer<typeof OrderFilter>;
