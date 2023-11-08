import { Knex } from 'nestjs-knex';
import { Supply, SupplyCreate, SupplyLink, SupplyUpdate } from '../../../schema';
import { supplyColumns, supplyTable } from '../../entity/supply.entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class SupplyStorage extends CrudEntityFactory({
  entity: Supply,
  create: SupplyCreate,
  update: SupplyUpdate,
  delete: SupplyLink,
}) {
  protected readonly table = supplyTable;
  protected readonly columns = supplyColumns;
  protected readonly schema = Supply;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
