import { datePreprocessor } from './helper/zodPreprocessor';
import { z } from 'zod';

export const EntitySchema = z.object({
  createdAt: z.preprocess(datePreprocessor, z.date()),
  updatedAt: z.preprocess(datePreprocessor, z.date().nullable()),
  deletedAt: z.preprocess(datePreprocessor, z.date().nullable()),
});
