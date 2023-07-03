import { datePreprocessor } from '../helper/zodPreprocessor';
import { z } from 'zod';

export const DateRangeInput = z.object({
  start: z.preprocess(datePreprocessor, z.date()),
  end: z.preprocess(datePreprocessor, z.date()),
});
