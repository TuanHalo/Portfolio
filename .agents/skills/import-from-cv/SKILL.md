---
name: import-from-cv
description: Extract structured portfolio data from a CV, resume, or LinkedIn export into content/.
---

# Import From CV Playbook

1. **Extract into collections**: Map the owner's text into `content/profile.yaml`, `content/experience.yaml`, `content/education.yaml`, `content/skills.yaml`, `content/certificates.yaml`, and `content/projects/`.
2. **Never guess**: Any missing date, metric, or URL must be marked with `TODO(owner): <needed detail>`.
3. **Privacy**: Strip phone numbers, street addresses, and national ID numbers before writing.
4. **Validate & summarize**: Run `pnpm validate` and present a summary table of imported entries plus all `TODO(owner)` items.

