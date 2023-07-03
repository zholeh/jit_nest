import { GraphQLISODateTime } from '@nestjs/graphql';
import { GraphQLScalarType } from 'graphql';

export function prepareInputFromZodOptions(name: string) {
  return {
    zod: prepareModelFromZodOptions(name),
  };
}

export function prepareModelFromZodOptions(name: string) {
  return {
    getScalarTypeFor,
    name,
  };
}

function getScalarTypeFor(scalar: string): GraphQLScalarType | undefined {
  if (scalar.trim().toLowerCase() === 'date') return GraphQLISODateTime;
  return undefined;
}
