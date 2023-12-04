import { Knex as KnexNext } from 'nestjs-knex';
import { Currency, Team, TeamCombine, TeamMate, TeamType } from '../../../schema';
import { calendarEntity, currencyEntity, teamEntity, teamMateEntity } from '../../entity';
import { DatabaseEntity } from '../../entity/entity.abstract';
import { CrudCombineFactory } from '../crud/combine/crud.entity';
import { JoinRule } from '../crud/combine/types';

const joinTeam: Readonly<JoinRule<typeof Team>> = {
  entity: teamEntity,
  rules: [{ left: teamMateEntity.dbField('teamId'), right: teamEntity.dbField('id'), condition: '=' }],
} as const;

const joinCurrency: Readonly<JoinRule<typeof Currency>> = {
  entity: currencyEntity,
  rules: [{ left: teamEntity.dbField('currencyId'), right: currencyEntity.dbField('id'), condition: '=' }],
} as const;
const joins: [JoinRule<typeof Team>, JoinRule<typeof Currency>] = [joinTeam, joinCurrency];

export class TeamMateRelationStorage extends CrudCombineFactory<typeof TeamCombine, typeof TeamMate>() {
  readonly mainEntity = teamMateEntity;
  protected readonly knex;
  protected joinedTables = joins;

  constructor(knex: KnexNext) {
    super(knex);
    this.knex = knex;

    const bbb = this.rel({
      entity: teamEntity,
      left: 'teamId',
      right: 'id',
      sub: [
        {
          entity: currencyEntity,
          left: 'currencyId',
          right: 'id',
          sub: [
            {
              entity: teamEntity,
              left: 'shortName',
              right: 'name',
              sub: [
                {
                  entity: teamMateEntity,
                  left: 'id',
                  right: 'role',
                  sub: [
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
    }).rel({
      entity: teamEntity,
      left: 'teamId',
      right: 'id',
    });

    const aaa = this.relation({ entity: teamEntity, left: 'teamId', right: 'id' })
      .relation({
        entity: teamEntity,
        left: 'id',
        right: 'id',
      })
      .relation({
        entity: teamEntity,
        left: 'id',
        right: 'id',
      })
      .sub({ entity: currencyEntity, left: 'currencyId', right: 'id' })
      .sub({ entity: teamMateEntity, left: 'createdAt', right: 'id' })
      .sub({ entity: currencyEntity, left: 'currencyId', right: 'id' })
      .sub({ entity: teamMateEntity, left: 'shortName', right: 'id' })
      .sub({ entity: currencyEntity, left: 'referralId', right: 'id' })
      .sub({ entity: calendarEntity, left: 'id', right: 'bookedTimes' });
    // const aaa2 = this.relation2({ entity: teamEntity, left: 'teamId', right: 'id' }, () => {
    //   return {
    //     entity: teamMateEntity,
    //     left: 'currencyId',
    //     right: 'id',
    //   };
    // });
  }
}
