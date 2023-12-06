import { Knex as KnexNext } from 'nestjs-knex';
import { TeamCombine, TeamMate } from '../../../schema';
import { currencyEntity, teamEntity, teamMateEntity } from '../../entity';
import { CrudCombineFactory } from '../crud/combine/crud.entity';

export class TeamMateRelationStorage extends CrudCombineFactory<typeof TeamCombine, typeof TeamMate>() {
  readonly mainEntity = teamMateEntity;
  protected readonly knex;
  protected joinedTables = [];

  constructor(knex: KnexNext) {
    super(knex);
    this.knex = knex;

    this.rel([
      {
        entity: teamEntity,
        left: 'teamId',
        right: 'id',
        subs: [
          {
            entity: currencyEntity,
            left: 'currencyId',
            right: 'id',
            subs: [
              {
                entity: teamEntity,
                left: 'shortName',
                right: 'name',
                subs: [
                  {
                    entity: teamMateEntity,
                    left: 'id',
                    right: 'role',
                    subs: [
                      {
                        entity: teamMateEntity,
                        left: 'role',
                        right: 'description',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        entity: teamEntity,
        left: 'teamId',
        right: 'id',
      },
    ]);

    // this.relation = [];

    // const aaa = this.relation({ entity: teamEntity, left: 'teamId', right: 'id' })
    //   .relation({
    //     entity: teamEntity,
    //     left: 'id',
    //     right: 'id',
    //   })
    //   .relation({
    //     entity: teamEntity,
    //     left: 'id',
    //     right: 'id',
    //   })
    //   .sub({ entity: currencyEntity, left: 'currencyId', right: 'id' })
    //   .sub({ entity: teamMateEntity, left: 'createdAt', right: 'id' })
    //   .sub({ entity: currencyEntity, left: 'currencyId', right: 'id' })
    //   .sub({ entity: teamMateEntity, left: 'shortName', right: 'id' })
    //   .sub({ entity: currencyEntity, left: 'referralId', right: 'id' })
    //   .sub({ entity: calendarEntity, left: 'id', right: 'bookedTimes' });
    // const aaa2 = this.relation2({ entity: teamEntity, left: 'teamId', right: 'id' }, () => {
    //   return {
    //     entity: teamMateEntity,
    //     left: 'currencyId',
    //     right: 'id',
    //   };
    // });
  }
}
