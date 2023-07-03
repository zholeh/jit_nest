import {
  ZodArray,
  ZodBoolean,
  ZodBranded,
  ZodDate,
  ZodEffects,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodRawShape,
  ZodString,
  ZodType,
  ZodTypeAny,
  object,
  z,
} from 'zod';
import {
  BooleanInput,
  DateInput,
  DateRangeInput,
  NumberInput,
  NumberRangeInput,
  StringInput,
} from '../../schema/filter';

type ZodTypes =
  | ZodType
  | ZodEffects<ZodTypeAny>
  | ZodOptional<ZodTypeAny>
  | ZodNullable<ZodTypeAny>
  | ZodBranded<ZodTypeAny, string>;

type InputTypes =
  | typeof NumberInput
  | typeof NumberRangeInput
  | typeof StringInput
  | typeof BooleanInput
  | typeof DateRangeInput
  | typeof DateInput;

function getFilterType(value: ZodTypes): ZodType {
  if (value instanceof ZodNumber) return NumberInput;
  if (value instanceof ZodString) return StringInput;
  if (value instanceof ZodDate) return DateInput;
  if (value instanceof ZodBoolean) return BooleanInput;

  // recursive
  if (value instanceof ZodEffects) return getFilterType(value.innerType());

  if (value instanceof ZodOptional || value instanceof ZodNullable || value instanceof ZodBranded) {
    const unwrapped = value.unwrap();
    return getFilterType(unwrapped);
  }

  throw new TypeError('Incorrect zod type');
}

type FilterFieldsType<Entity extends ZodObject<ZodRawShape>> = {
  [P in keyof z.infer<Entity>]: Entity[P] extends string
    ? typeof StringInput
    : Entity[P] extends boolean
    ? typeof BooleanInput
    : Entity[P] extends Date
    ? typeof DateInput
    : Entity[P] extends number
    ? typeof NumberInput
    : never;
};

type FilterOrType<Entity extends ZodObject<ZodRawShape>> = {
  or: ZodArray<
    ZodObject<{
      [P in keyof z.infer<Entity>]: Entity[P] extends string
        ? typeof StringInput
        : Entity[P] extends boolean
        ? typeof BooleanInput
        : Entity[P] extends Date
        ? typeof DateInput
        : Entity[P] extends number
        ? typeof NumberInput
        : never;
    }>
  >;
};
type FilterType<Entity extends ZodObject<ZodRawShape>> = ZodObject<FilterFieldsType<Entity> & FilterOrType<Entity>>;

export function buildFilterZodSchema<Entity extends ZodObject<ZodRawShape>>(
  zod: Entity,
  force?: Record<string, InputTypes>,
): FilterType<Entity> {
  const obj = Object.entries(zod.shape).reduce((acc, [key, value]) => {
    const zodType = force?.[key] || getFilterType(value);
    const property = object({
      [key]: zodType.optional(),
    });
    return acc.merge(property);
  }, object({}));

  obj.merge(object({ or: obj.array() }));

  const result = obj.merge(object({ or: obj.array().optional() }));
  return result as unknown as FilterType<Entity>;
}
