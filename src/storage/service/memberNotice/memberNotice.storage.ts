import { Knex } from 'nestjs-knex';
import { MemberNotice, MemberNoticeCreate, MemberNoticeLink, MemberNoticeUpdate } from '../../../schema';
import { memberNoticeEntity } from '../../entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class MemberNoticeStorage extends CrudEntityFactory({
  entity: MemberNotice,
  create: MemberNoticeCreate,
  update: MemberNoticeUpdate,
  delete: MemberNoticeLink,
}) {
  protected readonly dbEntity = memberNoticeEntity;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
