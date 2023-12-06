import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { TeamMateRelationStorage } from './teamMateRelation.storage';
import { TeamRelationType } from '../../../schema';
import { FindAllOptions, FindOneOptions } from '../../../helper/types';
import { TeamMateRelationType } from '../../../schema/teamMateRelation';

@Injectable()
export class TeamMateRelationService {
  private storage: TeamMateRelationStorage;
  constructor(@InjectKnex() private readonly knex: Knex) {
    this.storage = new TeamMateRelationStorage(this.knex);
  }

  async findAll(input: FindAllOptions<TeamMateRelationType>) {
    return this.storage.findAll(input);
  }

  async findOne(input: FindOneOptions<TeamRelationType>) {
    return this.storage.findOne(input);
  }
}
