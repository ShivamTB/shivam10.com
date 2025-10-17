import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Existing blog collection (keep for now)
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

// Writing & Reflections
const writing = defineCollection({
	loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

// Photography
const photos = defineCollection({
	loader: glob({ base: './src/content/photos', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			image: image(),
			caption: z.string().optional(),
			location: z.string().optional(),
			shotDate: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
		}),
});

// Passion Projects
const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		link: z.string().url().optional(),
		status: z.enum(['active', 'paused', 'archived']).default('active'),
		started: z.coerce.date().optional(),
		updated: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

// Quotes / Identity
const quotes = defineCollection({
	loader: glob({ base: './src/content/quotes', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		text: z.string(),
		source: z.string().optional(),
		context: z.string().optional(),
		date: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { blog, writing, photos, projects, quotes };
