import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';
import { ChannelCreateType, ChannelLinkType, ChannelType, ChannelUpdateType } from '../../../schema';
import { ChannelStorage } from './channel.storage';

@Injectable()
export class ChannelService {
  private storage: ChannelStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new ChannelStorage(this.knex);
  }

  async findAll(input: FindAllOptions<ChannelType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<ChannelType>) {
    return this.storage.findOne(input);
  }
  async create(input: ChannelCreateType) {
    return this.storage.create(input);
  }

  async update(input: ChannelUpdateType) {
    return this.storage.update(input);
  }

  async delete(input: ChannelLinkType) {
    return this.storage.delete(input);
  }
}
