import chalk from 'chalk';

export const logger = {
  info: (...messages: unknown[]): void => {
    console.log(`[${new Date().toISOString()}] `, ...messages);
  },
  success: (...messages: unknown[]): void => {
    console.log(chalk.green(`[${new Date().toISOString()}] `, ...messages));
  },
  error: (...messages: unknown[]): void => {
    console.log(chalk.red(`[${new Date().toISOString()}] `, ...messages));
  },
};
