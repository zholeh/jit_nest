import { Knex } from 'nestjs-knex';
import { Team, TeamCreate, TeamLink, TeamUpdate } from '../../../schema/team';
import { teamColumns, teamTable } from '../../entity/team.entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class TeamStorage extends CrudEntityFactory({
  entity: Team,
  create: TeamCreate,
  update: TeamUpdate,
  delete: TeamLink,
}) {
  protected readonly table = teamTable;
  protected readonly columns = teamColumns;
  protected readonly schema = Team;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
