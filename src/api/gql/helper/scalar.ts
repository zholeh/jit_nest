import { GraphQLISODateTime } from '@nestjs/graphql';
import { GraphQLScalarType } from 'graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

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
  if (scalar.trim().toLowerCase() === 'record<string, any>') return GraphQLJSONObject;
  return undefined;
}
