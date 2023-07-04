import * as config from 'config';
import { z } from 'zod';

const application = z.object({
  port: z.number().positive(),
  origin: z.string().default('*'),
  address: z.string().default('0.0.0.0'),
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

const parsed = schema.safeParse(config);

if (!parsed.success) throw new Error('Cannot parse initial server parameters to start service');
export const configuration = parsed.data;
