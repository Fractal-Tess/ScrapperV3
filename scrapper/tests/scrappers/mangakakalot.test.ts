import { afterEach, describe, expect, it } from 'vitest';
import { index, latest, mangaInfo } from '../../src/scrappers/mangakakalot.js';
import type { mangakakalot_Id } from '../../src/types/index.js';
import { mangakakalotUrlToId } from '../../src/utils.js';

describe('mangakakalot scrapper', () => {
  it('should index the first page and return 24 resources', async () => {
    await expect(index(1)).resolves.toHaveLength(24);
  });

  it('should scrape latest page', async () => {
    await expect(latest()).resolves.toHaveLength(56);
  });
  it('should get manga info from consumet', async () => {
    const resources = await latest();
    const id = mangakakalotUrlToId(resources[0]);
    const res = await mangaInfo(id as mangakakalot_Id);
    console.log(res);
  });
});
