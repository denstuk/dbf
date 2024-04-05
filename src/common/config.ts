import * as path from 'node:path';

export const config = {
    schemaPath: path.join(__dirname, '../../schema.json'),
    database: {
        user: 'admin',
        pass: 'admin',
        host: 'localhost',
        port: 5432,
        name: 'x1'
    }
} as const;