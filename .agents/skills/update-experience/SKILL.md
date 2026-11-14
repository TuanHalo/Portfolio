---
name: update-experience
description: Add or update work experience entries in content/experience.yaml.
---

# Update Experience Playbook

1. **Close previous role if needed**: If the owner moved to a new company, set the `end` date (`YYYY-MM-DD`) on the previous active role in `content/experience.yaml`.
2. **Add new entry**: Follow `content/_templates/experience-entry.yaml`. Use a unique kebab-case `id`, localized `role` and `location`, and 1–4 action-verb bullets in `highlights.{en,vi}`.
3. **Check career start**: Verify `careerStart` in `content/profile.yaml` if this is the earliest job.
4. **Validate**: Run `pnpm validate` and remind the owner that the EN & VI resume PDFs regenerate automatically from this data during deploy (or via `pnpm build:pdf`).

