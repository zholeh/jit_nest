import { Knex } from 'nestjs-knex';
import { DatabaseEntity } from '../../../entity/entity.abstract';
import { EntitySchema } from './types';

export abstract class BaseEntityCrud<Entity extends EntitySchema> {
  protected abstract readonly dbEntity: DatabaseEntity<Entity>;

  protected abstract readonly knex: Knex;

  get builder() {
    return this.knex(this.dbEntity.table);
  }
}
