import { Knex } from 'nestjs-knex';
import { Channel, ChannelCreate, ChannelLink, ChannelUpdate } from '../../../schema/channel';
import { channelColumns, channelTable } from '../../entity/channel.entity';
import { crudEntityFactory } from '../crud/entity/crud.entity';

export class ChannelStorage extends crudEntityFactory({
  entity: Channel,
  create: ChannelCreate,
  update: ChannelUpdate,
  delete: ChannelLink,
}) {
  protected readonly table = channelTable;
  protected readonly columns = channelColumns;
  protected readonly schema = Channel;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
