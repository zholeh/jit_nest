import { Knex } from 'nestjs-knex';
import { SupplyCategory, SupplyCategoryCreate, SupplyCategoryLink, SupplyCategoryUpdate } from '../../../schema';
import { supplyCategoryEntity } from '../../entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class SupplyCategoryStorage extends CrudEntityFactory({
  entity: SupplyCategory,
  create: SupplyCategoryCreate,
  update: SupplyCategoryUpdate,
  delete: SupplyCategoryLink,
}) {
  protected readonly dbEntity = supplyCategoryEntity;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
