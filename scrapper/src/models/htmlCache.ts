import { ClientResponseError } from 'pocketbase';
import { htmlCollection } from '../pocketbase.js';
import type { id } from '../types/index.js';
import { HtmlCacheCollection } from '../validators/htmlCache.js';
import { createLogger, createTimer } from '../logger.js';

const logger = createLogger({
  kind: 'model',
  type: 'html',
});

export const getHTML = async (url: URL) => {
  try {
    const timer = createTimer();
    const result = await htmlCollection.getFirstListItem<HtmlCacheCollection>(
      `url='${url}'`
    );
    logger.info(
      `${timer()} Retrieving html from the html collection for url ${url} `
    );

    return result;
  } catch (error) {
    if (error instanceof ClientResponseError) {
      throw error;
    } else {
      logger.error(
        `There was an unexpected error when trying to get html from the cache`,
        error
      );
      process.exit(1);
    }
  }
};

export const deleteHTML = async (id: id) => {
  try {
    const timer = createTimer();

    const result = await htmlCollection.delete(id);
    logger.debug(
      `${timer()} Deleting html from the html collection for id ${id}`
    );

    return result;
  } catch (error) {
    if (error instanceof ClientResponseError) {
      throw error;
    } else {
      logger.error(
        `There was an unexpected error when to delete html from the html cache with id of ${id}`,
        error
      );
      process.exit(1);
    }
  }
};

export const createHTML = async (url: URL, html: string) => {
  try {
    const timer = createTimer();

    const { id } = await htmlCollection.create({
      url,
      html,
    });

    logger.debug(
      `${timer()} Creating html in html cache collection for url ${url} `
    );
    return id as id;
  } catch (error) {
    if (error instanceof ClientResponseError) {
      throw error;
    }
    logger.error(
      `There was an unexpected error when to create html in the html cache with url of ${url}`,
      error
    );
    process.exit(1);
  }
};
