# getferal.ai

The documentation site is served from this repository root. Edit `src/site.jsx`
for the page content and `index.html` for the shell and custom styles.

```sh
npm ci
npm run build
python -m http.server 8080
```

Commit regenerated `assets/site.js` and `assets/site.css` with source changes;
GitHub Pages serves them directly. React and Tailwind are compiled locally, so
visitors do not need runtime Babel or JavaScript/CSS CDNs.

The public `skills/feral-run/SKILL.md` is generated from the shared-vault skill.
With `FERAL_SHARED_DOCS` set, run `python scripts/sync_skill.py` to update it,
or add `--check` to verify that the public copy is current.
