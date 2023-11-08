import { Knex } from 'nestjs-knex';
import { TeamMate, TeamMateCreate, TeamMateLink, TeamMateUpdate } from '../../../schema';
import { teamMateColumns, teamMateTable } from '../../entity/teamMate.entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class TeamMateStorage extends CrudEntityFactory({
  entity: TeamMate,
  create: TeamMateCreate,
  update: TeamMateUpdate,
  delete: TeamMateLink,
}) {
  protected readonly table = teamMateTable;
  protected readonly columns = teamMateColumns;
  protected readonly schema = TeamMate;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
