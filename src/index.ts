#!/usr/bin/env node

import { cli } from './cli';
import { logger } from './common/logger';
import * as commands from './commands';

process.on('uncaughtException', (error: unknown) => {
    logger.error(error);
});

const main = async (): Promise<void> => {
    const argv = await cli.parse();

    if (argv._.includes('plant')) {
        await commands.plant();
        return;
    }

    if (argv._.includes('nuke')) {
        await commands.nuke();
        return;
    }

    throw new Error('No command specified');
};

main().catch((error: unknown) => {
    logger.error((error as Error).stack);
    process.exitCode = 1;
});
