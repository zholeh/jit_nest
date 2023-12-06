import { Knex as KnexNext } from 'nestjs-knex';
import { Currency, Team, TeamRelation } from '../../../schema';
import { currencyEntity, teamEntity } from '../../entity';
import { CrudRelationFactory } from '../crud/combine/crud.entity';
import { JoinRule } from '../crud/combine/types';

const joinCurrency: Readonly<JoinRule<typeof Currency>> = {
  entity: currencyEntity,
  rules: [{ left: teamEntity.dbField('currencyId'), right: currencyEntity.dbField('id'), condition: '=' }],
} as const;
const joins: [JoinRule<typeof Currency>] = [joinCurrency];

export class TeamRelationStorage extends CrudRelationFactory<typeof TeamRelation, typeof Team>() {
  readonly mainEntity = teamEntity;
  protected readonly knex;
  // protected joinedTables = joins;

  constructor(knex: KnexNext) {
    super(knex);
    this.knex = knex;

    this.rel([{ entity: currencyEntity, left: 'currencyId', right: 'id' }]);
  }
}
