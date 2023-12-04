import { Knex } from 'nestjs-knex';
import { Team, TeamCreate, TeamLink, TeamUpdate } from '../../../schema';
import { teamEntity } from '../../entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class TeamStorage extends CrudEntityFactory({
  entity: Team,
  create: TeamCreate,
  update: TeamUpdate,
  delete: TeamLink,
}) {
  protected readonly dbEntity = teamEntity;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
