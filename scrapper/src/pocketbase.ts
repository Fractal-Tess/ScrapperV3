import Pocketbase from 'pocketbase';
import { getEnv } from './config.js';

const pb = new Pocketbase(getEnv('POCKETBASE_URL'));

await pb.admins.authWithPassword(
  getEnv('POCKETBASE_EMAIL'),
  getEnv('POCKETBASE_PASSWORD')
);

pb.autoCancellation(false);

export const htmlCollection = pb.collection('html_cache');
export const altTitlesCollection = pb.collection('alt_titles');
export const genresCollection = pb.collection('genres');
export const authorsCollection = pb.collection('authors');
export const mangaCollection = pb.collection('manga_chapters');
export const mangaChapterCollection = pb.collection('manga');
