---
name: update-profile
description: Update bio, tagline, location, availability, email, or social links in content/profile.yaml.
---

# Update Profile Playbook

1. **Edit `content/profile.yaml`**: Update only the requested fields on the `me` entry.
2. **Length & privacy**: Keep `tagline.en` and `tagline.vi` at or under 60 characters. Never add phone numbers, street addresses, or ID numbers.
3. **Validate**: Run `pnpm validate` and confirm 0 errors.

