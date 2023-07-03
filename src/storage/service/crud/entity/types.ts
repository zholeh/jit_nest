import { TypeOf, ZodBranded, ZodDate, ZodEffects, ZodNullable, ZodObject, ZodRawShape, ZodString } from 'zod';

export type EntityIdSchema = { id: ZodBranded<ZodString, string> };
export type EntityCommonFields = {
  createdAt: ZodEffects<ZodDate, Date, unknown>;
  updatedAt: ZodEffects<ZodNullable<ZodDate>, Date | null, unknown>;
  deletedAt: ZodEffects<ZodNullable<ZodDate>, Date | null, unknown>;
};
export type EntitySchema = ZodObject<ZodRawShape & EntityIdSchema & EntityCommonFields>;
export type EntityId = Exclude<TypeOf<EntitySchema>['id'], undefined>;
export type EntityType<Entity extends EntitySchema> = TypeOf<Entity>;
export type KeyofEntity<Entity extends EntitySchema> = keyof EntityType<Entity>;
export type EntityLink<Entity extends EntitySchema> = Pick<TypeOf<Entity>, 'id'>;
export type ColumnsType<Entity extends EntitySchema> = {
  db: Map<KeyofEntity<Entity>, string>;
  entity: Map<string, KeyofEntity<Entity>>;
};
