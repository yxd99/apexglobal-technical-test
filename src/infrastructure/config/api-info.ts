import { envs } from './envs';

export const TITLE = 'Apex Global Technical Test';
export const DESCRIPTION = `Apex Global Technical Test`;
export const VERSION = 'v1';
export const PREFIX = 'api';
export const { PORT } = envs;
export const SERVERS = [
  {
    host: `https://apexglobal-technical-test.onrender.com/api`,
    description: 'Dev',
  },
];
