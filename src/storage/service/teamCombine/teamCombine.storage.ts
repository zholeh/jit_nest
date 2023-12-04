import { Knex as KnexNext } from 'nestjs-knex';
import { Currency, Team, TeamCombine } from '../../../schema';
import { currencyEntity, teamEntity } from '../../entity';
import { CrudCombineFactory } from '../crud/combine/crud.entity';
import { JoinRule } from '../crud/combine/types';

const joinCurrency: Readonly<JoinRule<typeof Currency>> = {
  entity: currencyEntity,
  rules: [{ left: teamEntity.dbField('currencyId'), right: currencyEntity.dbField('id'), condition: '=' }],
} as const;
const joins: [JoinRule<typeof Currency>] = [joinCurrency];

export class TeamCombineStorage extends CrudCombineFactory<typeof TeamCombine, typeof Team>() {
  readonly mainEntity = teamEntity;
  protected readonly knex;
  protected joinedTables = joins;

  constructor(knex: KnexNext) {
    super(knex);
    this.knex = knex;
  }
}
