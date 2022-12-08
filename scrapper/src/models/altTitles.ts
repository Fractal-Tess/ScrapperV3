import { ClientResponseError } from 'pocketbase';
import { altTitlesCollection } from '../pocketbase.js';
import { createLogger } from '../logger.js';
import { id } from '../types/index';

const logger = createLogger({
  kind: 'model',
  type: 'altTitles',
});

export const createAltTitle = async (title: string) => {
  try {
    const id = getAltTitle(title);
    return id;
  } catch (error) {
    if (error instanceof ClientResponseError) {
      const { id } = await altTitlesCollection.create({ title });
      return id;
    }
    logger.error(`Error while trying to create altTitle for ${title}`, error);
    process.exit(1);
  }
};

export const deleteAltTitle = async (id: id) => {
  try {
    await altTitlesCollection.delete(id);
  } catch (error) {
    if (error instanceof ClientResponseError) {
      logger.error(`Delete request for altTitle id ${id} did not find a match`);
      throw error;
    }
    logger.error(`Error while trying to delete altTitle with id ${id}`, error);
    process.exit(1);
  }
};

export const getAltTitle = async (title: string) => {
  try {
    const { id } = await altTitlesCollection.getFirstListItem(
      `title='${title}'`
    );
    return id;
  } catch (error) {
    if (error instanceof ClientResponseError) throw error;

    logger.error(`Error while trying to query for title: ${title}`, error);
    process.exit(1);
  }
};
