import { Knex as KnexNext } from 'nestjs-knex';
import { Team, TeamRelation } from '../../../schema';
import { currencyEntity, teamEntity } from '../../entity';
import { CrudRelationFactory } from '../crud/relation/crud.entity';

export class TeamRelationStorage extends CrudRelationFactory<typeof TeamRelation, typeof Team>() {
  readonly mainEntity = teamEntity;
  protected readonly knex;

  constructor(knex: KnexNext) {
    super(knex);
    this.knex = knex;

    this.rel([{ entity: currencyEntity, left: 'currencyId', right: 'id' }]);
  }
}
