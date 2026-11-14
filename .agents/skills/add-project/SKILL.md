---
name: add-project
description: Add a new project case study in English and Vietnamese to the portfolio.
---

# Add Project Playbook

1. **Gather facts**: Ask the owner for any missing details (title, summary, problem, architecture, outcome, tags, date, demo/repo links, cover image). Never invent metrics or URLs. Use `TODO(owner): ...` for anything unknown.
2. **Choose a slug**: Kebab-case ASCII (e.g. `demo-cli`).
3. **Cover image**: Place any cover image in `content/projects/_images/<slug>.png` (or `.svg`/`.webp`) and include descriptive `coverAlt`.
4. **Create EN & VI files**: Copy `content/_templates/project.mdx` to `content/projects/en/<slug>.mdx` and `content/projects/vi/<slug>.mdx`. Keep `summary` under 160 characters and reuse existing tags where possible. Set `translation: machine` on the VI file if auto-translated.
5. **Validate**: Run `pnpm validate` and confirm 0 errors. Report changed files and any `TODO(owner)` items.

