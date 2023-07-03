import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { MemberStorage } from './member.storage';
import { MemberCreateType, MemberLinkType, MemberType, MemberUpdateType } from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class MemberService {
  private storage: MemberStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new MemberStorage(this.knex);
  }

  async findAll(input: FindAllOptions<MemberType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<MemberType>) {
    return this.storage.findOne(input);
  }
  async create(input: MemberCreateType) {
    return this.storage.create(input);
  }

  async update(input: MemberUpdateType) {
    return this.storage.update(input);
  }

  async delete(input: MemberLinkType) {
    return this.storage.delete(input);
  }
}
