import { Knex } from 'nestjs-knex';
import { TeamMate, TeamMateCreate, TeamMateLink, TeamMateUpdate } from '../../../schema';
import { teamMateEntity } from '../../entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class TeamMateStorage extends CrudEntityFactory({
  entity: TeamMate,
  create: TeamMateCreate,
  update: TeamMateUpdate,
  delete: TeamMateLink,
}) {
  protected readonly dbEntity = teamMateEntity;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
