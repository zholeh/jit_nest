import { configuration } from '../configuration';

const {
  secrets: {
    db: { db, host, password, port, user },
  },
} = configuration;

export function connection(): string {
  return `postgresql://${user}:${password}@${host}:${port}/${db}`;
}
