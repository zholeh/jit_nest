import { datePreprocessor } from '../helper/zodPreprocessor';
import { z } from 'zod';

export const EntitySchema = z.object({
  name: z.string().max(255).nonempty(),
  createdAt: z.preprocess(datePreprocessor, z.date()),
  updatedAt: z.preprocess(datePreprocessor, z.date().nullable()),
  deletedAt: z.preprocess(datePreprocessor, z.date().nullable()),
});

export const entityOmit: Partial<Record<keyof typeof EntitySchema.shape, true>> = {
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};
