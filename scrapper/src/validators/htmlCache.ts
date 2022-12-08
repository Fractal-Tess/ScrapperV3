import { z } from 'zod';

export const html_cache_validator = z.object({
  id: z.string(),
  url: z.string().url(),
  html: z.string(),

  collectionId: z.string(),
  collectionName: z.string(),
  created: z.string().transform(Date),
  updated: z.string().transform(Date),
  expand: z.object({}),
});

export type HtmlCacheCollection = z.infer<typeof html_cache_validator>;
