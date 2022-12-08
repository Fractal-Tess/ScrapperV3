import { DatabaseAddons, id } from './index';

// Manga
export interface MangaInfo {
  id: string;
  title: string;
  altTitles: string[];
  description: string;
  headerForImage: {
    Referer: string;
  };
  image: string;
  genres: string[];
  status: string;
  views: number;
  authors: string[];
  chapters: MangaChapters[];
}

export interface InsertableManga {
  title: string;
  mangaId: string;
  description: string;
  coverUrl: string;
  status: string;

  genres: id[];
  chapters: id[];
}
export interface MangaCollection extends DatabaseAddons, InsertableManga {}

// Chapter
export interface MangaChapters {
  id: string;
  title: string;
  views: number;
  releasedDate: string;
}
export interface InsertableMangaChapter {
  chapterId: string;
  title: string;
}
export interface MangaChapterCollection
  extends DatabaseAddons,
    InsertableMangaChapter {}
