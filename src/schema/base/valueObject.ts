import { datePreprocessor } from '../helper/zodPreprocessor';
import { z } from 'zod';

export const ValueObjectSchema = z.object({
  createdAt: z.preprocess(datePreprocessor, z.date()),
});
