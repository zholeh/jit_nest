type BooleanOperator = {
  readonly eq: boolean;
};

type DateOperator = {
  readonly eq?: Date | null;
  readonly notEq?: Date | null;
  readonly lt?: Date;
  readonly lte?: Date;
  readonly gt?: Date;
  readonly gte?: Date;
  readonly between?: DateRange;
  readonly notBetween?: DateRange;
  readonly isNull?: boolean;
  readonly isNotNull?: boolean;
};

type NumberOperator = {
  readonly eq?: number | null;
  readonly notEq?: number | null;
  readonly lt?: number;
  readonly lte?: number;
  readonly gt?: number;
  readonly gte?: number;
  readonly in?: number[];
  readonly notIn?: number[];
  readonly between?: NumberRange;
  readonly notBetween?: NumberRange;
  readonly isNull?: boolean;
  readonly isNotNull?: boolean;
};

type StringOperator = {
  readonly eq?: string | null;
  readonly notEq?: string | null;
  readonly contains?: string;
  readonly notContains?: string;
  readonly startsWith?: string;
  readonly notStartsWith?: string;
  readonly endsWith?: string;
  readonly notEndsWith?: string;
  readonly in?: string[];
  readonly notIn?: string[];
  readonly isNull?: boolean;
  readonly isNotNull?: boolean;
};

type DateRange = {
  readonly start: Date;
  readonly end: Date;
};

type NumberRange = {
  readonly start: number;
  readonly end: number;
};

type FilterEntity<Entity> = {
  readonly [P in keyof Entity]?: Entity[P] extends string
    ? StringOperator
    : Entity[P] extends boolean
    ? BooleanOperator
    : Entity[P] extends Date
    ? DateOperator
    : Entity[P] extends number
    ? NumberOperator
    : never;
};

type FilterOr<Entity> = {
  or: {
    readonly [P in keyof Entity]?: Entity[P] extends string
      ? StringOperator
      : Entity[P] extends boolean
      ? BooleanOperator
      : Entity[P] extends Date
      ? DateOperator
      : Entity[P] extends number
      ? NumberOperator
      : never;
  }[];
};

export type Operator = BooleanOperator | DateOperator | NumberOperator | StringOperator;

export type Filter<Entity> = FilterEntity<Entity> & FilterOr<Entity>;
