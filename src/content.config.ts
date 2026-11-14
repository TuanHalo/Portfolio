import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const localizedString = z.object({
  en: z.string().min(1),
  vi: z.string().min(1),
});

export const localizedStringList = z.object({
  en: z.array(z.string().min(1)).min(1),
  vi: z.array(z.string().min(1)).min(1),
});

const profile = defineCollection({
  loader: file('content/profile.yaml'),
  schema: z.object({
    name: z.string().min(1),
    handle: z.string().min(1),
    title: localizedString,
    tagline: localizedString,
    bio: localizedString,
    location: localizedString,
    availability: localizedString,
    email: z.string().email(),
    avatar: z.string().min(1),
    careerStart: z.coerce.date(),
    socials: z.object({
      github: z.string().url().or(z.literal('')).default(''),
      linkedin: z.string().url().or(z.literal('')).default(''),
      facebook: z.string().url().or(z.literal('')).default(''),
      x: z.string().url().or(z.literal('')).default(''),
      website: z.string().url().or(z.literal('')).default(''),
    }),
  }),
});

const experience = defineCollection({
  loader: file('content/experience.yaml'),
  schema: z.object({
    company: z.string().min(1),
    role: localizedString,
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    location: localizedString.optional(),
    highlights: localizedStringList,
    stack: z.array(z.string().min(1)).default([]),
  }),
});

const education = defineCollection({
  loader: file('content/education.yaml'),
  schema: z.object({
    institution: localizedString,
    degree: localizedString,
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    location: localizedString.optional(),
    highlights: localizedStringList.optional(),
  }),
});

const certificates = defineCollection({
  loader: file('content/certificates.yaml'),
  schema: z.object({
    name: localizedString,
    issuer: z.string().min(1),
    date: z.coerce.date(),
    credentialId: z.string().optional(),
    credentialUrl: z.string().url().or(z.literal('')).optional(),
    file: z.string().optional(),
  }),
});

const skills = defineCollection({
  loader: file('content/skills.yaml'),
  schema: z.object({
    category: localizedString,
    items: z.array(z.string().min(1)).min(1),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      summary: z.string().min(1),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      tags: z.array(z.string().min(1)).min(1),
      date: z.coerce.date(),
      featured: z.boolean().default(false),
      translation: z.enum(['human', 'machine']).default('human'),
      links: z
        .object({
          demo: z.string().url().optional(),
          repo: z.string().url().optional(),
        })
        .default({}),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    tags: z.array(z.string().min(1)).default([]),
    draft: z.boolean().default(false),
    translation: z.enum(['human', 'machine']).default('human'),
  }),
});

export const collections = {
  profile,
  experience,
  education,
  certificates,
  skills,
  projects,
  blog,
};

