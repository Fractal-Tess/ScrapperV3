import { config } from 'dotenv';
import { envValidator } from './validators/env.js';
import type { EnvVars } from './types/index.js';

const envVars = envValidator.parse(config().parsed);

export const getEnv = <T extends keyof EnvVars>(env: T) =>
  envVars[env] as EnvVars[T];
