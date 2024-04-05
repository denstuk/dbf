import { Pool } from 'pg';
import { config } from '../../common/config';

export const createDbConnection = () => new Pool({
    user: config.database.user,
    host: config.database.host,
    database: config.database.name,
    password: config.database.pass,
    port: config.database.port,
});
