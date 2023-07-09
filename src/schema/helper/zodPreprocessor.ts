export const datePreprocessor = (arg: unknown): Date | unknown => {
  return typeof arg === 'string' || arg instanceof Date ? new Date(arg) : arg;
};

export const onlyTimeTransformer = (arg: Date): Date => {
  const hours = arg.getHours();
  const minutes = arg.getMinutes();
  const seconds = arg.getSeconds();
  const date = new Date(0);
  date.setHours(hours, minutes, seconds);

  return date;
};
