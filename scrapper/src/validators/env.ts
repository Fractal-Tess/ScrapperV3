import { z } from 'zod';

export const envValidator = z.object({
  // SURREALDB_URL: z.string().url(),
  // SURREALDB_NAMESPACE: z.string(),
  // SURREALDB_DATABASE: z.string(),

  // SURREALDB_USERNAME: z.string(),
  // SURREALDB_PASSWORD: z.string(),

  POCKETBASE_URL: z.string().url(),
  POCKETBASE_EMAIL: z.string(),
  POCKETBASE_PASSWORD: z.string(),

  CONSUMET_URL: z.string().url(),

  GOGOANIME_URL: z.string().url(),

  MANGAKAKALOT_URL: z.string().url(),
  MANGANATO_URL: z.string().url(),
  CHAPMANGANATO_URL: z.string().url(),

  LATEST_SCRAPE_INTERVAL: z.string().regex(/^\d+$/).transform(Number),
  INDEX: z.enum(['true', 'false']),
  LOG_LEVEL: z.enum(['DEBUG', 'INFO', 'ERROR', 'CRITICAL']),
  NODE_ENV: z.enum(['development', 'production']),
  WEBUI_PORT: z.string().regex(/^\d+$/).transform(Number),
});

export type EnvVars = z.infer<typeof envValidator>;
