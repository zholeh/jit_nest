import { Knex } from 'nestjs-knex';
import { Currency, CurrencyCreate, CurrencyLink, CurrencyUpdate } from '../../../schema';
import { currencyEntity } from '../../entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class CurrencyStorage extends CrudEntityFactory({
  entity: Currency,
  create: CurrencyCreate,
  update: CurrencyUpdate,
  delete: CurrencyLink,
}) {
  protected readonly dbEntity = currencyEntity;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
