import { Knex } from 'nestjs-knex';
import { UserViewLayer, UserViewLayerCreate, UserViewLayerType } from '../../../schema';
import { userLayerColumns, userLayerTable } from '../../entity/userViewLayer.entity';
import { CrudValueObjectFactory } from '../crud/value/crud.value';
import { Logger } from '@nestjs/common';

export class UserViewLayerStorage extends CrudValueObjectFactory({
  valueObject: UserViewLayer,
  create: UserViewLayerCreate,
}) {
  protected readonly keyFields: [keyof UserViewLayerType, ...(keyof UserViewLayerType)[]] = ['userId', 'layer'];
  protected readonly table = userLayerTable;
  protected readonly columns = userLayerColumns;
  protected readonly schema = UserViewLayer;
  protected readonly knex;
  protected readonly logger = new Logger('User view layer storage');

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
