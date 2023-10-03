import { z } from 'zod';
import { EntitySchema, entityOmit } from './base/entity';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { UserId } from './user';
import { CurrencyId } from './currency';

export const MessageId = z.string().uuid().brand<'MessageId'>('MessageId');

export const Message = z
  .object({
    id: MessageId,
    name: z.string().max(255).nonempty(),
    description: z.string().max(1024),
    referralId: UserId,
    currencyId: CurrencyId,
  })
  .extend(EntitySchema.shape);

export const MessageCreate = Message.omit({
  id: true,
  ...entityOmit,
});

export const MessageUpdate = MessageCreate.partial().extend(Message.pick({ id: true }).shape);

export const MessageLink = z.object({
  id: MessageId,
});

export type MessageIdType = z.infer<typeof MessageId>;
export type MessageType = z.infer<typeof Message>;
export type MessageCreateType = z.infer<typeof MessageCreate>;
export type MessageUpdateType = z.infer<typeof MessageUpdate>;
export type MessageLinkType = z.infer<typeof MessageLink>;

export const MessageOrder = buildOrderZodSchema<typeof Message>(['createdAt', 'description', 'id', 'name']);
export const MessageFilter = buildFilterZodSchema(Message);
export const MessagePagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: MessageId,
      startFrom: buildCursorZodSchema(Message),
    })
    .optional(),
});

export type MessageOrderType = z.infer<typeof MessageOrder>;
export type MessageFilterType = z.infer<typeof MessageFilter>;
