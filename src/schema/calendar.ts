import { z } from 'zod';
import { ValueObjectSchema } from './base/valueObject';
import { onlyTimeTransformer } from './helper/zodPreprocessor';
import { TeamMateId } from './teamMate';

export const TimeRange = z.object({
  from: z.date().transform(onlyTimeTransformer),
  to: z.date().transform(onlyTimeTransformer),
});

export const BookedTime = z.object({
  from: z.date().transform(onlyTimeTransformer),
  to: z.date().transform(onlyTimeTransformer),
  order: z.string(), // TODO: fix to correct one
});

export const UserLink = z.object({
  teamMateId: TeamMateId,
  date: z.date().transform((arg) => arg.setHours(0, 0, 0)),
});

export const UserCreate = z.object({
  timeRanges: TimeRange.array(),
  bookedTime: BookedTime.array(),
  hasSlot: z.boolean(),
});

export const User = ValueObjectSchema.merge(UserLink).merge(UserCreate);

export type UserType = z.infer<typeof User>;
export type UserCreateType = z.infer<typeof UserCreate>;
export type UserLinkType = z.infer<typeof UserLink>;

// TODO: think about ORDER, FILTER
// export const UserOrder = buildOrderZodSchema<typeof User>(['teamMateId', 'date', 'hasSlot']);
// export const UserFilter = buildFilterZodSchema(User);
// export const UserPagination = z.object({
//   limit: z.number(),
//   offset: z.number().optional(),
//   cursor: z
//     .object({
//       id: UserId,
//       startFrom: buildCursorZodSchema(User),
//     })
//     .optional(),
// });
// export type UserOrderType = z.infer<typeof UserOrder>;
// export type UserFilterType = z.infer<typeof UserFilter>;
