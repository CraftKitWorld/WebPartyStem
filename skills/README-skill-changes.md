# What I changed in the two skills

Originals: `analyzer.md` (Usability & Competitor Analyzer v2.1) and `reviewer.md` (EDS Component Usage Checker v2.1), both by Prajwal D'souza.
New versions: `craftkit-usability-analyzer.md` and `craftkit-eds-component-checker.md`. The originals are untouched.

## 1. analyzer.md → craftkit-usability-analyzer.md

### Kept as is
- Two-part structure (audit your own page, then the field), the scope rule (one flow, not the whole business).
- Nielsen heuristics with pass/minor/major/critical, evidence and a sized fix.
- Clicks per task, ideal path and distractors with pull ratings, path integrity.
- Measured accessibility with real numbers (contrast, 44px targets, 200% text, keyboard, reduced motion).
- Evidence tags, "sketch, never capture", only link URLs seen in search results, pros/cons symmetry, card anatomy with `min-width: 0`, writing rules, the hand-over checklist.

### Changed
| Area | Original | Now |
| --- | --- | --- |
| Domain | Extreme Networks operational screens (alerts inbox, dashboards) | CraftKit parties, camps waitlist, about, privacy, email |
| Competitors | Every credible networking vendor, 8 to 10 | 6 to 8 real kids' party, camp, maker and studio providers, found by search, including one franchise and one small local operator |
| Lenses | information design, feature breadth, task workflow, setup effort, scale and multi-tenancy | clarity of offer and price, booking and payment flow, trust and social proof, mobile and accessibility, parent follow-up |
| Personas | NOC operator, network engineer, IT generalist, helpdesk, MSP, security, IT director | Planning parent, last-minute parent, camp parent, grandparent or gifter, cautious parent, returning customer |
| Reader | Product and design team | The business owner, plain language |
| Evidence tags | "Documentation-based assessment", sources like Gartner, PeerSpot, G2 | "Website-based assessment", sources like Google, Yelp, Facebook, parent groups |
| Probing tool | `eval_js` in Claude Design | Playwright or Claude browser, at 1440 and 390px |
| Build | Claude Design component, design-system tabs component, `design_doc_mode` meta, `copy_starter_component` image slots | Plain HTML page, hand-built tabs, CraftKit theme variables |
| Question policy | Don't ask, state defaults | Same |

### Added
- **Conversion checks** (section 4): CTA targets, deposit and refund visible before pay, ticker and carousel controls, one primary CTA at 390px including the sticky bar, tracking events firing once.
- Form accessibility (labels, required markers, errors, autocomplete).
- WCAG 2.2 AA named explicitly, contrast checks on white-on-coral and text over photos.
- A flat-page toggle kept, but described as plain HTML for printing.

### Removed
- Network-specific personas, scope and permission rules, multi-tenancy lens, the Extreme competitor default list, and the "own product shown as competitors and benchmark row" wording.

## 2. reviewer.md → craftkit-eds-component-checker.md

### Kept as is
- The `en-` prefix test, the check against the Component Library link, AG Grid comparison for tables.
- The 5-column result table (Issue No., Component with link, Page, Correct Implementation, Details).
- Red and green "Highlight Non Compliant" Tweaks toggle, the two exact chat messages, and "no other verbose chat output".

### Changed
- Scope: no longer skips the top bar and left nav, because marketing pages have none. The header, footer and sticky bar are checked.
- Works on exported HTML pages as well as Claude Design prototypes.
- Toggle is skipped (with a note in the file) outside Claude Design.
- Chat message mentions theme issues as well as component issues, and points to both result files.
- Highlight uses a text label as well as colour.

### Added
- A starting map of CraftKit elements (buttons, inputs, radios, accordion, carousel, sticky bar) to likely EDS equivalents. These are hints, not confirmed names.
- A **theme check**: hard-coded hex colours and fonts, anything not reading `--en-theme-*` / `--en-palette-*`, unlayered CSS on bare elements, with a second small results table.
- A rule that plain content (headings, text, images) needs no component.

### Things to check
- The original says the details are in `ComponentUsageAuditResult.MD` but also asks for an `.html` file. I write both and use both names.
- I could not open the Component Library link inside the original. It is kept as written. Confirm it still works.
- The `en-theme-*` variable names in the CraftKit theme are guesses until you compare them with the repo.

## 3. Update for age groups and markets

- **Analyzer:** new defaults for **Markets** (Hood River USD and Melbourne AUD, separate local competitor sets) and **Segments** (ages 3 to 7 and 8 to 16, walk the flow per group). New conversion checks for the age toggle, prefill and age-mismatch note, and for currency, phone and spelling per market. Hand-over checklist gains a line for both.
- **Checker:** map entries for the age toggle, age note and voucher summary, plus a rule to inspect the rendered, data-driven page in each age view.
- Assumption: "markets" means Hood River and Melbourne. If you meant something else (for example the two age groups only), tell me and I'll change it.

## 4. Update for parent personas and global expansion

- Analyzer: markets are now a **register** (add a row to add a market, covering currency, language, phone, school calendar, payment methods and privacy law). Parent personas run per market, plus market-specific personas (expat or newcomer, multilingual household, opposite-season calendar, local payment expectations, stricter privacy regime). Each is labelled **evidenced** or **hypothesis**.
- Core personas (planning, last-minute, camp, gifter, cautious, returning) are unchanged.
