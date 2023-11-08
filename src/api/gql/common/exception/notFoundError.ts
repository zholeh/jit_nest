import { GqlError } from './serviceError';

export class NotFoundGqlError extends GqlError {
  constructor(message: string) {
    super(message);
  }
}
