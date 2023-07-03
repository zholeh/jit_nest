import { Knex } from 'nestjs-knex';
import { Message, MessageCreate, MessageLink, MessageUpdate } from '../../../schema/message';
import { messageColumns, messageTable } from '../../entity/message';
import { crudEntityFactory } from '../crud/entity/crud.entity';

export class MessageStorage extends crudEntityFactory({
  entity: Message,
  create: MessageCreate,
  update: MessageUpdate,
  delete: MessageLink,
}) {
  protected readonly table = messageTable;
  protected readonly columns = messageColumns;
  protected readonly schema = Message;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
