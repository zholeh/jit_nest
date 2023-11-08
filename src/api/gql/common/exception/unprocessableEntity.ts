import { GqlError } from './serviceError';

export class UnprocessableEntityGqlError extends GqlError {
  constructor(message: string) {
    super(message);
  }
}
