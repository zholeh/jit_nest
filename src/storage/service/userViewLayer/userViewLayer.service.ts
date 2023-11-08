import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { FindAllOptions } from '../../../helper/types';
import { UserViewLayerCreateType, UserViewLayerLinkType, UserViewLayerType } from '../../../schema';
import { UserViewLayerStorage } from './userViewLayer.storage';

@Injectable()
export class UserViewLayerService {
  private storage: UserViewLayerStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new UserViewLayerStorage(this.knex);
  }

  async findAll(input: FindAllOptions<UserViewLayerType>) {
    return this.storage.findAll(input);
  }

  async upsert(link: UserViewLayerLinkType, input: UserViewLayerCreateType[]) {
    return this.storage.upsert(link, input);
  }

  async delete(input: UserViewLayerLinkType) {
    return this.storage.delete(input);
  }
}
