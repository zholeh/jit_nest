import { z } from 'zod';
import { ChannelId } from './channel';
import { EntitySchema } from './base/entity';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';
import { MemberId } from './member';
import { TeamMateId } from './teamMate';

export const MemberNoticeId = z.string().uuid().brand<'MemberNoticeId'>('MemberNoticeId');

export const MemberNotice = z
  .object({
    id: MemberNoticeId,
    range: z.number().max(999.99).min(0),
    channelId: ChannelId,
    mateId: TeamMateId,
    memberId: MemberId,
    notice: z.string().max(1024),
  })
  .extend(EntitySchema.shape);

export const MemberNoticeCreate = MemberNotice.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const MemberNoticeUpdate = MemberNoticeCreate.partial().extend(MemberNotice.pick({ id: true }).shape);

export const MemberNoticeLink = z.object({
  id: MemberNoticeId,
});

export type MemberNoticeIdType = z.infer<typeof MemberNoticeId>;
export type MemberNoticeType = z.infer<typeof MemberNotice>;
export type MemberNoticeCreateType = z.infer<typeof MemberNoticeCreate>;
export type MemberNoticeUpdateType = z.infer<typeof MemberNoticeUpdate>;
export type MemberNoticeLinkType = z.infer<typeof MemberNoticeLink>;

export const MemberNoticeOrder = buildOrderZodSchema<typeof MemberNotice>([
  'createdAt',
  'memberId',
  'channelId',
  'mateId',
]);
export const MemberNoticeFilter = buildFilterZodSchema(MemberNotice);
export const MemberNoticePagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: MemberNoticeId,
      startFrom: buildCursorZodSchema(MemberNotice),
    })
    .optional(),
});

export type MemberNoticeOrderType = z.infer<typeof MemberNoticeOrder>;
export type MemberNoticeFilterType = z.infer<typeof MemberNoticeFilter>;
