import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    date: z.coerce.date(),
    conference: z.string().optional(),
    status: z.enum(['preprint', 'published', 'technical-report']).default('preprint'),
    abstract: z.string(),
    thumbnail: z.string().optional(),
    pdf: z.string().optional(),
    github: z.string().optional(),
    doi: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    category: z.enum(['AI', 'Research', 'Engineering', 'Quantitative Finance', 'Opinion', 'Tutorials']),
    description: z.string(),
    image: z.string().optional(),
    readingTime: z.string().optional(),
  }),
});

export const collections = { research, blog };
