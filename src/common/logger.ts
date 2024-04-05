import chalk from 'chalk';

export const logger = {
    success: (...messages: unknown[]) => {
        console.log(chalk.green(...messages));
    },
    error: (...messages: unknown[]): void => {
        console.log(chalk.red(...messages));
    },
};
