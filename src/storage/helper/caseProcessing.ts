import { DictionaryString, DictionaryUnknown } from '../../helper/types';

function toSnakeCase(input: string): string {
  input = input.trim();
  input = input.replace(/([A-Z])/g, (match) => '_' + match.toLowerCase());
  input = input.replace(/_+/g, '_');
  input = input.replace(/[^a-zA-Z0-9_]/g, '_');
  input = input.replace(/_+/g, '_');
  input = input.replace(/^_+|_+$/g, '');

  return input;
}

export function objectToSnakeCaseKeyMap<T extends DictionaryUnknown>(
  instance: T,
  exception: DictionaryString = {},
): Map<keyof T, string> {
  const map = new Map<keyof T, string>();

  for (const key in instance) {
    if (Object.prototype.hasOwnProperty.call(instance, key)) {
      if (Object.prototype.hasOwnProperty.call(exception, key)) {
        map.set(key, exception?.[key] || '');
      } else {
        map.set(key, toSnakeCase(key));
      }
    }
  }

  return map;
}

export function objectToSnakeCaseValueMap<T extends DictionaryUnknown>(
  instance: T,
  exception: DictionaryString = {},
): Map<string, keyof T> {
  const map = new Map<string, keyof T>();

  for (const key in instance) {
    if (Object.prototype.hasOwnProperty.call(instance, key)) {
      if (Object.prototype.hasOwnProperty.call(exception, key)) {
        map.set(key, exception?.[key] || '');
      } else {
        map.set(toSnakeCase(key), key);
      }
    }
  }

  return map;
}
