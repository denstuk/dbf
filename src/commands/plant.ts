import path from 'node:path';
import fs from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { sleep } from '../common/utils';
import { config } from '../common/config';
import { LB1, LB2 } from '../common/constants';
import { createRecordByAttributes } from '../factories/createRecordByAttribute';
import { createDbConnection } from '../modules/database/createDbConnection';
import { logger } from '../common/logger';
import { createInsertTableSQLStatement, createTableSQLStatement, dropTableSQLStatement } from '../factories/sqlFactories';
import { runPostgresContainer, verifyDockerInstalled, verifyDockerRunning } from '../modules/docker';
import { readJSON, recreateFolder } from '../modules/fs';
import type { DBSchema } from '../common/types';

/**
 * Generates database by `schema.json` file
 */
export const plant = async (): Promise<void> => {
    await verifyDockerInstalled();
    await verifyDockerRunning();
    await runPostgresContainer();

    const schema = await readJSON<DBSchema>(config.paths.defaultSchema);

    const temporaryFolder = path.join(__dirname, '../../tmp');
    await recreateFolder(temporaryFolder);
    logger.success('Temporary folder preparation: DONE');

    const sqlFile = path.join(temporaryFolder, './schema.sql');

    const extensions = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";';
    const dropStatements = schema.slice().reverse().map((t) => dropTableSQLStatement(t)).join(LB1);
    const createStatements = schema.map((t) => createTableSQLStatement(t)).join(LB1);
    const text = extensions + LB2 + dropStatements + LB2 + createStatements + LB2;
    await fs.writeFile(sqlFile, text);
    logger.success('Schema generation: DONE');

    const insertPromise = new Promise<void>((resolve) => {
        const wStream = createWriteStream(sqlFile, { flags: 'a' });
        for (const table of schema) {
            for (let i = 0; i < table.amount; i++) {
                const record = createRecordByAttributes(table.attributes);
                wStream.write(createInsertTableSQLStatement(table, record) + '\n');
            }
            logger.success(`Insert "${table.name}" generation: 100%`);
        }
        wStream.end(() => resolve());
    });
    await insertPromise;
    logger.success('Insert generation: DONE');

    const sleepMs = 5000;
    await sleep(sleepMs); // TODO:Fix simple workaround to wait docker container start

    logger.success('Postgres container creation: DONE');

    const connection = createDbConnection();
    logger.success('Establishing database connection: DONE');

    const file = await fs.readFile(sqlFile); // TODO:Fix bad idea but quite easy to implement
    console.log(file.length);
    const query = (file).toString('utf8');
    await connection.query(query);
    logger.success('Script loading: DONE');

    await connection.end();
    logger.success('Database connection: CLOSED');
};
