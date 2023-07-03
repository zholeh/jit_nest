export const datePreprocessor = (arg: unknown): Date | unknown => {
  return typeof arg === 'string' || arg instanceof Date ? new Date(arg) : arg;
};
