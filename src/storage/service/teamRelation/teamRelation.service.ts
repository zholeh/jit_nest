import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { TeamRelationStorage } from './teamRelation.storage';
import { TeamRelationType } from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class TeamRelationService {
  private storage: TeamRelationStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new TeamRelationStorage(this.knex);
  }

  async findAll(input: FindAllOptions<TeamRelationType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<TeamRelationType>) {
    return this.storage.findOne(input);
  }
}
