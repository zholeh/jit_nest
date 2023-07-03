import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { UserStorage } from './user.storage';
import { UserCreateType, UserLinkType, UserType, UserUpdateType } from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class UserService {
  private storage: UserStorage;
  constructor(@InjectKnex() private knex: Knex) {
    this.storage = new UserStorage(knex);
  }

  async findAll(input: FindAllOptions<UserType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<UserType>) {
    return this.storage.findOne(input);
  }
  async create(input: UserCreateType) {
    return this.storage.create(input);
  }

  async update(input: UserUpdateType) {
    return this.storage.update(input);
  }

  async delete(input: UserLinkType) {
    return this.storage.delete(input);
  }
}
