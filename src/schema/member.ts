import { z } from 'zod';
import { EntitySchema } from './base/entity';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { UserId } from './user';
import { ChannelId } from './channel';

export const MemberId = z.string().uuid().brand<'MemberId'>('MemberId');

export const Member = z
  .object({
    id: MemberId,
    name: z.string().max(255).nonempty(),
    description: z.string().max(1024),
    token: z.string(),
    range: z.number().max(999.99).min(0),
    channelId: ChannelId,
    userId: UserId.nullable(),
  })
  .extend(EntitySchema.shape);

export const MemberCreate = Member.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const MemberUpdate = MemberCreate.partial().extend(Member.pick({ id: true }).shape);

export const MemberLink = z.object({
  id: MemberId,
});

export type MemberIdType = z.infer<typeof MemberId>;
export type MemberType = z.infer<typeof Member>;
export type MemberCreateType = z.infer<typeof MemberCreate>;
export type MemberUpdateType = z.infer<typeof MemberUpdate>;
export type MemberLinkType = z.infer<typeof MemberLink>;

export const MemberOrder = buildOrderZodSchema<typeof Member>(['createdAt', 'description', 'id', 'name']);
export const MemberFilter = buildFilterZodSchema(Member);
export const MemberPagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: MemberId,
      startFrom: buildCursorZodSchema(Member),
    })
    .optional(),
});

export type MemberOrderType = z.infer<typeof MemberOrder>;
export type MemberFilterType = z.infer<typeof MemberFilter>;
