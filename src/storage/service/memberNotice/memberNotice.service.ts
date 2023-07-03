import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { MemberNoticeStorage } from './memberNotice.storage';
import {
  MemberNoticeCreateType,
  MemberNoticeLinkType,
  MemberNoticeType,
  MemberNoticeUpdateType,
} from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class MemberNoticeService {
  private storage: MemberNoticeStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new MemberNoticeStorage(this.knex);
  }

  async findAll(input: FindAllOptions<MemberNoticeType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<MemberNoticeType>) {
    return this.storage.findOne(input);
  }
  async create(input: MemberNoticeCreateType) {
    return this.storage.create(input);
  }

  async update(input: MemberNoticeUpdateType) {
    return this.storage.update(input);
  }

  async delete(input: MemberNoticeLinkType) {
    return this.storage.delete(input);
  }
}
