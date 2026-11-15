# Content Contract

Every collection lives under `content/` and is validated by Zod in `src/content.config.ts` plus `scripts/validate-content.ts`. Machine-readable JSON Schemas live in `docs/ai/schemas/`.

## 1. `content/profile.yaml`

- **Type:** YAML list containing **1 entry** (`id: me`).
- **Schema:** `docs/ai/schemas/profile.schema.json`

| Field | Type | Required | EN/VI? | Notes |
|---|---|---|---|---|
| `id` | string | Yes | No | Must be `me` |
| `name` | localized | Yes | Yes | Full display name |
| `handle` | string | Yes | No | GitHub/social handle without `@` |
| `title` | localized | Yes | Yes | Current role title |
| `tagline` | localized | Yes | Yes | **Max 60 chars** per language (used on Bento tile) |
| `bio` | localized | Yes | Yes | Multi-line summary |
| `location` | localized | Yes | Yes | City, Country (no street address!) |
| `availability` | localized | Yes | Yes | Short status badge |
| `email` | email | Yes | No | Public contact email |
| `phone` | string | No | No | Approved public phone number (also powers Contact/Resume) |
| `avatar` | path | Yes | No | Path under `assets/`, e.g. `/photos/avatar.svg` |
| `careerStart` | `YYYY-MM-DD` | Yes | No | Drives the "N+ yrs" Bento tile |
| `socials` | object | Yes | No | Keys: `github`, `linkedin`, `facebook`, `zalo`, `x`, `website` (`""` if unused) |

## 2. `content/experience.yaml`

- **Type:** YAML list of jobs.
- **Schema:** `docs/ai/schemas/experience.schema.json`

| Field | Type | Required | EN/VI? | Notes |
|---|---|---|---|---|
| `id` | kebab-case | Yes | No | Unique identifier |
| `company` | string | Yes | No | Employer name |
| `role` | localized | Yes | Yes | Job title |
| `start` | `YYYY-MM-DD` | Yes | No | Start date |
| `end` | `YYYY-MM-DD` | No | No | Omit if current role ("Present") |
| `location` | localized | No | Yes | City / Remote / Hybrid |
| `highlights` | localized list | Yes | Yes | 1–4 action-verb bullets per language |
| `stack` | string[] | No | No | Technologies used |

## 3. `content/education.yaml`

- **Schema:** `docs/ai/schemas/education.schema.json`
- Fields: `id`, `institution` (localized), `degree` (localized), `start`, `end?`, `location?` (localized), `highlights?` (localized list).

## 4. `content/certificates.yaml`

- **Schema:** `docs/ai/schemas/certificates.schema.json`
- Fields: `id`, `name` (localized), `issuer`, `date`, `credentialId?`, `credentialUrl?`, `file?` (path under `assets/certificates/`, e.g. `/certificates/my-cert.pdf`).

## 5. `content/skills.yaml`

- **Schema:** `docs/ai/schemas/skills.schema.json`
- Fields: `id`, `category` (localized), `items` (non-empty `string[]`).

## 6. `content/projects/{en,vi}/<slug>.mdx`

- **Schema:** `docs/ai/schemas/projects.schema.json`

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | Project name |
| `summary` | string | Yes | **Max 160 chars** |
| `cover` | relative path | No | e.g. `../_images/my-project.png` |
| `coverAlt` | string | Recommended | Required if `cover` is set |
| `tags` | string[] | Yes | Reuse existing tags where possible |
| `date` | `YYYY-MM-DD` | Yes | Completion or publish date |
| `featured` | boolean | No | Default `false` (first featured appears on Home Bento) |
| `translation` | `human \| machine` | No | Default `human` |
| `links` | `{ demo?, repo? }` | No | Valid URLs |

## 7. `content/blog/{en,vi}/<slug>.mdx`

- **Schema:** `docs/ai/schemas/blog.schema.json`
- Fields: `title`, `description` (**max 160 chars**), `date`, `tags` (`string[]`), `draft` (boolean, default `false`), `translation` (`human | machine`, default `human`).

## Common Mistakes

- Using non-ASCII or spaces in MDX filenames (must be kebab-case ASCII, identical in `en/` and `vi/`).
- Leaving `TODO(owner)` comments (allowed locally as warnings, **blocked in production deploy**).
- Putting unapproved phone numbers (outside `profile.phone` / `profile.socials.zalo`), home street addresses, or ID numbers in any file.

