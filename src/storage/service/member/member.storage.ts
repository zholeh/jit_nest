import { Knex } from 'nestjs-knex';
import { Member, MemberCreate, MemberLink, MemberUpdate } from '../../../schema/member';
import { memberColumns, memberTable } from '../../entity/member';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class MemberStorage extends CrudEntityFactory({
  entity: Member,
  create: MemberCreate,
  update: MemberUpdate,
  delete: MemberLink,
}) {
  protected readonly table = memberTable;
  protected readonly columns = memberColumns;
  protected readonly schema = Member;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
