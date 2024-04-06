import * as path from 'node:path';

export const config = {
  paths: {
    root: path.join(__dirname, '../../'),
    defaultSchema: path.join(__dirname, '../../schema.json'),
    postgresVolume: path.join(__dirname, '../../docker/volumes/postgres'),
  },
  container: 'dbfarm-database',
  database: {
    user: 'admin',
    pass: 'admin',
    host: 'localhost',
    port: 5432,
    name: 'x1',
  },
} as const;
