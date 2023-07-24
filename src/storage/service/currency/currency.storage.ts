import { Knex } from 'nestjs-knex';
import { Currency, CurrencyCreate, CurrencyLink, CurrencyUpdate } from '../../../schema/currency';
import { currencyColumns, currencyTable } from '../../entity/currency.entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class CurrencyStorage extends CrudEntityFactory({
  entity: Currency,
  create: CurrencyCreate,
  update: CurrencyUpdate,
  delete: CurrencyLink,
}) {
  protected readonly table = currencyTable;
  protected readonly columns = currencyColumns;
  protected readonly schema = Currency;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
