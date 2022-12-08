import { ClientResponseError } from 'pocketbase';
import { afterEach, describe, expect, it } from 'vitest';
import { createHTML, deleteHTML, getHTML } from '../../src/models/htmlCache.js';
import { htmlCollection } from '../../src/pocketbase.js';
import type { id } from '../../src/types/index.js';
import { html_cache_validator } from '../../src/validators/htmlCache.js';

describe('Model cache', () => {
  const url = new URL('http://localhost/test_url');
  const html = 'example html string';

  afterEach(async () => {
    try {
      // Try to delete any records where their url is equal to the url used for testing
      const testRecord = await htmlCollection.getFirstListItem(`url='${url}'`);
      await deleteHTML(testRecord.id as id);
    } catch (_) {
      _;
    }
  });

  it('throws on multiple with same url', async () => {
    await createHTML(url, 'asd');

    await expect(createHTML(url, 'fgh')).rejects.toBeInstanceOf(
      ClientResponseError
    );
  });

  it('can crete new records', async () => {
    await createHTML(url, html);
  });

  it('can can return records', async () => {
    await createHTML(url, html);
    const result = await getHTML(url);

    html_cache_validator.parse(result);
  });

  it('can delete records', async () => {
    const id = await createHTML(url, html);
    await deleteHTML(id as id);
  });
});
