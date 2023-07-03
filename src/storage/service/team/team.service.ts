import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { TeamStorage } from './team.storage';
import { TeamCreateType, TeamLinkType, TeamType, TeamUpdateType } from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class TeamService {
  private storage: TeamStorage;
  constructor(@InjectKnex() private knex: Knex) {
    this.storage = new TeamStorage(knex);
  }

  async findAll(input: FindAllOptions<TeamType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<TeamType>) {
    return this.storage.findOne(input);
  }
  async create(input: TeamCreateType) {
    return this.storage.create(input);
  }

  async update(input: TeamUpdateType) {
    return this.storage.update(input);
  }

  async delete(input: TeamLinkType) {
    return this.storage.delete(input);
  }
}
