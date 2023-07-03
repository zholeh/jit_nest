import { z } from 'zod';

export const BooleanInput = z.object({
  eq: z.boolean(),
});
