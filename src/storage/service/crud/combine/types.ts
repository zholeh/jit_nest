import {
  TypeOf,
  ZodBranded,
  ZodDate,
  ZodEffects,
  ZodNullable,
  ZodObject,
  ZodOptional,
  ZodRawShape,
  ZodString,
} from 'zod';
import { DatabaseEntity } from '../../../entity/entity.abstract';

export type EntityIdSchema = { id: ZodBranded<ZodString, string> };
export type EntityCommonFields = {
  createdAt: ZodEffects<ZodDate, Date, unknown>;
  updatedAt: ZodOptional<ZodNullable<ZodEffects<ZodNullable<ZodDate>, Date | null, unknown>>>;
  deletedAt: ZodOptional<ZodNullable<ZodEffects<ZodNullable<ZodDate>, Date | null, unknown>>>;
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

export type Condition = '=' | '>' | '<' | '>=' | '<=';
export type JoinMethod = 'leftJoin';
export type Rule<Left = string, Right = string> = Readonly<
  { left: Left; right: Right; condition?: Condition } | { or: Rule[] } | { and: Rule[] }
>;
export type JoinRule<E extends ZodObject<ZodRawShape>> = {
  entity: DatabaseEntity<E>;
  incomingName?: string;
  rules?: ReadonlyArray<Rule>;
  parent?: JoinRule<EntitySchema>;
};
