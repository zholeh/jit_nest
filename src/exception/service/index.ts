import { NotFoundServiceError } from './notFoundError';
import { UnprocessableEntityServiceError } from './unprocessableEntity';

export const ServiceExceptions = {
  NotFound: NotFoundServiceError,
  UnprocessableEntity: UnprocessableEntityServiceError,
};

export { ServiceError } from './serviceError';
