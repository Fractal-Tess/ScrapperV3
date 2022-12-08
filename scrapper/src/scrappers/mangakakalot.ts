import { createLogger, createTimer } from '../logger.js';
import { getEnv } from '../config.js';
import { urlToCheery } from '../utils.js';
import { mangakakalot_Id, Resource, MangaInfo } from '../types/index.js';

export const logger = createLogger({
  kind: 'scrapper',
  type: 'manga',
  name: 'mangakakalot',
});

export const index = async (page: number) => {
  if (page <= 0) {
    throw new Error('Page cannot be less than 1');
  }
  logger.info(`Indexing page ${page}`);

  const timer = createTimer();
  const url = new URL(
    `${getEnv('MANGANATO_URL')}/advanced_search?s=all&page=${page}`
  );

  const $ = await urlToCheery(url);
  const lastPage = $(
    'div.panel-page-number>div.group-page>a.page-blue.page-last'
  )
    .text()
    .replace('LAST(', '')
    .replace(')', '');

  if (page > Number.parseInt(lastPage)) {
    logger.info(
      `Indexer for page ${page} detected it is outside of list range`
    );
    throw new Error('No more content');
  }
  const result = $('div.panel-content-genres>div.content-genres-item');

  const mangas: Resource[] = [];

  result.each((_, element) => {
    const title = $(element).find('div.genres-item-info>h3>a').text().trim();
    const url = $(element).find('div.genres-item-info>h3>a').attr('href');

    if (!url || !title) {
      logger.error(`Unable to grab url/title for ${url}/${title}`);
      return;
    }

    try {
      const manga: Resource = {
        title,
        url: new URL(url),
      };

      mangas.push(manga);
    } catch (error) {
      logger.error(
        `Something went wrong when trying to convert url to URL ${title}/${url}`
      );
    }
  });

  logger.info(
    `${timer()} Indexer found ${mangas.length} mangas on page ${page}`
  );
  return mangas;
};

export const latest = async () => {
  logger.info(`scrapping the latest mangas`);
  const url = new URL(getEnv('MANGANATO_URL'));
  const $ = await urlToCheery(url);
  const mangas: Resource[] = [];

  const result = $('div.panel-content-homepage>div.content-homepage-item');

  result.each((_, element) => {
    const title = $(element)
      .find('div.content-homepage-item-right>h3.item-title>a')
      .text()
      .trim();
    const url = $(element)
      .find('div.content-homepage-item-right>h3.item-title>a')
      .attr('href');

    if (!url || !title) {
      logger.error(`Unable to grab url/title for ${url}/${title}`);
      return;
    }
    try {
      let manga: Resource = {
        title,
        url: new URL(url),
      };

      mangas.push(manga);
    } catch (error) {
      logger.error(error);
    }
  });

  logger.info(`Scrapped ${mangas.length} mangas from latest page`);
  return mangas;
};

export const mangaInfo = async (id: mangakakalot_Id): Promise<MangaInfo> => {
  const url = `${getEnv('CONSUMET_URL')}/manga/mangakakalot/info?id=${id}`;

  const res = await fetch(url);
  return await res.json();
};
