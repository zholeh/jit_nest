import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { MessageStorage } from './message.storage';
import { MessageCreateType, MessageLinkType, MessageType, MessageUpdateType } from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class MessageService {
  private storage: MessageStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new MessageStorage(this.knex);
  }

  async findAll(input: FindAllOptions<MessageType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<MessageType>) {
    return this.storage.findOne(input);
  }
  async create(input: MessageCreateType) {
    return this.storage.create(input);
  }

  async update(input: MessageUpdateType) {
    return this.storage.update(input);
  }

  async delete(input: MessageLinkType) {
    return this.storage.delete(input);
  }
}
