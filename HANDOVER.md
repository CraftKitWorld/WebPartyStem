# CraftKit kids-party site: handover

For whoever takes this over. Read sections 1–3 first (15 min), then use section 7 as your test script before any change goes live.

## 1. What this is

A static site (plain HTML + one CSS file + a few shared JS files, no framework, no server except one Square payment function) selling CraftKit birthday parties. Two landing pages carry nearly all traffic:

| Page | Audience | Design intent |
|---|---|---|
| `index.html` | Meta (Facebook/Instagram) lead-form and ad traffic | Persuade, then book. Full story: hero, how it works, worlds, wall of fun, FAQ, booking. |
| `book.html` | SMS / email click-throughs (people who already know us) | Minimal. Worlds, booking card, sticky "Back to booking" bar on mobile. Almost no persuasion copy. |

Supporting pages: `about.html`, `privacy.html`, `after-school.html`. The STEM camps page is archived in `_archive-stem-camps/` (camps are retired; their concepts run through after-school). Emails and social ads live in `email/` and `social/` and are generated from markdown (section 4).

## 2. File map and build

**Edit these (sources of truth):**

- `craftkit-products.js`: ALL party data and most page copy (worlds, tiers, prices, steps, FAQ, `party.copy`).
- `comms/copy/emails.md`, `comms/copy/social.md`: all email and social copy.
- `craftkit-sections.js`: shared components (booking card, FAQ, schedule, final CTA, custom-world callout, quotes). Change layout here, not copy.
- `craftkit-booking.js`: booking form logic (tier, age, world, voucher, payment).
- `craftkit-memory.js`: remembers visitor details in `sessionStorage` (`ck_profile`).
- `craftkit-chrome.js`: header and footer.
- `square-payment-function.js`: server-side payment/booking function (see 7.9, not yet tested against live Square).

**Generated (don't hand-edit):** `index.html`, `book.html`, `after-school.html`, `craftkit.css`, `email/*.html`, `social/*`.

The page generators and Tailwind build live in the working build folder (`gen_pages.py`, `gen_after.py`, `build2.py`, `*.src.html`). Run order: `python3 gen_pages.py && python3 gen_after.py && python3 build2.py`. `build2.py` rebuilds `craftkit.css` with Tailwind 3.4.16 and copies the JS. Do not run the old `gen.py`. Never `sed -i` a *copy* of the output folder made with `cp -r` (copies can share files; that once flipped the live tier flag). Use `cp -a` into a fresh folder or tar.

Comms: `cd comms && python3 build_comms.py` writes `email/*.html` and `social/*.html`; add `--png` to export social PNGs. Emails pull worlds from `craftkit-products.js`, so a world rename there flows through on rebuild.

**Design canvas:** the Design artifact has "Adventure parties" (current), "Archive: 3 themes" (previous), and Book-SMS / Personalised / Email / Privacy boards. Edits made on the canvas have to be ported to files by hand (or by asking Claude); they do not sync automatically.

**Archive / rollback:** `_archive-3-themes/` is a full working copy of the site before age tiers. For a quick revert see section 3.

## 3. How to edit common things

**Page text.** `party.copy` in `craftkit-products.js` is a flat map: `hero.headline`, `hero.sub1`, `hero.meta`, `how.heading`, `worlds.heading`, `worlds.lead`, `worlds.tabsLabel`, `wall.heading`, `flow.heading`, `flow.lead`, `book.heading`, `book.sub` (supports `**bold**`), `faq.heading`, `sms.worlds.heading`, `sms.title`. Elements carry `data-copy="key"` and are filled at load; the generator also bakes the text into the HTML so it appears with JS off and for crawlers. After changing copy, run the build so the baked text matches.

**How it works steps:** `party.steps` (tokens are filled from price/voucher data).

**Worlds (products).** Each item in `party.items`: `id`, `name`, `tagline`, `desc`, `tier` (`young` / `older` / `both`), `core` (true = survives the 3-world revert), colour, `activities[]` (shown as "What happens" when `games` is empty), optional `experience`. `custom-world` has `byTier` overrides so its wording changes with the age toggle. Add a world = add an item, add its id to the `WORLDS` list in `square-payment-function.js`, rebuild, rebuild comms.

**Age groups:** `party.tiers` (labels, ranges, headers), `tierQuestion`, `defaultTier`. Age boundary is 7/8 (young max 7, older min 8). A child of 7 or 8 is a judgement call; the FAQ "Which age group should I choose?" covers it.

**Revert to the 3-theme, no-age experience in one line:** set `tiersEnabled: false` in `party` (craftkit-products.js). Tier UI disappears and only items with `core: true` show (Dinosaurs, Construction, Deep Sea Ruins). Rebuild.

**Prices and voucher:** `party` data (base $280 / $380 for ranges as configured, custom world +$100, voucher $50, code `CRAFT50VIP`). Four Square checkout links exist ($280, $230, $380, $330 = with and without voucher). If you change a price, the matching Square links must change too.

**Emails and social:** edit the markdown files. Token rules are written at the top of each file (`{{ first_name }}` style Klaviyo merge tags are left intact; world and voucher links get UTM and prefill params from `comms_helpers.py`). Rebuild, then paste the HTML into Klaviyo.

## 4. Design decisions and why

1. **One landing page with an age toggle, not two pages.** Parents arrive from one ad; splitting traffic would split tracking and double maintenance. The toggle ("How old is your birthday child?") swaps the worlds beneath it. Young (3–7) is the default because most leads come from that range; a wrong default is corrected by age (below).
2. **Tier is chosen once, by priority:** `?world=` > `?tier=` > `?age=` > remembered `ck_tier` > default. Anyone arriving from a personalised link never sees the wrong group.
3. **Age beats browsing.** Child age is a required booking field. If it conflicts with the chosen world, the form switches tier automatically when nothing is chosen, or shows a one-line note with two buttons ("Show X worlds" / "Keep W") when something is. We never block; we nudge.
4. **Worlds are activities, not four board-game rounds.** New worlds have `activities`; older copy that says "four games" is a known leftover (section 8).
5. **"Choose your own world" is a +$100 option**, styled as a world card so it competes fairly, with age-aware wording.
6. **The $50 voucher is auto-applied** via `?code=` and remembered in `sessionStorage`; shown on the booking card so nobody has to find a field.
7. **Booking card collapses a pre-selected world** to name only, so a prefilled visitor sees the form, not the same pitch again.
8. **Conversion focus: every visit should shorten.** The SMS page drops most persuasion because the visitor already said yes. Rule for future edits: if a section doesn't help someone book, cut it or move it below the CTA. Keep one primary CTA per screen; mobile has a sticky "Back to booking" bar on the SMS page.
9. **Privacy-minded prefill:** personal fields (`first`, `last`, `email`, `phone`, `custom`, `age`) are read from the URL, stored in `sessionStorage`, then stripped from the address bar so they aren't shared by copying the link.
10. **Child name + age required.** Privacy page currently does not mention collecting them; restore that sentence if legal agrees (flagged).

## 5. Prefill: how it flows

**Before (what the visitor arrives with):**

| Source | What is in the link | Result |
|---|---|---|
| Meta lead form → Klaviyo | Profile props: `ck_party_world`, `ck_party_for`, `ck_party_age`, `ck_party_tier`, `ck_child_age` | Email/SMS links built with `|lookup:` merge tags (`comms_helpers.utm()`). |
| Email / SMS link | `?world=&age=&first=&code=` (also `last`, `email`, `phone`, `custom`, `tier`) | Tier and world preselected, name/age prefilled, voucher applied. |
| Direct / ad | nothing | Default tier, nothing chosen. |

**After (what we hand back):** `ckIdentify` writes `ck_party_world`, `ck_party_for`, `ck_party_age`, `ck_party_tier` to Klaviyo when the form is submitted. The Square booking body includes `age` and `tier`; the server function validates age 1–18 and puts it in the booking note. `after-school.html` uses the same memory file for its own prefill.

**Open decision: abandoned forms.** The form does NOT capture fields before submit. Capturing on email blur is possible (Klaviyo identify) but needs a visible consent notice and a privacy update. Waiting on Katie.

**Placeholder:** `ck_child_age` is a guessed Klaviyo property name for the Meta lead-form age answer. Confirm the real field name before launching age-personalised emails.

## 6. Keeping the site focused (ongoing)

Review with these questions every time numbers move: What is the one thing this screen wants the visitor to do? Which sentence would a returning (SMS) visitor skip? Is information repeated between hero, how-it-works and FAQ? Does a prefilled visitor see anything they already told us? Cut before you add, and A/B anything that removes text only after one week of baseline. Known candidates to trim: hero sub copy, "wall of fun" quotes on the SMS page, FAQ items answered by the booking card.

## 7. Test checklist

Test at 390px and 1440px, in a private window (clean `sessionStorage`), then again in the same tab to test memory.

1. **No params** → default tier (Ages 3–7 tabs: Magic, Dinosaurs, Construction); toggle to 8–16 shows Robotic, Deep Sea Ruins, Dragons; choice survives reload in the same tab.
2. **`?world=robotic-takeover&age=9`** → older tier, world picked, collapsed to name, age prefilled, `age`/`world` params handled and personal ones stripped from the URL.
3. **`?age=5`** → young tier. **`?age=12`** → older. **`?tier=older`** wins over default, loses to `?world=`.
4. **Conflict:** pick Dragons, set age 4 → note appears with two buttons; each button works on first tap; "Keep" removes the note; repeating does not flicker.
5. **No world chosen, type age 11** → tier switches silently.
6. **Tier toggle inside the booking form** clears a world chosen from the other tier.
7. **Custom world:** `?custom=` text prefills; wording matches the tier; +$100 shows in total.
8. **Voucher:** `?code=CRAFT50VIP` applies on load, survives navigation to other pages in the same tab, total drops $50; wrong code shows an error; verify the four totals ($280 / $230 / $380 / $330) match the four Square links.
9. **Payment:** SDK mode and link mode both. The server function (`square-payment-function.js`) has NOT been tested against live Square: test sandbox first, then one real low-value booking, and confirm the booking note contains age and tier.
10. **Required fields:** child name and age block submit with a clear message; age 0 and 19 rejected.
11. **Klaviyo:** after a test submit, check the profile has `ck_party_world`, `ck_party_for`, `ck_party_age`, `ck_party_tier`. Click each email link and check merge tags rendered (no literal `{{ }}` in URLs).
12. **SMS page (`book.html`):** sticky "Back to booking ↑" appears on mobile when the form is off-screen, scrolls to the booking card, and is tracked as `sms_back_to_booking`.
13. **Revert flag:** set `tiersEnabled:false`, rebuild, confirm no tier UI, three worlds, booking still works; set back to true.
14. **Accessibility:** tier toggle buttons use `aria-pressed`; keyboard through toggle, world cards, form; focus visible; contrast on the red CTA.
15. **Layout:** no horizontal scroll at 390; FAQ expands/collapses; images load; footer links work.
16. **Emails:** open all three in Gmail, Outlook and iOS Mail (Litmus or send-to-self); check dark mode, links, unsubscribe.
17. **Analytics:** confirm events fire for tier toggle, world pick, voucher applied, CTA clicks, sticky bar.

## 8. Known flags and open items

- Pricing for the older tier is assumed the same as the young tier. Confirm.
- "Game Master" vs "host" wording is inconsistent in places; pick one.
- "Four games" claims in FAQ, includes list and emails don't fit the activity-based worlds.
- Hero sub copy only names dinosaurs, construction and deep sea; hero says "Ages 3–16".
- Dragons & Warriors and Magic & Creatures overlap in theme; watch which one wins in the data.
- About page bio names the founder's child; confirm they're happy for that to stay.
- Privacy page no longer lists child name and age (see 4.10).
- Email hero images are `[PHOTO]` placeholders; the `[FOUNDER FIRST NAME]` token needs filling.
- Google Fonts are blocked in the author's sandbox, so local screenshots may show fallback fonts; that is not a bug.
- The Design canvas could not be render-tested by the author; logic was tested in a stub only. Check the boards in the app.

## 9. Skills used to review this site

In `skills/`: `craftkit-usability-analyzer.md` (UX, conversion and accessibility audit plus competitor field, run per market and per age group) and `craftkit-eds-component-checker.md` (EDS components and theme check). `skills/README-skill-changes.md` lists what differs from the originals. Run both after any meaningful page change and before launch.
