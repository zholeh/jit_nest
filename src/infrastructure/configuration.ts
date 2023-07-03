import * as config from 'config';
import { z } from 'zod';

const application = z.object({
  port: z.number().positive(),
});
const transport = z.object({
  target: z.string().nonempty(),
});
const logger = z.object({
  level: z.string().nonempty(),
  transport: transport.optional(),
});
const gql = z.object({
  playground: z.boolean(),
});
const params = z.object({
  application,
  logger,
  gql,
});

const db = z.object({
  host: z.string().nonempty(),
  port: z.number().positive(),
  db: z.string().nonempty(),
  user: z.string().nonempty(),
  password: z.string().nonempty(),
  logging: z.boolean().optional(),
});
const secrets = z.object({
  db,
});

const schema = z.object({
  params,
  secrets,
});

export const configuration = schema.parse(config);
