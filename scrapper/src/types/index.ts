export * from '../validators/env.js';
export * from '../validators/htmlCache.js';
export * from './manga.js';
export * from './database.js';
export * from './genres.js';

export type Brand<K, T> = K & { __brand: T };
export type id = Brand<string, 'id'>;
export type mangakakalot_Id = Brand<string, 'id'>;

export type Resource = {
  url: URL;
  title: string;
};
