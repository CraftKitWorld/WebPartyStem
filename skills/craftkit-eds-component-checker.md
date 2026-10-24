---
name: craftkit-eds-component-checker
description: >
  Scan a CraftKit prototype or exported HTML page after it has been rebuilt on the EDS design system, and list every
  component that is custom or not from EDS, plus any hard-coded colours or fonts that bypass the theme variables.
  Use when handing a CraftKit page to Claude Code or when asked to check EDS component usage, compliance or theme use.
---

# CraftKit EDS component and theme checker

Scans a CraftKit page (Claude Design prototype or exported HTML) and reports what is custom, what is EDS, and what bypasses the theme.

## Scanning rules
- Scan the **whole page**, including header, footer, sticky bar and forms. (The original EDS checker skipped the app bar and left nav because product screens have them. Marketing pages do not, so nothing is skipped.)
- Treat plain content (headings, paragraphs, lists, images) as not requiring a component. Check interactive and structured elements.

## Component usage check
1. Check if each component name starts with `en-`. If not, it is probably not an EDS component. If in doubt, check the component's code to see if the name matches.
2. Cross-check each custom element against the component library index: https://claude.ai/design/p/495cd3b9-ba45-4310-9f15-a8072a06dba7?file=Component+Library.dc.html&via=share (open it; if you cannot open it, say so and use the repo's component list instead).
3. For data grids and tables (CraftKit has none today), compare with the official AG Grid template.
4. Use this starting map of CraftKit elements to look for an EDS equivalent. These are search hints, not confirmed names:

| CraftKit element | Look for in EDS |
| --- | --- |
| `.btn` (coral, white, outline, ink, ghost) | button (primary, secondary, tertiary, inverse) |
| `.input`, `textarea.input`, `.field` | text input, text area, form field |
| `.choice`, `.worldopt` radios and checkboxes | radio, checkbox, selectable card |
| FAQ `details/summary` | accordion |
| Testimonial carousel, ticker | carousel (likely none: custom) |
| Header nav, footer nav | navigation, link |
| `.stickybar` | likely none: custom |
| `.pay-box` | likely none (Square renders it) |
| Date input | date picker |
| Success and error text | inline message, toast |
| Cards (world cards, values, team) | card |
| Tooltips, tags, chips | tag, tooltip |
| Age-group toggle (`tier-toggle`, `aria-pressed` buttons) | segmented control, toggle button group |
| Age-mismatch note (`#age-note`) | inline message, alert |
| Voucher and price summary on the booking card | summary list, inline message |

## Data-driven components
CraftKit components render from `craftkit-products.js` and `craftkit-sections.js` (`data-ck` and `data-copy` attributes), so inspect the **rendered** page, not just the source HTML, and check each age group's view (toggle both) and both markets' wording if the page differs. Copy lives in data; flag hard-coded text that should be in `party.copy`.

## Theme check (added)
Flag as issues: hard-coded hex colours, hard-coded font families, pixel radii or borders that duplicate a theme variable, anything that does not read from `--en-theme-*` / `--en-palette-*`, and any unlayered CSS that targets `h1`, `body` or other bare elements.

## Expected result
- Create `ComponentUsageAuditResult.html`, a page with a table of 5 columns: **Issue No.**, **Component** (clickable link to that page in the prototype), **Page**, **Correct Implementation** (the actual EDS component copied from the component implementation index, not code or text), **Details**. Add a second small table for theme issues (element, page, what bypasses the theme, variable to use). Style the page with the CraftKit theme variables.
- In Claude Design: add a "Tweaks" toggle, "Highlight Non Compliant". ON: non-compliant components get a thick bright red border, compliant ones bright green. Pair colour with a text label so it never relies on colour alone. (Outside Claude Design, skip the toggle and say so in the file.)
- Also write the same details to `ComponentUsageAuditResult.md` in the project files.
- If issues are found, say in chat: "EDS component usage check scan complete. <number> issues identified with component usage and <number> theme issues. Please use available alternative components from EDS, or get in touch with the EDS team directly for any custom component requirement. Further details are in ComponentUsageAuditResult.html and ComponentUsageAuditResult.md."
- If none: "Congratulations! EDS component usage check scan complete. Zero issues found, prototype is good to be handed off."
- Beyond the above, do not give verbose output in chat.
