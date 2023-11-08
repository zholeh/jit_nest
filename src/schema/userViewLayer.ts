import { z } from 'zod';
import { ValueObjectSchema } from './base/valueObject';
import { UserId } from './user';
import { buildFilterZodSchema } from './helper';

export const UserViewLayerLink = z.object({
  userId: UserId,
  layer: z.string().max(255).min(1),
});

export const UserViewLayerCreate = z.object({
  setting: z.record(z.any()),
});

export const UserViewLayer = ValueObjectSchema.merge(UserViewLayerLink).merge(UserViewLayerCreate);

export type UserViewLayerType = z.infer<typeof UserViewLayer>;
export type UserViewLayerCreateType = z.infer<typeof UserViewLayerCreate>;
export type UserViewLayerLinkType = z.infer<typeof UserViewLayerLink>;

export const UserViewLayerFilter = buildFilterZodSchema(UserViewLayer.omit({ setting: true }));

// export const UserViewLayerOrder = buildOrderZodSchema<typeof UserViewLayer>(['createdAt', 'layer', 'id']);
// export const UserViewLayerPagination = z.object({
//   limit: z.number(),
//   offset: z.number().optional(),
//   cursor: z
//     .object({
//       id: UserViewLayerId,
//       startFrom: buildCursorZodSchema(UserViewLayer),
//     })
//     .optional(),
// });

// export type UserViewLayerOrderType = z.infer<typeof UserViewLayerOrder>;
// export type UserViewLayerFilterType = z.infer<typeof UserViewLayerFilter>;
