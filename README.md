# Portfolio - Minh Tuấn

Personal portfolio, knowledge base, and bilingual website (**English** + **Tiếng Việt**) built with **Astro**, **TypeScript**, and **Tailwind CSS**, published to GitHub Pages at **https://tuanhalo.github.io/Portfolio/**.

## How to Update Your Info

Edit files in `content/` and `assets/` to update site content. No code changes are needed.

| What you want to update | File / Folder |
|---|---|
| Name, bio, tagline, email, socials, avatar | `content/profile.yaml` |
| Work experience timeline | `content/experience.yaml` |
| Education | `content/education.yaml` |
| Certificates + PDF/image scans | `content/certificates.yaml` + `assets/certificates/` |
| Skills & tech stack | `content/skills.yaml` |
| Projects & case studies | `content/projects/en/*.mdx` & `content/projects/vi/*.mdx` |
| Blog posts | `content/blog/en/*.mdx` & `content/blog/vi/*.mdx` |
| Photos & raw documents | `assets/photos/`, `assets/documents/` |

> For AI assistants: [`AGENTS.md`](AGENTS.md) defines the editing contract, [`docs/ai/`](docs/ai/) holds the schemas, and [`.agents/skills/`](.agents/skills/) has task playbooks for adding projects, experience, certificates, or blog posts.

## Local Development

```bash
pnpm install
pnpm dev            # start local dev server
pnpm validate       # validate content rules, Zod schemas, and TypeScript
pnpm build          # build static site + Pagefind search index
pnpm preview        # preview production build locally (required for search)
pnpm build:pdf      # generate EN & VI resume PDFs into dist/resume/
```

> Note: `pnpm build:pdf` requires Chromium (`pnpm exec playwright install chromium` once).

## Deployment (GitHub Pages)

1. Push to `main`.
2. In your GitHub repository: **Settings > Pages > Build and deployment > Source > GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` validates content, builds the site, generates `resume-en.pdf` and `resume-vi.pdf`, and deploys to `https://tuanhalo.github.io/Portfolio/`.

