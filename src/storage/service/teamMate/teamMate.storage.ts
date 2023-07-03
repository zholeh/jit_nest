import { Knex } from 'nestjs-knex';
import { TeamMate, TeamMateCreate, TeamMateLink, TeamMateUpdate } from '../../../schema/teamMate';
import { teamMateColumns, teamMateTable } from '../../entity/teamMate.entity';
import { crudEntityFactory } from '../crud/entity/crud.entity';

export class TeamMateStorage extends crudEntityFactory({
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
