import { z } from 'zod';
import { DateRangeInput as DateRangeInput } from './date-range.input';
import { datePreprocessor } from '../helper/zodPreprocessor';

export const DateInput = z.object({
  eq: z.preprocess(datePreprocessor, z.date()).optional(),
  notEq: z.preprocess(datePreprocessor, z.date()).optional(),
  lt: z.preprocess(datePreprocessor, z.date()).optional(),
  lte: z.preprocess(datePreprocessor, z.date()).optional(),
  gt: z.preprocess(datePreprocessor, z.date()).optional(),
  gte: z.preprocess(datePreprocessor, z.date()).optional(),
  between: DateRangeInput.optional(),
  notBetween: DateRangeInput.optional(),
  isNull: z.boolean().optional(),
  isNotNull: z.boolean().optional(),
});
