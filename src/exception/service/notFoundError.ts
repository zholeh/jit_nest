import { ServiceError } from './serviceError';

export class NotFoundServiceError extends ServiceError {
  constructor(message: string) {
    super(message);
  }
}
