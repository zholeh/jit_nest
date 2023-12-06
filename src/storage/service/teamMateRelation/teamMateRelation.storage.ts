import { Knex as KnexNext } from 'nestjs-knex';
import { TeamMate } from '../../../schema';
import { TeamMateRelation } from '../../../schema/teamMateRelation';
import { currencyEntity, teamEntity, teamMateEntity } from '../../entity';
import { CrudRelationFactory } from '../crud/combine/crud.entity';

export class TeamMateRelationStorage extends CrudRelationFactory<typeof TeamMateRelation, typeof TeamMate>() {
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
