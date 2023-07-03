type FieldsMap<Entity> = {
  readonly column: keyof Entity extends string ? keyof Entity : never;
  readonly order?: OrderDirection;
};

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export type Order<Entity> = FieldsMap<Entity>;
