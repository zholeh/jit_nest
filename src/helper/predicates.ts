import { BRAND } from 'zod';
import { ServiceExceptions } from '../exception';
import { UnprocessableEntityServiceError } from '../exception/service/unprocessableEntity';

export function isString(value: unknown): value is string {
  return typeof value === 'string' ? true : false;
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean' ? true : false;
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' ? true : false;
}

export function isDate(value: unknown): value is Date {
  return typeof value === 'object' && value instanceof Date ? true : false;
}

export function isBetweenObject(value: unknown): value is { start: unknown; end: unknown } {
  if (typeof value === 'object') {
    if (Object.prototype.hasOwnProperty.call(value, 'start') && Object.prototype.hasOwnProperty.call(value, 'end')) {
      return true;
    }
  }
  return false;
}

export function isArray(value: unknown): value is unknown[] {
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return true;
    }
  }
  return false;
}

function isId<T extends string & BRAND<string>>(val: unknown): val is T {
  return typeof val === 'string' ? true : false;
}

export function coerceId<T extends string & BRAND<string>>(val: unknown): T {
  if (isId<T>(val)) return val;
  throw new ServiceExceptions.UnprocessableEntity(`Can't assert value ${val}`);
}

export function assertNever(arg: never, message: string): never {
  throw new UnprocessableEntityServiceError(`${message}: ${arg}`);
}
