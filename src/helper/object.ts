export type ObjectKeys<T extends object> = `${Exclude<keyof T, symbol>}`;
/**
 * https://github.com/sindresorhus/ts-extras/blob/main/source/object-keys.ts
 */
export const objectKeys = Object.keys as <Type extends object>(value: Type) => Array<ObjectKeys<Type>>;

/**
 * https://github.com/sindresorhus/ts-extras/blob/main/source/object-entries.ts
 */
export const objectEntries = Object.entries as <Type extends Record<PropertyKey, unknown>>(
  value: Type,
) => Array<[ObjectKeys<Type>, Type[ObjectKeys<Type>]]>;
