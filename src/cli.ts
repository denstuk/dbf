import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const cli = yargs(hideBin(process.argv))
    .command('plant', 'Plant a new environment', (y) => {
        return y.option('schema', {});
    })
    .help()
    .alias('help', 'h');
