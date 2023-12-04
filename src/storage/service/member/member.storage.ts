import { Knex } from 'nestjs-knex';
import { Member, MemberCreate, MemberLink, MemberUpdate } from '../../../schema';
import { memberEntity } from '../../entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class MemberStorage extends CrudEntityFactory({
  entity: Member,
  create: MemberCreate,
  update: MemberUpdate,
  delete: MemberLink,
}) {
  protected readonly dbEntity = memberEntity;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
