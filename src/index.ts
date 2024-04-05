import { cli } from './cli';
import { schemaCommand } from './command/schema';
import { logger } from './common/logger';

process.on('uncaughtException', (error: unknown) => {
    logger.error(error);
});

const main = async (): Promise<void> => {
    const argv = cli.parse();

    logger.success(JSON.stringify(argv));

    // await schemaCommand();
};

main().catch((error) => {
    logger.error(error);
    process.exitCode = 1;
});
