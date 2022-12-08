import { load } from 'cheerio';
import { getHTML, createHTML } from './models/htmlCache.js';
import { getEnv } from './config.js';
import { Logger } from './logger.js';
import { Resource } from './types/index.js';

const useCache = getEnv('NODE_ENV') === 'development';

export const logger = new Logger({
  kind: 'utils',
  type: 'html',
});

/**
 *
 * @param {url} URL to fetch for cheerio
 * @returns {CheerioAPI | never } cheerio object, or **throws**
 */
export const urlToCheery = async (url: URL) => {
  if (!useCache) {
    const html = await urlToText(url); //throws
    const $ = load(html);
    return $;
  }

  try {
    const { html } = await getHTML(url);
    const $ = load(html);
    return $;
  } catch (error) {
    const html = await urlToText(url); //throws
    await createHTML(url, html);
    const $ = load(html);
    return $;
  }
};

export const urlToText = async (url: URL): Promise<string> => {
  for (let i = 1; i <= 5; i++) {
    try {
      const res = await fetch(url);
      return await res.text();
    } catch (error) {
      logger.logger.error(`Failed to fetch html for ${url} for ${i}nth time`);
    }
  }
  throw new Error(`Unable to fetch html for url ${url}`);
};

export const mangakakalotUrlToId = (resource: Resource) => {
  return resource.url.href.split('/')[3];
};
