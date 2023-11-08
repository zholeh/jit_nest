import { Logger } from '@nestjs/common';
import * as config from 'config';
import { z } from 'zod';

const log = new Logger('Configuration');

const application = z.object({
  port: z.number().positive(),
  origin: z.string().default('*'),
  host: z.string().default('127.0.0.1'),
});
const transport = z.object({
  target: z.string().min(1),
});
const logger = z.object({
  level: z.string().min(1),
  transport: transport.optional(),
  autoLogging: z.boolean().default(false),
});
const gql = z.object({
  playground: z.boolean(),
  path: z.string().default('gql'),
});
const openApi = z
  .object({
    path: z.string().default('api/v1'),
  })
  .default({});
const params = z.object({
  application,
  logger,
  gql,
  openApi,
});

const db = z.object({
  host: z.string().min(1),
  port: z.number().positive(),
  db: z.string().min(1),
  user: z.string().min(1),
  password: z.string().min(1),
  logging: z.boolean().optional(),
  debug: z.boolean().optional(),
});
const secrets = z.object({
  db,
});

const schema = z.object({
  params,
  secrets,
});

const parsed = schema.safeParse(config);

if (!parsed.success) {
  log.error(parsed.error);
  throw new Error('Cannot parse initial server parameters to start service');
}
export const configuration = parsed.data;
