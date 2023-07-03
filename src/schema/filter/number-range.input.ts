import { z } from 'zod';

export const NumberRangeInput = z.object({
  start: z.number(),
  end: z.number(),
});
