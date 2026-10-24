# CraftKit theme for EDS: test plan for tomorrow

Files: `craftkit-theme.css` (the variables) and `tailwind.eds-preset.js` (Tailwind reads those variables).
The exported pages already load the variables, so you can see them working before touching the repo.

## Caveat
Written from the EDS notes, not the repo. Names like `--en-theme-surface-page` are guesses at the pattern.
Step 1 tomorrow is renaming them to the real ones.

## Checklist in the repo
1. How tokens are built (tokens file or generator). Add `craftkit` as a third theme beside light and dark.
2. Whether components expose hooks beyond variables (parts, `--en-button-height`, etc.). List what you could not reach.
3. Whether Tailwind's reset (preflight) clashes with the design system's global CSS. If so, set `corePlugins: { preflight: false }` in the preset and keep the layered base rules.
4. That the Tailwind build scans your templates (Jinja or others) so used classes survive. Check `content` globs.
5. Never write unlayered CSS that targets `h1`, `body` etc. Put base rules in `@layer base`.

## Variable map (CraftKit value → what to look for in EDS)
| Mine | Value | Purpose |
|---|---|---|
| --en-palette-ink | #141212 | text, borders, dark blocks |
| --en-palette-coral | #D63A28 | accent, primary buttons |
| --en-palette-blush | #F6E0DC | soft section background |
| --en-palette-rule | #E3A79E | divider lines |
| --en-palette-muted | #4A4442 | secondary text |
| --en-palette-paper | #FAFAFA | subtle background |
| --en-theme-radius-control | 0 | square corners everywhere |
| --en-theme-border-width | 2px | outlines on buttons, inputs, cards |
| --en-button-height | 52px | button size |
| fonts | Bricolage Grotesque / DM Sans | display / body |

## Likely needs the EDS team (shadow DOM)
Button shape and density, heading type scale, the 2px ink outline and flat no-shadow look, if those are not exposed as variables or parts.

## Try it on the exported pages
Switch the accent in one place: change `--en-palette-coral` in `craftkit-theme.css` and reload. Buttons, borders and highlights follow.
