export class UnprocessableEntityServiceError extends Error {
  constructor(message: string) {
    super(message);
  }
}
