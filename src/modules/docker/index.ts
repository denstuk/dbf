import * as cp from 'node:child_process';
import * as util from 'node:util';
import * as path from 'node:path';
import { DockerNotInstalledException, DockerNotRunningException } from '../../common/errors';
import { config } from '../../common/config';
import type { DockerContainer } from './types';

const execAsync = util.promisify(cp.exec);

export const verifyDockerInstalled = async (): Promise<void> => {
  try {
    await execAsync('docker --version');
  } catch {
    throw new DockerNotInstalledException();
  }
};

export const verifyDockerRunning = async (): Promise<void> => {
  try {
    await execAsync('docker info');
  } catch {
    throw new DockerNotRunningException();
  }
};

export const runPostgresContainer = async (): Promise<void> => {
  const name = `--name ${config.container}`;
  const user = `-e POSTGRES_USER=${config.database.user}`;
  const password = `-e POSTGRES_PASSWORD=${config.database.pass}`;
  const volumes = `-v ${path.join(config.paths.root, 'docker/volumes/postgres')}:/var/lib/postgresql/data`;
  const port = `-p 5432:${config.database.port}`;
  const database = `-e POSTGRES_DB=${config.database.name}`;
  await execAsync(`docker run ${name} ${user} ${password} ${database} ${volumes} ${port} -d postgres`);
};

export const getArrayOfRunningContainers = async (): Promise<DockerContainer[]> => {
  const { stdout } = await execAsync('docker ps --format \'{"id":"{{ .ID }}", "image": "{{ .Image }}", "name":"{{ .Names }}"}\'');
  return stdout
    .split('\n')
    .filter((l) => !!l)
    .map((line) => JSON.parse(line) as DockerContainer);
};

export const removeDockerContainer = async (name: string): Promise<void> => {
  await execAsync(`docker rm -f ${name}`);
};
