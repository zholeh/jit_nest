import { Knex } from 'nestjs-knex';
import { MemberNotice, MemberNoticeCreate, MemberNoticeLink, MemberNoticeUpdate } from '../../../schema/memberNotice';
import { memberNoticeColumns, memberNoticeTable } from '../../entity/memberNotice';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class MemberNoticeStorage extends CrudEntityFactory({
  entity: MemberNotice,
  create: MemberNoticeCreate,
  update: MemberNoticeUpdate,
  delete: MemberNoticeLink,
}) {
  protected readonly table = memberNoticeTable;
  protected readonly columns = memberNoticeColumns;
  protected readonly schema = MemberNotice;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
