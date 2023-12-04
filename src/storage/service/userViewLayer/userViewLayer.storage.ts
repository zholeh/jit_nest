import { Knex } from 'nestjs-knex';
import { UserViewLayer, UserViewLayerCreate, UserViewLayerType } from '../../../schema';
import { CrudValueObjectFactory } from '../crud/value/crud.value';
import { Logger } from '@nestjs/common';
import { userLayerEntity } from '../../entity';

export class UserViewLayerStorage extends CrudValueObjectFactory({
  valueObject: UserViewLayer,
  create: UserViewLayerCreate,
}) {
  readonly dbEntity = userLayerEntity;
  protected readonly keyFields: [keyof UserViewLayerType, ...(keyof UserViewLayerType)[]] = ['userId', 'layer'];
  protected readonly knex;
  protected readonly logger = new Logger('User view layer storage');

  constructor(knex: Knex) {
    super(knex);
    this.knex = knex;
  }
}
