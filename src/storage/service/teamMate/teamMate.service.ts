import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { TeamMateStorage } from './teamMate.storage';
import { TeamMateCreateType, TeamMateLinkType, TeamMateType, TeamMateUpdateType } from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class TeamMateService {
  private storage: TeamMateStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new TeamMateStorage(this.knex);
  }

  async findAll(input: FindAllOptions<TeamMateType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<TeamMateType>) {
    return this.storage.findOne(input);
  }
  async create(input: TeamMateCreateType) {
    return this.storage.create(input);
  }

  async update(input: TeamMateUpdateType) {
    return this.storage.update(input);
  }

  async delete(input: TeamMateLinkType) {
    return this.storage.delete(input);
  }
}
