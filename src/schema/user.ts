import { z } from 'zod';
import { EntitySchema } from './base/entity';
import { buildCursorZodSchema, buildFilterZodSchema, buildOrderZodSchema } from './helper';

export const UserId = z.string().uuid().brand<'UserId'>('UserId');

export const User = z
  .object({
    id: UserId,
    name: z.string().max(255).nonempty(),
    description: z.string().max(1024),
    lastName: z.string().max(255),
    email: z.string().max(255).email(),
    phone: z.string().max(255),
  })
  .extend(EntitySchema.shape);

export const UserCreate = User.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const UserUpdate = UserCreate.partial().extend(User.pick({ id: true }).shape);

export const UserLink = z.object({
  id: UserId,
});

export type UserIdType = z.infer<typeof UserId>;
export type UserType = z.infer<typeof User>;
export type UserCreateType = z.infer<typeof UserCreate>;
export type UserUpdateType = z.infer<typeof UserUpdate>;
export type UserLinkType = z.infer<typeof UserLink>;

export const UserOrder = buildOrderZodSchema<typeof User>(['createdAt', 'description', 'id', 'name', 'lastName']);
export const UserFilter = buildFilterZodSchema(User);
export const UserPagination = z.object({
  limit: z.number(),
  offset: z.number().optional(),
  cursor: z
    .object({
      id: UserId,
      startFrom: buildCursorZodSchema(User),
    })
    .optional(),
});

export type UserOrderType = z.infer<typeof UserOrder>;
export type UserFilterType = z.infer<typeof UserFilter>;
