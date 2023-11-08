import { NotFoundGqlError } from './notFoundError';
import { UnprocessableEntityGqlError } from './unprocessableEntity';

export const GqlExceptions = {
  NotFound: NotFoundGqlError,
  UnprocessableEntity: UnprocessableEntityGqlError,
};

export { GqlError } from './serviceError';
