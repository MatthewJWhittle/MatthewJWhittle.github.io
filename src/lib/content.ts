import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublishedWork(): Promise<CollectionEntry<'work'>[]> {
  const entries = await getCollection('work', ({ data }) => data.draft !== true);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPublishedNotes(): Promise<CollectionEntry<'notes'>[]> {
  const entries = await getCollection('notes', ({ data }) => data.draft !== true);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
