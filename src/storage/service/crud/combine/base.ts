import { Knex } from 'knex';
import { ZodObject, ZodRawShape, TypeOf } from 'zod';
import { currencyEntity } from '../../../entity';
import { DatabaseEntity } from '../../../entity/entity.abstract';
import { Condition, EntitySchema, JoinRule } from './types';

type AnySchema = ZodObject<ZodRawShape>;

type RelationOption<Entity extends AnySchema, Left extends DatabaseEntity<AnySchema>> = {
  entity: DatabaseEntity<Entity>;
  left: Exclude<keyof TypeOf<Left['schema']>, symbol>;
  right: Exclude<keyof TypeOf<DatabaseEntity<Entity>['schema']>, symbol>;
  condition?: Condition;
  incomingName?: string;
  alias?: string;
};
type Relation<Left extends DatabaseEntity<AnySchema>, Right extends DatabaseEntity<AnySchema>> = {
  entity: Right;
  left: Exclude<keyof TypeOf<Left['schema']>, symbol>;
  right: Exclude<keyof TypeOf<Right['schema']>, symbol>;
  condition?: Condition;
  incomingName?: string;
  alias?: string;
};

type SubEntityFn<Entity extends DatabaseEntity<AnySchema>, SubEntity extends DatabaseEntity<AnySchema> = any> = {
  entity: SubEntity;
  left: keyof TypeOf<Entity['schema']>;
  right: keyof TypeOf<SubEntity['schema']>;
  sub?: SubEntityFn<SubEntity, SubEntity>;
};

type InferDatabaseEntity<E> = E extends DatabaseEntity<AnySchema> ? E : never;
type InferSchema<E> = E extends DatabaseEntity<infer U> ? U : never;
type InferTypeofSchema<E> = TypeOf<InferSchema<E>>;

export abstract class BaseEntityCrud<MainEntity extends EntitySchema> {
  abstract readonly mainEntity: DatabaseEntity<MainEntity>;
  protected readonly joinedTables: JoinRule<any>[] = [];

  protected abstract readonly knex: Knex;

  rel<
    Entity extends DatabaseEntity<AnySchema>,
    S0 extends DatabaseEntity<AnySchema>,
    S1 extends DatabaseEntity<AnySchema>,
    S2 extends DatabaseEntity<AnySchema>,
    S3 extends DatabaseEntity<AnySchema>,
    S4 extends DatabaseEntity<AnySchema>,
    S5 extends DatabaseEntity<AnySchema>,
    S6 extends DatabaseEntity<AnySchema>,
    S7 extends DatabaseEntity<AnySchema>,
    S8 extends DatabaseEntity<AnySchema>,
    S9 extends DatabaseEntity<AnySchema>,
  >(options: {
    entity: Entity;
    left: Exclude<keyof TypeOf<MainEntity>, symbol>;
    right: Exclude<keyof TypeOf<Entity['schema']>, symbol>;
    condition?: Condition;
    incomingName?: string;
    sub?: (Relation<Entity, S0> & {
      sub?: (Relation<S0, S1> & {
        sub?: (Relation<S1, S2> & {
          sub?: (Relation<S2, S3> & {
            sub?: (Relation<S3, S4> & {
              sub?: (Relation<S4, S5> & {
                sub?: (Relation<S5, S6> & {
                  sub?: (Relation<S6, S7> & {
                    sub?: (Relation<S7, S8> & {
                      sub?: Relation<S8, S9>[];
                    })[];
                  })[];
                })[];
              })[];
            })[];
          })[];
        })[];
      })[];
    })[];
  }) {
    console.log(options);

    return {
      rel: this.rel,
    };
  }

  protected relation<Entity extends EntitySchema, Left extends DatabaseEntity<AnySchema>>(
    options: RelationOption<Entity, Left>,
  ) {
    const mainEntity: DatabaseEntity<MainEntity> = this.mainEntity;
    const rule: JoinRule<Entity> = {
      entity: options.entity,
      incomingName: options.incomingName,
      rules: [
        {
          left: mainEntity.dbField(options.left),
          right: options.entity.dbField(options.right),
          condition: options.condition ?? '=',
        },
      ],
    };

    const sub = <Entity extends EntitySchema, Left extends typeof options.entity>(subOptions: {
      entity: DatabaseEntity<Entity>;
      left: Exclude<keyof TypeOf<Left['schema']>, symbol>;
      right: Exclude<keyof TypeOf<DatabaseEntity<Entity>['schema']>, symbol>;
      condition?: Condition;
      incomingName?: string;
    }) => {
      const subFn = <Entity extends AnySchema, Left extends typeof subOptions.entity>(options: {
        entity: DatabaseEntity<Entity>;
        left: Exclude<keyof TypeOf<Left['schema']>, symbol>;
        right: Exclude<keyof TypeOf<DatabaseEntity<Entity>['schema']>, symbol>;
        condition?: Condition;
        incomingName?: string;
      }) => {
        const rule: JoinRule<Entity> = {
          entity: options.entity,
          incomingName: options.incomingName,
          rules: [
            {
              left: mainEntity.dbField(options.left),
              right: options.entity.dbField(options.right),
              condition: options.condition ?? '=',
            },
          ],
        };
        this.joinedTables.push(rule);
        return { sub };
      };

      const rule: JoinRule<Entity> = {
        entity: subOptions.entity,
        incomingName: subOptions.incomingName,
        rules: [
          {
            left: mainEntity.dbField(subOptions.left),
            right: subOptions.entity.dbField(subOptions.right),
            condition: subOptions.condition ?? '=',
          },
        ],
      };
      this.joinedTables.push(rule);
      // mainEntity = options.entity;

      return { relation: sub, sub: subFn };
      // return { relation: sub, sub: sub.bind(this) };
      // return { relation: sub };
    };

    this.joinedTables.push(rule);
    return { relation: this.relation, sub };
  }
}
