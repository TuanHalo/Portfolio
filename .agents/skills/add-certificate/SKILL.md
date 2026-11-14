---
name: add-certificate
description: Add a certificate entry and its supporting PDF or image file.
---

# Add Certificate Playbook

1. **Store the file**: Place the certificate PDF or image scan in `assets/certificates/<slug>.pdf` (or `.png`). Never commit private ID numbers.
2. **Add YAML entry**: Append an entry to `content/certificates.yaml` following `content/_templates/certificate-entry.yaml`, with `file: /certificates/<slug>.pdf`.
3. **Validate**: Run `pnpm validate` to verify the file exists and schema matches.

