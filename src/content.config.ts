import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    startedYear: z.number().int().min(1900).max(2100),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    repositoryUrl: z.string().url().optional(),
    docsUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    demoLabel: z.string().optional(),
    figureId: z.string().optional(),
    teaser: z.object({
      topics: z.array(z.string()).optional(),
      cvSummary: z.string().optional(),
      image: z.object({
        src: z.string(),
        alt: z.string(),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
        caption: z.string().optional(),
      }).optional(),
    }).optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { work, notes };
