---
name: translate-content
description: Find and translate missing or machine-translated Vietnamese entries.
---

# Translate Content Playbook

1. **Find gaps**: Run `pnpm exec tsx scripts/validate-content.ts --report-translations` to list missing `vi/` files and `translation: machine` entries.
2. **Translate**: Create or refine the `vi/` counterpart following `docs/ai/style-guide.md` (natural Vietnamese, NFC Unicode, keep standard English tech terms).
3. **Mark status**: Set `translation: machine` for AI-drafted translations so the UI displays the review badge until the owner sets `translation: human`.
4. **Validate**: Run `pnpm validate`.

