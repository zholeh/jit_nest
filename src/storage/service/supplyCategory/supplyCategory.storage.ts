import { Knex } from 'nestjs-knex';
import {
  SupplyCategory,
  SupplyCategoryCreate,
  SupplyCategoryLink,
  SupplyCategoryUpdate,
} from '../../../schema/supplyCategory';
import { supplyCategoryColumns, supplyCategoryTable } from '../../entity/supplyCategory.entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class SupplyCategoryStorage extends CrudEntityFactory({
  entity: SupplyCategory,
  create: SupplyCategoryCreate,
  update: SupplyCategoryUpdate,
  delete: SupplyCategoryLink,
}) {
  protected readonly table = supplyCategoryTable;
  protected readonly columns = supplyCategoryColumns;
  protected readonly schema = SupplyCategory;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
