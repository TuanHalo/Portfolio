import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

interface JsonSchema {
  readonly $schema: string;
  readonly title: string;
  readonly type: string;
  readonly [key: string]: unknown;
}

const OUT_DIR = path.resolve('docs/ai/schemas');

const localizedString = {
  type: 'object',
  required: ['en', 'vi'],
  additionalProperties: false,
  properties: {
    en: { type: 'string', minLength: 1 },
    vi: { type: 'string', minLength: 1 },
  },
};

const localizedStringList = {
  type: 'object',
  required: ['en', 'vi'],
  additionalProperties: false,
  properties: {
    en: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
    vi: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
  },
};

const schemas: Readonly<Record<string, JsonSchema>> = {
  'profile.schema.json': {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Profile Collection',
    type: 'array',
    minItems: 1,
    maxItems: 1,
    items: {
      type: 'object',
      required: [
        'id',
        'name',
        'handle',
        'title',
        'tagline',
        'bio',
        'location',
        'availability',
        'email',
        'avatar',
        'careerStart',
        'socials',
      ],
      additionalProperties: false,
      properties: {
        id: { type: 'string', const: 'me' },
        name: localizedString,
        handle: { type: 'string', minLength: 1 },
        title: localizedString,
        tagline: {
          type: 'object',
          required: ['en', 'vi'],
          additionalProperties: false,
          properties: {
            en: { type: 'string', minLength: 1, maxLength: 60 },
            vi: { type: 'string', minLength: 1, maxLength: 60 },
          },
        },
        bio: localizedString,
        location: localizedString,
        availability: localizedString,
        email: { type: 'string', format: 'email' },
        phone: { type: 'string' },
        avatar: { type: 'string', minLength: 1 },
        careerStart: { type: 'string', format: 'date' },
        socials: {
          type: 'object',
          additionalProperties: false,
          properties: {
            github: { type: 'string' },
            linkedin: { type: 'string' },
            facebook: { type: 'string' },
            zalo: { type: 'string' },
            x: { type: 'string' },
            website: { type: 'string' },
          },
        },
      },
    },
  },
  'experience.schema.json': {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Experience Collection',
    type: 'array',
    items: {
      type: 'object',
      required: ['id', 'company', 'role', 'start', 'highlights'],
      additionalProperties: false,
      properties: {
        id: { type: 'string', pattern: '^[a-z0-9-]+$' },
        company: { type: 'string', minLength: 1 },
        role: localizedString,
        start: { type: 'string', format: 'date' },
        end: { type: 'string', format: 'date' },
        location: localizedString,
        highlights: localizedStringList,
        stack: { type: 'array', items: { type: 'string', minLength: 1 } },
      },
    },
  },
  'education.schema.json': {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Education Collection',
    type: 'array',
    items: {
      type: 'object',
      required: ['id', 'institution', 'degree', 'start'],
      additionalProperties: false,
      properties: {
        id: { type: 'string', pattern: '^[a-z0-9-]+$' },
        institution: localizedString,
        degree: localizedString,
        start: { type: 'string', format: 'date' },
        end: { type: 'string', format: 'date' },
        location: localizedString,
        highlights: localizedStringList,
      },
    },
  },
  'certificates.schema.json': {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Certificates Collection',
    type: 'array',
    items: {
      type: 'object',
      required: ['id', 'name', 'issuer', 'date'],
      additionalProperties: false,
      properties: {
        id: { type: 'string', pattern: '^[a-z0-9-]+$' },
        name: localizedString,
        issuer: { type: 'string', minLength: 1 },
        date: { type: 'string', format: 'date' },
        credentialId: { type: 'string' },
        credentialUrl: { type: 'string' },
        file: { type: 'string' },
      },
    },
  },
  'skills.schema.json': {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Skills Collection',
    type: 'array',
    items: {
      type: 'object',
      required: ['id', 'category', 'items'],
      additionalProperties: false,
      properties: {
        id: { type: 'string', pattern: '^[a-z0-9-]+$' },
        category: localizedString,
        items: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
      },
    },
  },
  'projects.schema.json': {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Project MDX Frontmatter',
    type: 'object',
    required: ['title', 'summary', 'tags', 'date'],
    additionalProperties: false,
    properties: {
      title: { type: 'string', minLength: 1 },
      summary: { type: 'string', minLength: 1, maxLength: 160 },
      cover: { type: 'string' },
      coverAlt: { type: 'string' },
      tags: { type: 'array', minItems: 1, items: { type: 'string', minLength: 1 } },
      date: { type: 'string', format: 'date' },
      featured: { type: 'boolean', default: false },
      translation: { type: 'string', enum: ['human', 'machine'], default: 'human' },
      links: {
        type: 'object',
        additionalProperties: false,
        properties: {
          demo: { type: 'string', format: 'uri' },
          repo: { type: 'string', format: 'uri' },
        },
      },
    },
  },
  'blog.schema.json': {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    title: 'Blog Post MDX Frontmatter',
    type: 'object',
    required: ['title', 'description', 'date'],
    additionalProperties: false,
    properties: {
      title: { type: 'string', minLength: 1 },
      description: { type: 'string', minLength: 1, maxLength: 160 },
      date: { type: 'string', format: 'date' },
      tags: { type: 'array', items: { type: 'string', minLength: 1 } },
      draft: { type: 'boolean', default: false },
      translation: { type: 'string', enum: ['human', 'machine'], default: 'human' },
    },
  },
};

async function main(): Promise<void> {
  await mkdir(OUT_DIR, { recursive: true });
  for (const [filename, schema] of Object.entries(schemas)) {
    const target = path.join(OUT_DIR, filename);
    await writeFile(target, `${JSON.stringify(schema, null, 2)}\n`, 'utf8');
    console.log(`Wrote ${path.relative(process.cwd(), target)}`);
  }
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});

