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
  ZodNativeEnum,
  ZodRecord,
  ZodNever,
} from 'zod';
import { ExcludeNullish } from '../../helper/types/excludeNullish';
import {
  BooleanInput,
  DateInput,
  DateRangeInput,
  NumberInput,
  NumberRangeInput,
  StringInput,
  buildEnumInput,
  EnumInput,
} from '../filter';

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
  | typeof EnumInput
  | typeof BooleanInput
  | typeof DateRangeInput
  | typeof DateInput;

function getFilterType(value: ZodTypes): ZodType | undefined {
  if (value instanceof ZodNumber) return NumberInput;
  if (value instanceof ZodString) return StringInput;
  if (value instanceof ZodNativeEnum) return buildEnumInput(value);
  if (value instanceof ZodDate) return DateInput;
  if (value instanceof ZodBoolean) return BooleanInput;
  if (value instanceof ZodRecord) return undefined;

  // recursive
  if (value instanceof ZodEffects) return getFilterType(value.innerType());

  if (value instanceof ZodOptional || value instanceof ZodNullable || value instanceof ZodBranded) {
    const unwrapped = value.unwrap();
    return getFilterType(unwrapped);
  }

  throw new TypeError('Incorrect zod type');
}

type FilterFieldsType<Entity extends ZodObject<ZodRawShape>> = {
  [P in keyof z.infer<Entity>]-?: ExcludeNullish<z.infer<Entity>[P]> extends string
    ? typeof StringInput
    : ExcludeNullish<z.infer<Entity>[P]> extends Record<string, string>
    ? typeof EnumInput
    : ExcludeNullish<z.infer<Entity>[P]> extends boolean
    ? typeof BooleanInput
    : ExcludeNullish<z.infer<Entity>[P]> extends Date
    ? typeof DateInput
    : ExcludeNullish<z.infer<Entity>[P]> extends number
    ? typeof NumberInput
    : ZodNever;
};

type FilterOrType<Entity extends ZodObject<ZodRawShape>> = {
  or: ZodArray<
    ZodObject<{
      [P in keyof z.infer<Entity>]-?: ExcludeNullish<z.infer<Entity>[P]> extends string
        ? typeof StringInput
        : ExcludeNullish<z.infer<Entity>[P]> extends Record<string, string>
        ? typeof EnumInput
        : ExcludeNullish<z.infer<Entity>[P]> extends boolean
        ? typeof BooleanInput
        : ExcludeNullish<z.infer<Entity>[P]> extends Date
        ? typeof DateInput
        : ExcludeNullish<z.infer<Entity>[P]> extends number
        ? typeof NumberInput
        : ZodNever;
    }>
  >;
};
type FilterType<Entity extends ZodObject<ZodRawShape>> = ZodObject<FilterFieldsType<Entity> & FilterOrType<Entity>>;

export function buildFilterZodSchema<Entity extends ZodObject<ZodRawShape>>(
  zod: Entity,
  force?: Record<string, InputTypes>,
): FilterType<Entity> {
  const obj = Object.entries(zod.shape).reduce((acc, [key, value]) => {
    if (value instanceof ZodObject) {
      const filter = buildFilterZodSchema(value);
      const property = object({
        [key]: filter.optional(),
      });
      return acc.merge(property);
    } else {
      const zodType = force?.[key] || getFilterType(value);
      if (!zodType) return acc;
      const property = object({
        [key]: zodType.optional(),
      });
      return acc.merge(property);
    }
  }, object({}));

  obj.merge(object({ or: obj.array() }));

  const result = obj.merge(object({ or: obj.array().optional() }));
  return result as unknown as FilterType<Entity>;
}
