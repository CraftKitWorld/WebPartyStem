---
name: craftkit-usability-analyzer
description: >
  Audit a CraftKit web page or flow (parties, STEM camps waitlist, about, privacy, email) for
  usability, conversion and accessibility, then compare it with how other kids' party and camp
  providers solve the same flow. Use for a UX critique, heuristic evaluation, CTA conversion review,
  accessibility check, or "how do other kids' activity businesses do this". Not for pricing strategy,
  market sizing or Extreme Networks product screens.
---

# CraftKit flow teardown

Two halves on one page. **Part A** audits CraftKit's own page against usability heuristics, task cost,
conversion and accessibility. **Part B** shows how comparable providers solve the same flow, with pros and cons.
Part A is grounded in the real page, so it carries the stronger claims. Part B gives it a reference frame.

The value is specificity and honesty. The owner should finish knowing what to fix first and which trade-off she is choosing.

## Scope rule
Analyse **one flow**, not the whole business. If the page is the party booking flow, audit that and compare
party booking flows. Everything on the page must bear on the flow in front of you.

## 1. Don't ask, build on these defaults
State the defaults in one line of chat and proceed. Only ask if you cannot tell which flow to audit.

| Decision | Default |
| --- | --- |
| Competitors | 6 to 8 real providers in the same market as the flow: mobile or in-home party hosts, party venues and franchises, STEM or maker camp providers, art and craft studios, local recreation programs. Include at least one big franchise and one small local operator. Search for them, never name providers from memory. |
| Lenses | Five (matrix columns): clarity of offer and price · booking and payment flow · trust and social proof · mobile and accessibility · parent follow-up (email, waitlist, reminders). |
| Markets | CraftKit runs in two markets: **Hood River, Oregon (USD, US English, +1 numbers)** and **Melbourne, Australia (AUD, AU English, +61 numbers, school terms and seasons reversed)**. Audit the flow once, then run Part B per market: 3 to 4 local competitors each, found by search. Never carry a US competitor into the Melbourne set or the reverse. State which market each card belongs to. |
| Market register | Markets are a list, not a fixed pair. Current: Hood River, Oregon (USD, US English, +1, US school calendar) and Melbourne, Australia (AUD, AU English, +61, Southern Hemisphere terms). To add a market, add one row to this table (currency, language, phone format, school calendar and holidays, typical party norms, payment methods, privacy law such as COPPA, Australian Privacy Act or GDPR) and the rest of the skill applies unchanged. | 
| Segments | The party flow has two age groups: 3 to 7 (Junior Craft & Storyplay) and 8 to 16 (Action-Packed Challenges). Walk the flow once per group and note where wording, worlds or the age prompt differ. |
| Reader | The business owner. Plain language, no jargon. |
| Format | One HTML page: prototype audit, then matrix plus one card per competitor, with wireframe sketches and a link on every card. |
| Own product | Shown as the benchmark card, last. |

## Part A: audit the page

Read the page source first, then **measure it in a real browser** (Playwright, or the Claude browser tool) at 1440px and 390px.
Do not infer accessibility from markup you skimmed. One batched snippet answers most of it:

```js
({
  interactives: [...document.querySelectorAll('button,a,input,select,textarea,[role="button"],[tabindex]')].map(el => ({
    tag: el.tagName, label: el.getAttribute('aria-label') || el.textContent.trim().slice(0,40),
    tabindex: el.tabIndex, w: Math.round(el.getBoundingClientRect().width), h: Math.round(el.getBoundingClientRect().height)
  })),
  headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => h.tagName + ': ' + h.textContent.trim().slice(0,50)),
  landmarks: [...document.querySelectorAll('main,nav,header,footer,aside')].map(e => e.tagName),
  imgsMissingAlt: [...document.querySelectorAll('img')].filter(i => !i.alt).length,
  liveRegions: document.querySelectorAll('[aria-live],[role="status"],[role="alert"]').length,
  horizontalScroll: document.documentElement.scrollWidth > innerWidth,
  reducedMotionRule: [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => String(r.media?.mediaText).includes('prefers-reduced-motion')); } catch (e) { return false; } })
})
```

Every Part A finding must be traceable to source or a measurement. If you could not verify something (real screen reader behaviour, for example), say so.

### 2. Heuristic evaluation
Walk Nielsen's ten heuristics against the flow. One row each: **verdict** (pass, minor, major, critical), **evidence** (the specific element, named), **fix** (one concrete, sized change).
If a heuristic passes, one line saying so is enough. A flow with ten passes means you evaluated a mockup, not the interaction.

### 3. Clicks and effort per task
Pick the 3 to 5 tasks a parent comes to do, stated as goals: "book the dinosaur party for a date", "join the camps waitlist and pick a payment path", "ask about dates without paying", "find the cancellation policy".
For each: clicks, other effort (typing, scrolling, scrolling back up, page loads), best in field (named), verdict in one clause. Opening a menu is a click. A required scroll is a cost. Cheap but hidden is a finding, not a win.

### 4. Ideal path and distractors (conversion)
For each task, write the ideal path as numbered steps naming the element touched. Then list distractors: competing CTAs of equal weight, decoy affordances, premature choices, optional steps that read as required, attention sinks (banner, ticker, carousel that outranks the CTA), and dead ends.
Rate each distractor's pull: **strong**, **moderate**, **weak**, and ground the rating in something visible (size, position, contrast, label).
Include these CraftKit-specific checks every time:
- Does every CTA go to the right section (booking CTAs to payment, "check dates" to the enquiry form)?
- Is the deposit amount, refund rule and what-happens-next visible before the pay button?
- Does the ticker or carousel have a pause control and a reduced-motion rule?
- Is there one clear primary CTA per screen at 390px, including the sticky bar?
- Age and tier: does the toggle, `?age=` prefill and age-mismatch note ("Show X worlds" / "Keep W") reach the booking button without a dead end? Does a prefilled visitor (`?world=&age=&first=&code=`) see anything they already told us?
- Market: are currency, phone number, spelling and date format right for the visitor's market, and is the market obvious without a picker getting in the way of the CTA?
- Does each tracking event fire once per action (cta_click, begin_checkout, generate_lead, sign_up, purchase)?
Close with **path integrity**: how many steps are unambiguous at first encounter, and where the flow first stops being obvious. That moment is usually the best fix.

### 5. Parent personas and jobs to be done
Pick 3 to 4 that genuinely touch the flow from this set (do not run all):
- **Planning parent**: books a birthday 3 to 8 weeks out, wants it easy, wants to be in the photos.
- **Last-minute parent**: needs a date this month, needs availability without paying first.
- **Camp parent**: working family planning school breaks and summer, cares about dates, ages, drop-off, price and backup options.
- **Grandparent or gifter**: books for someone else, less sure of the child's current obsession, needs reassurance.
- **Cautious parent**: allergies, safety, cancellation policy, who is supervising.
- **Returning customer**: wants to rebook fast, use a voucher.
**Market personas.** Run the persona set above through each market, then add the market-specific parents that actually differ. Examples to adapt, never to assume: an *expat or newcomer parent* unsure of local party customs and venues; a *multilingual household* where the booker is not the first-language reader of the page; a *parent in a different season or school calendar* than the copy assumes (summer holiday in December); a *parent who expects a different payment method* (local cards, bank transfer, pay later); a *parent in a stricter privacy regime* who needs to see why a child's name and age are collected. Mark each as **evidenced** (from reviews, enquiries or analytics) or **hypothesis** (plausible, untested), and never present a hypothesis as a finding. When a new market is added, start with its hypotheses and replace them with evidence as bookings arrive.

Per persona: job as an outcome ("lock a date without a long phone call"), success looks like, 2 to 4 ranked friction points naming the element and its cost, and whether the flow fits, tolerates or fights them. Say who the flow is built for.

### 6. UX critique and accessibility
Each axis gets a short paragraph or 2 to 3 bullets, never a score. Name the element, what happens, what should happen.
**UX:** hierarchy · cognitive load · discoverability · consistency · affordances · error prevention · feedback · edge cases · empty states · loading and error states for forms and payment.
**Accessibility (WCAG 2.2 AA), with the measured number:**
- Contrast: 4.5:1 body, 3:1 large text and UI boundaries. Compute from resolved colours, including white on the coral accent and text over photo placeholders.
- Touch targets: 44 by 44px minimum. Report actual boxes of anything smaller.
- Text scaling: usable at 200% with no clipping or overlap.
- Keyboard: everything reachable, order matches visual order, visible focus, no trap (check the carousel, ticker and FAQ).
- Screen reader: report names, roles, live regions exposed. Flag that real assistive tech was not tested.
- Motion: anything animating without a reduced-motion guard.
- Forms: labels, required markers, error text, autocomplete attributes.
Close Part A with **the five things worth fixing first**, ordered by severity times effort, one sentence each.

## Part B: the field

### 7. Research and sketches
Search the web for each competitor's official pages (booking page, camps page, FAQ, pricing). For each you need:
1. **Structure**: what the page is made of and where the booking CTA sits.
2. **Praise** and 3. **Criticism**: from real reviews (Google, Yelp, Facebook, local parent groups, Trustpilot). Percentages and quoted phrases beat adjectives. If a business has no visible criticism, look harder.

Tag every competitor and show the tag on its card:
- `Review-sourced`: you found real parent reviews of this specific business.
- `Website-based assessment`: thin independent coverage, judgements come from their site and general consensus. Say so on the card and in sources.
Never present a website-based judgement as review-sourced.

**Sketch, never capture.** Do not reproduce competitor screenshots or imply you saw their live pages. Draw a greyscale wireframe from the documented structure (plain divs, same scale for all, about 250 by 152px), caption it in one sentence about the structural choice, and link every card to a real URL you saw in search results. Never construct a plausible-looking URL. Also sketch CraftKit's own page at the same scale.

## The page

### 8. Structure
One HTML page. **Header:** eyebrow, one-line title, subhead naming the lenses, metadata chips (compile date, "sketches not screenshots", "assistive tech not tested"). **Tabs** (maximum seven, default "Fix first", finding count in each label with the word "majors" or "minors", never colour alone): Fix first · Heuristics and clicks · Ideal path · Parents · UX and accessibility · The field. Render only the active section. Include a flat-page toggle that shows every section stacked for printing.
Part B: at-a-glance matrix (competitors as rows, lenses as columns, specific claims not ratings, final "sharpest criticism" column), then one card per competitor, benchmark card last with an accent border. Sources and confidence section last.

### 9. Card anatomy
Wrapping flex row, `min-width: 0` on every child: sketch column 250px, description column (title, evidence tag, two paragraphs), pros (5 to 6 bullets), cons (5 to 6 bullets), documentation link last. First paragraph: how the page is organised. Second: the tension between what parents praise and what they don't. Benchmark card relabels columns "where it leads" and "where the field pressures it".

### 10. Writing
One idea per bullet. Quote numbers when you have them. Attribute contested claims. Cons get the same care as pros, especially for CraftKit's own page. Critique the page, never the owner. Do not recommend features beyond the fixes you can evidence.

### 11. Build notes
Use the CraftKit theme variables (`eds-theme/craftkit-theme.css`), not picked hex colours. Pair every severity colour with its word. The audit page must pass the checks it applies.

### 12. Before you hand it over
- Every Part A finding names a specific element and a sized fix.
- Every measurable accessibility axis shows the number you measured.
- Missing states are reported as findings.
- Every competitor card has pros, cons, an evidence tag and a working link.
- No claim about a live competitor page you did not read about, and no claim about CraftKit's page you did not read or measure.
- Both caveats (sketches, unverified assistive tech) are on the page.
- Each market has its own competitor set, each age group was walked, and every market persona is labelled evidenced or hypothesis.
- Every distractor names what it competes with and carries a pull rating.
- The page says which persona the flow is built for.
