import { z } from 'zod';
import { onlyTimeTransformer } from './helper/zodPreprocessor';
import { OrderId } from './order';

export const BookedTime = z.object({
  from: z.date().transform(onlyTimeTransformer),
  to: z.date().transform(onlyTimeTransformer),
  order: OrderId,
});
