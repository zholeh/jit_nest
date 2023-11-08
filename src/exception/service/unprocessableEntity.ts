import { ServiceError } from './serviceError';

export class UnprocessableEntityServiceError extends ServiceError {
  constructor(message: string) {
    super(message);
  }
}
