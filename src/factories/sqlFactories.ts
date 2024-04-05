import type { DBTableSchema, DBValue } from '../common/types';

const escapeValue = (value: string): string => {
    return value.replace(/'/g, '');
};

const mapSQLValue = <T, TKey extends keyof T>(record: T, key: TKey): DBValue => {
    const type = typeof record[key];

    if (record[key] === null || record[key] === undefined) return 'NULL';
    if (type === 'string') return `'${escapeValue(record[key] as string)}'`;
    if (type === 'boolean') return `${record[key] ? 'true' : 'false'}`;
    if (type === 'number') return `${record[key]}`;

    throw new Error('Cannot convert record value to SQL value');
};

export const dropTableSQLStatement = (schema: DBTableSchema): string => {
    return `DROP TABLE IF EXISTS "${schema.name}";`;
};

export const createTableSQLStatement = (schema: DBTableSchema): string => {
    const attributes = schema.attributes.map((a) => `\t"${a.name}" ${a.sql}`).join(',\n');
    const constraints  = schema.constraints?.map((c) => `\t${c}`).join(',\n');

    return `CREATE TABLE IF NOT EXISTS "${schema.name}" (\n${attributes}${constraints ? `,\n${constraints}` : ''}\n);`;
};

export const createInsertTableSQLStatement = (schema: DBTableSchema, record: Record<string, DBValue>): string => {
    const keys = Object.keys(record);
    const vals = keys.map((k) => mapSQLValue(record, k));

    return `INSERT INTO "${schema.name}" (${keys.join(', ')}) VALUES (${vals.join(', ')});`;
};
