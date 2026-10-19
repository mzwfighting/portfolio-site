# Portfolio Design Rules

- Before every frontend or visual change, read and apply the Ponytail skill (`C:\Users\admin6809\.codex\plugins\cache\ponytail-local\ponytail\5.1.0\skills\ponytail\SKILL.md`), the design-taste-frontend skill (`C:\Users\admin6809\.codex\skills\taste-skill\SKILL.md`), and the relevant sections of `DESIGN.md`.
- Keep existing portfolio content, portrait, project assets, and working interactions. Adapt the reference system to real assets; do not add example modules such as monitor mockups or logo walls unless the user supplies content for them.
- The current black starfield cover is an established identity element. Keep it unless the user explicitly asks to change it; apply the design system to the content pages and shared UI.
- Prefer the existing Next.js, Tailwind, and CSS patterns. Do not introduce dependencies or decorative elements that are not required by the design.
- After visual changes, run `npm run typecheck` and inspect the affected page at desktop and mobile sizes.
- Before each `playwright-interactive` check, apply Ponytail, design-taste-frontend, and the relevant `DESIGN.md` rules; report and fix issues found during the check.
