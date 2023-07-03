import { DictionaryUnknown } from './dictionary';
import { OrderDirection } from './order';

type StartFromValue<Value> = {
  value: Value;
  order: OrderDirection;
};

type StartFrom<Entity extends DictionaryUnknown> = {
  [P in keyof Entity]?: StartFromValue<Entity[P]>;
};

export type Cursor<Entity extends DictionaryUnknown> = {
  startFrom: StartFrom<Entity>;
  id: unknown;
};

export type Pagination<Entity extends DictionaryUnknown> = {
  limit: number;
  offset?: number;
  cursor?: Cursor<Entity>;
};
