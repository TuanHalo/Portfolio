# Writing & Formatting Style Guide

## Voice & Tone

- **First person, factual, concise.** Describe what was built, how it works, and measurable results (only when provided by the owner).
- Avoid empty buzzwords ("revolutionary", "world-class", "rockstar").

## Length Limits (enforced by `pnpm validate`)

- `profile.tagline.{en,vi}`: **≤ 60 characters** (fits cleanly inside the Bento profile tile).
- `projects.*.summary`: **≤ 160 characters**.
- `blog.*.description`: **≤ 160 characters** (SEO meta description).
- `experience.*.highlights`: **1–4 bullets**, each starting with an action verb (e.g., *Built*, *Reduced*, *Architected*; *Xây dựng*, *Giảm*, *Thiết kế*).

## English Rules

- Use **US English** spelling (`organization`, `optimize`, `behavior`).
- Use **sentence case** or concise **title case** consistently in headings.

## Vietnamese Rules

- Write **natural Vietnamese**, not word-for-word translation.
- Keep standard technical terms in English where Vietnamese engineers normally do (`TypeScript`, `API`, `Docker`, `CI/CD`, `framework`, `deploy`).
- Use consistent first-person pronoun **`tôi`** across bio and articles.
- All Vietnamese text **MUST be Unicode NFC** (precomposed diacritics). `pnpm validate` rejects NFD-decomposed strings.

## Tag Hygiene

- Reuse existing tags whenever possible (`TypeScript`, `Astro`, `React`, `Go`, `PostgreSQL`, `Docker`, `CLI`, `Architecture`, `Portfolio`).
- `pnpm validate` warns if a new tag differs from an existing tag only by casing (e.g. `typescript` vs `TypeScript`).

