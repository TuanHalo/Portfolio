---
name: add-blog-post
description: Draft and publish a bilingual blog post in English and Vietnamese.
---

# Add Blog Post Playbook

1. **Outline first**: Propose a short outline to the owner and confirm key points before drafting.
2. **Create EN & VI files**: Copy `content/_templates/post.mdx` to `content/blog/en/<slug>.mdx` and `content/blog/vi/<slug>.mdx` using identical kebab-case ASCII slugs.
3. **Metadata**: Keep `description` under 160 characters. Reuse existing tags from `docs/ai/style-guide.md`. Keep `draft: true` until the owner approves publishing.
4. **Translation**: Write natural Vietnamese (NFC-normalized); set `translation: machine` if not yet reviewed by the owner.
5. **Validate**: Run `pnpm validate` and report changed files.

