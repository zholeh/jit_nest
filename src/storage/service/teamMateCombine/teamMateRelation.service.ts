import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { TeamMateRelationStorage } from './teamMateRelation.storage';
import { TeamCombineType } from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';

@Injectable()
export class TeamMateRelationService {
  private storage: TeamMateRelationStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new TeamMateRelationStorage(this.knex);
  }

  async findAll(input: FindAllOptions<TeamCombineType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<TeamCombineType>) {
    return this.storage.findOne(input);
  }
}
