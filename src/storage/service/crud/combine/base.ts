import { Knex } from 'knex';
import { TypeOf } from 'zod';
import { DatabaseEntity } from '../../../entity/entity.abstract';
import { AnySchema } from '../../../helper/zod';
import { Condition, EntitySchema, JoinRule, JoinMethod } from './types';

type InferSchema<E> = E extends DatabaseEntity<infer U> ? U : never;
type InferTypeofSchema<E> = TypeOf<InferSchema<E>>;

type Rule<Left extends DatabaseEntity<AnySchema>, Right extends DatabaseEntity<AnySchema>> = {
  entity: Right;
  left: Exclude<keyof InferTypeofSchema<Left>, symbol>;
  right: Exclude<keyof InferTypeofSchema<Right>, symbol>;
} & RuleOptionalProperty;

type RuleOptionalProperty = {
  condition?: Condition;
  incomingName?: string;
  alias?: string;
  method?: JoinMethod;
};

type SubRelation<
  Entity extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S0 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S1 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S2 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S3 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S4 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S5 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S6 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S7 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S8 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S9 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
> = Rule<Entity, S0> & {
  subs?: ReadonlyArray<
    Rule<S0, S1> & {
      subs?: ReadonlyArray<
        Rule<S1, S2> & {
          subs?: ReadonlyArray<
            Rule<S2, S3> & {
              subs?: ReadonlyArray<
                Rule<S3, S4> & {
                  subs?: ReadonlyArray<
                    Rule<S4, S5> & {
                      subs?: ReadonlyArray<
                        Rule<S5, S6> & {
                          subs?: ReadonlyArray<
                            Rule<S6, S7> & {
                              subs?: ReadonlyArray<
                                Rule<S7, S8> & {
                                  subs?: Rule<S8, S9>[];
                                }
                              >;
                            }
                          >;
                        }
                      >;
                    }
                  >;
                }
              >;
            }
          >;
        }
      >;
    }
  >;
};

type Relation<
  MainEntity extends AnySchema,
  Entity extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S0 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S1 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S2 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S3 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S4 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S5 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S6 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S7 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S8 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
  S9 extends DatabaseEntity<AnySchema> = DatabaseEntity<AnySchema>,
> = RuleOptionalProperty & {
  entity: Entity;
  left: Exclude<keyof TypeOf<MainEntity>, symbol>;
  right: Exclude<keyof InferTypeofSchema<Entity>, symbol>;
  subs?: SubRelation<Entity, S0, S1, S2, S3, S4, S5, S6, S7, S8, S9>[];
};

// type RelationOption<Entity extends AnySchema, Left extends DatabaseEntity<AnySchema>> = {
//   entity: DatabaseEntity<Entity>;
//   left: Exclude<keyof InferTypeofSchema<Left>, symbol>;
//   right: Exclude<keyof InferTypeofSchema<DatabaseEntity<Entity>>, symbol>;
//   condition?: Condition;
//   incomingName?: string;
//   alias?: string;
// };

export abstract class BaseEntityCrud<MainEntity extends EntitySchema> {
  abstract readonly mainEntity: DatabaseEntity<MainEntity>;
  protected readonly joinedTables: JoinRule<MainEntity>[] = [];
  private relations: ReadonlyArray<Relation<MainEntity>> = [];

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
  >(relations: Relation<MainEntity, Entity, S0, S1, S2, S3, S4, S5, S6, S7, S8, S9>[]) {
    this.relations = relations;
  }

  getRelation(field: string, relations?: ReadonlyArray<SubRelation>): SubRelation | undefined {
    const loop = relations || this.relations;

    for (const relation of loop) {
      const name = relation.incomingName || relation.entity.conventionalTableName || relation.entity.table;
      if (name === field) return relation;
      if (relation.subs?.length) return this.getRelation(field, relation.subs);

      return undefined;
    }
    // return loop.find((relation) => {
    //   const name = relation.incomingName || relation.entity.conventionalTableName || relation.entity.table;
    //   const result = name === field;

    //   if (!result && relation.subs?.length) {
    //     return this.getRelation(field, relation.subs);
    //   }

    //   return result;
    // });
  }

  // protected relation<Entity extends EntitySchema, Left extends DatabaseEntity<AnySchema>>(
  //   options: RelationOption<Entity, Left>,
  // ) {
  //   const mainEntity: DatabaseEntity<MainEntity> = this.mainEntity;
  //   const rule: JoinRule<Entity> = {
  //     entity: options.entity,
  //     incomingName: options.incomingName,
  //     rules: [
  //       {
  //         left: mainEntity.dbField(options.left),
  //         right: options.entity.dbField(options.right),
  //         condition: options.condition ?? '=',
  //       },
  //     ],
  //   };

  //   const sub = <Entity extends EntitySchema, Left extends typeof options.entity>(subOptions: {
  //     entity: DatabaseEntity<Entity>;
  //     left: Exclude<keyof TypeOf<Left['schema']>, symbol>;
  //     right: Exclude<keyof TypeOf<DatabaseEntity<Entity>['schema']>, symbol>;
  //     condition?: Condition;
  //     incomingName?: string;
  //   }) => {
  //     const subFn = <Entity extends AnySchema, Left extends typeof subOptions.entity>(options: {
  //       entity: DatabaseEntity<Entity>;
  //       left: Exclude<keyof TypeOf<Left['schema']>, symbol>;
  //       right: Exclude<keyof TypeOf<DatabaseEntity<Entity>['schema']>, symbol>;
  //       condition?: Condition;
  //       incomingName?: string;
  //     }) => {
  //       const rule: JoinRule<Entity> = {
  //         entity: options.entity,
  //         incomingName: options.incomingName,
  //         rules: [
  //           {
  //             left: mainEntity.dbField(options.left),
  //             right: options.entity.dbField(options.right),
  //             condition: options.condition ?? '=',
  //           },
  //         ],
  //       };
  //       this.joinedTables.push(rule);
  //       return { sub };
  //     };

  //     const rule: JoinRule<Entity> = {
  //       entity: subOptions.entity,
  //       incomingName: subOptions.incomingName,
  //       rules: [
  //         {
  //           left: mainEntity.dbField(subOptions.left),
  //           right: subOptions.entity.dbField(subOptions.right),
  //           condition: subOptions.condition ?? '=',
  //         },
  //       ],
  //     };
  //     this.joinedTables.push(rule);
  //     // mainEntity = options.entity;

  //     return { relation: sub, sub: subFn };
  //     // return { relation: sub, sub: sub.bind(this) };
  //     // return { relation: sub };
  //   };

  //   this.joinedTables.push(rule);
  //   return { relation: this.relation, sub };
  // }
}
