import { logger } from '../common/logger';
import { config } from '../common/config';
import { removeDockerContainer } from '../modules/docker';
import { removeFolderIfExists } from '../modules/fs';


/**
 * Cleans up database volumes
 */
export const nuke = async (): Promise<void> => {
    logger.info('Nuke process started');

    await removeDockerContainer(config.container);
    await removeFolderIfExists(config.paths.postgresVolume);

    logger.success('Nuke process successfully finished');
};
