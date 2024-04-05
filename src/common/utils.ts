import * as fs from 'node:fs';
import { Exception } from './errors';

export const readJSON = async <T>(path: string): Promise<T> => {
    try {
        const buffer = await fs.promises.readFile(path);
        return JSON.parse(buffer.toString('utf8'));
    } catch (error: unknown) {
        throw new Exception(`Unable to read JSON file: ${path}`);
    }
};

export const recreateFolder = async (path: string): Promise<void> => {
    if (fs.existsSync(path)) {
        await fs.promises.rmdir(path, { recursive: true });
    }
    await fs.promises.mkdir(path);
};
