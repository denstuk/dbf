import * as fs from 'fs';
import { UnableToReadFileException } from '../../common/errors';

export const readJSON = async <T>(path: string): Promise<T> => {
    try {
        const buffer = await fs.promises.readFile(path);
        return JSON.parse(buffer.toString('utf8'));
    } catch (error: unknown) {
        throw new UnableToReadFileException(`Unable to read JSON file: ${path}`);
    }
};

export const removeFolderIfExists = async (path: string): Promise<void> => {
    if (fs.existsSync(path)) {
        await fs.promises.rm(path, { recursive: true });
    }
};

export const recreateFolder = async (path: string): Promise<void> => {
    await removeFolderIfExists(path);
    await fs.promises.mkdir(path);
};
