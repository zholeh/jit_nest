import { Knex } from 'nestjs-knex';
import { ZodBranded, ZodObject, ZodRawShape, ZodString, z } from 'zod';
import { Create } from './create';
import { Delete } from './delete';
import { Read } from './read';
import { EntitySchema } from './types';
import { Update } from './update';
import { BaseEntityCrud } from './base';

// TODO: transactions

// type EntityIdSchema = { id: ZodBranded<ZodString, string> };
// type EntityCommonFields = {
//   createdAt: ZodEffects<ZodDate, Date, unknown>;
//   updatedAt: ZodEffects<ZodNullable<ZodDate>, Date | null, unknown>;
//   deletedAt: ZodEffects<ZodNullable<ZodDate>, Date | null, unknown>;
// };
// type EntitySchema = ZodObject<ZodRawShape & EntityIdSchema & EntityCommonFields>;
// type EntityId = Exclude<z.infer<EntitySchema>['id'], undefined>;
// type EntityType<Entity extends EntitySchema> = z.infer<Entity>;
// type KeyofEntity<Entity extends EntitySchema> = keyof EntityType<Entity>;
// type EntityLink<Entity extends EntitySchema> = Pick<z.infer<Entity>, 'id'>;

// export abstract class CrudEntityStorage<
//   Entity extends EntitySchema,
//   EntityCreate extends DictionaryUnknown,
//   EntityUpdate extends DictionaryUnknown,
// > {
//   protected abstract readonly table: string;
//   protected abstract readonly schema: Entity;
//   protected abstract readonly columns: {
//     db: Map<KeyofEntity<Entity>, string>;
//     entity: Map<string, KeyofEntity<Entity>>;
//   };

//   protected get builder() {
//     return this.knex(this.table);
//   }

//   constructor(readonly knex: Knex) {}

//   async findAll(options?: FindAllOptions<EntityType<Entity>>): Promise<readonly FindReturn<EntityType<Entity>>[]> {
//     const result = await this.buildQuery(options);
//     return result.map((entity) => this.entity(entity));
//   }

//   async findOne(options?: FindOneOptions<EntityType<Entity>>): Promise<FindReturn<EntityType<Entity>> | undefined> {
//     const result = await this.findAll(this.addLimitToOptions(1, options));

//     if (result.length) return result.map((entity) => this.entity(entity))[0];
//     return undefined;
//   }

//   async findOneOrFail(options: FindOneOptions<EntityType<Entity>>): Promise<FindReturn<EntityType<Entity>>> {
//     const entity = await this.findOne(options);
//     if (!entity) {
//       throw new NotFoundServiceError(`Entity with options: ${JSON.stringify(options)} not found`);
//     }

//     return entity;
//   }

//   async create(input: EntityCreate): Promise<EntityType<Entity>> {
//     const result = await this.builder.insert(input).returning('*');
//     if (result.length) return this.entity(result[0]);
//     throw new UnprocessableEntityServiceError(`Incorrect insert ${JSON.stringify(input)}`);
//   }

//   async update(
//     input: EntityUpdate & {
//       id: EntityId;
//     },
//   ): Promise<EntityType<Entity>> {
//     const result = await this.builder
//       .where('id', input.id)
//       .update({ ...input, updatedAt: new Date() })
//       .returning('*');
//     if (result.length) return this.entity(result[0]);
//     throw new UnprocessableEntityServiceError(`Incorrect update ${JSON.stringify(input)}`);
//   }

//   async patch(
//     input: Partial<EntityUpdate> & {
//       id: EntityId;
//     },
//   ): Promise<EntityType<Entity>> {
//     const result = await this.builder
//       .where('id', input.id)
//       .update({ ...input, updatedAt: new Date() })
//       .returning('*');
//     if (result.length) return this.entity(result[0]);
//     throw new UnprocessableEntityServiceError(`Incorrect patch ${JSON.stringify(input)}`);
//   }

//   async delete(link: EntityLink<Entity>, softDelete = true): Promise<TypeOf<ZodBoolean>> {
//     if (!link?.id) throw new UnprocessableEntityServiceError(`Can't delete the entity ${this.table}`);
//     if (softDelete) return this.softDelete(link.id);
//     return this.hardDelete(link.id);
//   }

//   private async softDelete(id: EntityLink<Entity>['id']): Promise<boolean> {
//     const input = { deletedAt: new Date() };
//     const result = await this.builder.where('id', id).update(input);

//     if (result > 0) return true;
//     return false;
//   }

//   private async hardDelete(id: EntityLink<Entity>['id']): Promise<boolean> {
//     const result = await this.builder.where('id', id).delete();

//     if (result > 0) return true;
//     return false;
//   }

//   private entity(entity: DictionaryUnknown): EntityType<Entity> {
//     const obj = Object.entries(entity).map(([key, value]) => {
//       const field = this.entityField(key);
//       return { [field]: value };
//     });
//     return this.schema.parse(obj);
//   }

//   private entityField(field: string): KeyofEntity<Entity> {
//     return this.columns.entity.get(field) || field.toString();
//   }

//   private dbFields(arr?: KeyofEntity<Entity>[]): string[] {
//     if (!arr) return ['*'];
//     return arr.map((el) => this.dbField(el));
//   }

//   private dbField(field: KeyofEntity<Entity>): string {
//     return this.columns.db.get(field) || field.toString();
//   }

//   private addLimitToOptions(limit: number, options?: FindAllOptions<EntityType<Entity>>) {
//     const result: FindAllOptions<EntityType<Entity>> = options ? { ...options } : {};
//     const pagination = result.pagination ? { ...result.pagination } : { limit };
//     pagination.limit = limit;
//     result.pagination = pagination;
//     return result;
//   }

//   private buildQuery(options: FindAllOptions<EntityType<Entity>> | undefined) {
//     const query = this.builder.select(this.dbFields(options?.fields));

//     if (options?.filters) buildFilters(options.filters, query);
//     if (options?.orders) query.orderBy(buildOrders(options.orders));
//     if (options?.pagination?.limit) query.limit(options.pagination.limit);
//     // TODO: offset should be by code
//     // if (options?.pagination?.offset) query.offset(options.pagination.offset);
//     if (options?.pagination?.cursor) buildCursor(options.pagination?.cursor, query);
//     return query;
//   }
// }

type GConstructor<T = object> = new (knex: Knex) => T;

type FactoryType<
  Entity extends EntitySchema,
  EntityCreate extends ZodObject<ZodRawShape> | false,
  EntityUpdate extends ZodObject<{ id: ZodBranded<ZodString, string> }> | false,
  EntityDelete extends ZodObject<{ id: ZodBranded<ZodString, string> }> | false,
> = GConstructor<
  Read<Entity> &
    (EntityCreate extends false ? BaseEntityCrud<Entity> : Create<Entity, z.infer<Exclude<EntityCreate, false>>>) &
    (EntityUpdate extends false ? BaseEntityCrud<Entity> : Update<Entity, z.infer<Exclude<EntityUpdate, false>>>) &
    (EntityDelete extends false ? BaseEntityCrud<Entity> : Exclude<Delete<Entity>, false>)
>;

export function CrudEntityFactory<
  Entity extends EntitySchema,
  EntityCreate extends ZodObject<ZodRawShape> | false,
  EntityUpdate extends ZodObject<{ id: ZodBranded<ZodString, string> }> | false,
  EntityDelete extends ZodObject<{ id: ZodBranded<ZodString, string> }> | false,
>(options: {
  entity: Entity;
  create: EntityCreate | false;
  update: EntityUpdate | false;
  delete: EntityDelete | false;
}): FactoryType<Entity, EntityCreate, EntityUpdate, EntityDelete> {
  class Empty {}
  const arr: unknown[] = [BaseEntityCrud, Read];
  if (options.create) arr.push(Create);
  if (options.update) arr.push(Update);
  if (options.delete) arr.push(Delete);
  applyMixins(Empty, arr);
  return Empty as unknown as FactoryType<Entity, EntityCreate, EntityUpdate, EntityDelete>;
}

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null),
      );
    });
  });
}
