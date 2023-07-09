import { Knex } from 'nestjs-knex';
import { Supply, SupplyCreate, SupplyLink, SupplyUpdate } from '../../../schema/supply';
import { supplyColumns, supplyTable } from '../../entity/supply.entity';
import { crudEntityFactory } from '../crud/entity/crud.entity';

export class SupplyStorage extends crudEntityFactory({
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
