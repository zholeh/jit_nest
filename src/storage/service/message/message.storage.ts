import { Knex } from 'nestjs-knex';
import { Message, MessageCreate, MessageLink, MessageUpdate } from '../../../schema';
import { messageEntity } from '../../entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class MessageStorage extends CrudEntityFactory({
  entity: Message,
  create: MessageCreate,
  update: MessageUpdate,
  delete: MessageLink,
}) {
  protected readonly dbEntity = messageEntity;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
