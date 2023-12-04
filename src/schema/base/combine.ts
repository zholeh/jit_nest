import { datePreprocessor } from '../helper/zodPreprocessor';
import { z } from 'zod';

export const EntitySchema = z.object({
  createdAt: z.preprocess(datePreprocessor, z.date()),
  updatedAt: z.preprocess(datePreprocessor, z.date().nullable()).nullish(),
  deletedAt: z.preprocess(datePreprocessor, z.date().nullable()).nullish(),
});

export const entityOmit: Partial<Record<keyof typeof EntitySchema.shape, true>> = {
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
} as const;
