import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const cli = yargs(hideBin(process.argv))
    .scriptName('dbfarm')
    .command('plant', 'Plant a new environment', (y) => {
        return y.option('schema', {});
    })
    .command('nuke', 'Cleanup your environment (Remove database volumes)')
    .help()
    .alias('help', 'h');
