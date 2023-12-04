import { Knex } from 'nestjs-knex';
import { Supply, SupplyCreate, SupplyLink, SupplyUpdate } from '../../../schema';
import { supplyEntity } from '../../entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class SupplyStorage extends CrudEntityFactory({
  entity: Supply,
  create: SupplyCreate,
  update: SupplyUpdate,
  delete: SupplyLink,
}) {
  protected readonly dbEntity = supplyEntity;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
