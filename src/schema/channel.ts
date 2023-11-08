import { z } from 'zod';
import { EntitySchema, entityOmit } from './base/entity';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { TeamId } from './team';

export const ChannelId = z.string().uuid().brand<'ChannelId'>('ChannelId');

export const Channel = z
  .object({
    id: ChannelId,
    name: z.string().max(255).min(1),
    description: z.string().max(1024),
    teamId: TeamId,
    token: z.string(),
  })
  .extend(EntitySchema.shape);

export const ChannelCreate = Channel.omit({
  id: true,
  ...entityOmit,
});

export const ChannelUpdate = ChannelCreate.partial().extend(Channel.pick({ id: true }).shape);

export const ChannelLink = z.object({
  id: ChannelId,
});

export type ChannelIdType = z.infer<typeof ChannelId>;
export type ChannelType = z.infer<typeof Channel>;
export type ChannelCreateType = z.infer<typeof ChannelCreate>;
export type ChannelUpdateType = z.infer<typeof ChannelUpdate>;
export type ChannelLinkType = z.infer<typeof ChannelLink>;

export const ChannelOrder = buildOrderZodSchema<typeof Channel>(['createdAt', 'description', 'id', 'name']);
export const ChannelFilter = buildFilterZodSchema(Channel);
export const ChannelPagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: ChannelId,
      startFrom: buildCursorZodSchema(Channel),
    })
    .optional(),
});

export type ChannelOrderType = z.infer<typeof ChannelOrder>;
export type ChannelFilterType = z.infer<typeof ChannelFilter>;
