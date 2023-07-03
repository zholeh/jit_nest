import { Knex } from 'nestjs-knex';
import { User, UserCreate, UserLink, UserUpdate } from '../../../schema/user';
import { userColumns, userTable } from '../../entity/user.entity';
import { crudEntityFactory } from '../crud/entity/crud.entity';

export class UserStorage extends crudEntityFactory({
  entity: User,
  create: UserCreate,
  update: UserUpdate,
  delete: UserLink,
}) {
  protected readonly table = userTable;
  protected readonly columns = userColumns;
  protected readonly schema = User;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
