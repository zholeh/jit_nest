import { Knex } from 'nestjs-knex';
import { User, UserCreate, UserLink, UserUpdate } from '../../../schema';
import { userEntity } from '../../entity';
import { CrudEntityFactory } from '../crud/entity/crud.entity';

export class UserStorage extends CrudEntityFactory({
  entity: User,
  create: UserCreate,
  update: UserUpdate,
  delete: UserLink,
}) {
  protected readonly dbEntity = userEntity;
  protected readonly knex;

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
