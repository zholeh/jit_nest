import { DictionaryUnknown } from './dictionary';
import { Filter } from './filter';
import { Order } from './order';
import { Pagination } from './pagination';

export type EntityFields<T> = { [P in keyof T]?: T[P] extends DictionaryUnknown ? EntityFields<T[P]> : true };

export type FindAllOptions<Entity extends DictionaryUnknown, Fields extends Entity = Entity> = FindOneOptions<
  Entity,
  Fields
> & {
  orders?: Order<Entity>[];
  pagination?: Pagination<Entity>;
};

export type FindOneOptions<Entity extends DictionaryUnknown, Fields extends Entity = Entity> = {
  fields?: EntityFields<Fields>;
  filters?: Filter<Entity>[];
  deleted?: boolean;
};

export type FindReturn<Entity extends DictionaryUnknown> = FindAllOptions<Entity>['fields'] extends undefined
  ? Entity
  : Partial<Entity>;
