import { DatabaseAddons } from './index.js';

export interface Genres {
  name: string;
}

export interface InsertableGenres extends Genres {}

export interface GenreCollection extends DatabaseAddons, Genres {}
