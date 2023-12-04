import { Knex } from 'nestjs-knex';
import { Channel, ChannelCreate, ChannelLink, ChannelUpdate } from '../../../schema';
import { channelEntity } from '../../entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class ChannelStorage extends CrudEntityFactory({
  entity: Channel,
  create: ChannelCreate,
  update: ChannelUpdate,
  delete: ChannelLink,
}) {
  protected dbEntity = channelEntity;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
