# Portfolio — Minh Tuấn

Personal portfolio, knowledge base, and bilingual website (**English** + **Tiếng Việt**) built with **Astro**, **TypeScript**, and **Tailwind CSS**, published to GitHub Pages at **https://tuanhalo.github.io/Portfolio/**.

## How to Update Your Info

You only need to edit files in **`content/`** and **`assets/`** — no code changes required.

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

> **AI assistants:** This repository includes an AI contract in [`AGENTS.md`](AGENTS.md) with schemas in [`docs/ai/`](docs/ai/) and playbooks in [`.agents/skills/`](.agents/skills/). You can ask an AI assistant to add projects, experience, certificates, or blog posts directly.

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
2. In your GitHub repository: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` validates content, builds the site, generates `resume-en.pdf` and `resume-vi.pdf`, and deploys to `https://tuanhalo.github.io/Portfolio/`.

