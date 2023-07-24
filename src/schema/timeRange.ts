import { z } from 'zod';
import { onlyTimeTransformer } from './helper/zodPreprocessor';

export const TimeRange = z.object({
  from: z.date().transform(onlyTimeTransformer),
  to: z.date().transform(onlyTimeTransformer),
});
