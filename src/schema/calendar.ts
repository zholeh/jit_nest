import { z } from 'zod';
import { ValueObjectSchema } from './base/valueObject';
import { BookedTime } from './bookedTime';
import { TeamMateId } from './teamMate';
import { TimeRange } from './timeRange';

export const CalendarLink = z.object({
  teamMateId: TeamMateId,
  date: z.date().transform((arg) => arg.setHours(0, 0, 0)),
});

export const CalendarCreate = z.object({
  timeRanges: TimeRange.array(),
  bookedTimes: BookedTime.array(),
  hasSlot: z.boolean(),
});

export const Calendar = ValueObjectSchema.merge(CalendarLink).merge(CalendarCreate);

export type CalendarType = z.infer<typeof Calendar>;
export type CalendarCreateType = z.infer<typeof CalendarCreate>;
export type CalendarLinkType = z.infer<typeof CalendarLink>;

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
