# CraftKit Design System (design.md)

Source of truth for the CraftKit website (Birthday parties; STEM camps and after-school are paused drafts), the VIP voucher email and the Letter poster. Written so it can be converted into a `tailwind.config.js` / `@theme` block.

Brand feel: bold, flat, high-contrast, hands-on and playful. Square corners, thick ink borders, big display type, flat colour blocks. No shadows, no gradients, no rounded corners.

---

## 1. Colour tokens

### Core (website, email, poster)

| Token | Hex | Use | Contrast notes |
|---|---|---|---|
| `ink` | `#141212` | Body text, headings, borders, dark sections, footer, ink buttons | 17:1 on white |
| `coral` (accent) | `#D63A28` | Primary CTA, accent numerals, rules, highlights | White text on coral 4.67:1 (AA). Do not use coral text on tint for small text |
| `tint` (was `tint`) | `#FFF0C9` (`--en-palette-tint`) | Soft section backgrounds, hover on white buttons | Ink on tint 14:1 |
| `rule` | `#E3A79E` | Dividers, thin decorative lines | Decorative only |
| `muted` | `#4A4442` | Secondary text, prices, helper text | 9:1 on white, 7:1 on tint |
| `white` | `#FFFFFF` | Page background, inputs, light buttons | |
| `paper` | `#FAFAFA` | Payment placeholder box background | |
| `placeholder` | `#5A5A5A` | Input placeholder text | 7:1 on white |

### Accent options (exposed as a tweak on every page)

| Option | Hex |
|---|---|
| Coral (default) | `#D63A28` |
| Blue | `#1F5FBF` |
| Green | `#2E7D4F` |

The accent drives `--coral` (buttons, numerals, schedule rules). Keep it a CSS variable so one value re-themes the page.

### Poster extras (print, themes banner)

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FFF6E5` | Poster background |
| `indigo` | `#2E2A6B` | Poster hero and footer |
| `sun` (yellow) | `#FFD23F` | Themes banner, "Magic" highlight, section card 1 |
| `mint` | `#8FD9CB` | Section card 2 |

### Image placeholder fills (dark, so white captions stay legible)

`#3A2E2A`, `#7A5226`, `#4B2E6B` (dragons), `#1F4068` (space), `#4A5045` (robots), `#2B2D26`.
Placeholder pattern: diagonal stripes `repeating-linear-gradient(135deg, rgba(255,255,255,.07) 0 14px, transparent 14px 28px)` over the fill, caption in white 13px / 500 / +0.04em.

### Interaction colours

| State | Value |
|---|---|
| Coral button hover | `filter: brightness(.88)` |
| White button hover | background `tint` |
| Ink button hover | `#3A3433` |
| Outline button hover | fill `ink`, text white |
| Social icon hover | background `#2A2A2A` |
| Disabled | opacity .5, `cursor: not-allowed` |

---

## 2. Typography

| Role | Family | Fallback stack |
|---|---|---|
| Display / headings | **Bricolage Grotesque** (600, 700, 800) | `'DM Sans', system-ui, sans-serif` |
| Body / UI | **DM Sans** (400, 500, 700) | `system-ui, -apple-system, 'Segoe UI', sans-serif` |

Google Fonts: `family=Bricolage+Grotesque:wght@600;700;800&family=DM+Sans:wght@400;500;700`

Global: body 17px, line-height 1.5, colour `ink`, `-webkit-font-smoothing: antialiased`.
All headings: weight 700, **letter-spacing -0.035em**, margin 0. Display 800 used for ticker and numerals.

| Style | Size | Weight | Line height | Notes |
|---|---|---|---|---|
| Hero h1 (Parties) | `clamp(52px, 9.5vw, 120px)` | 700 | 0.88 | max width 9.5em |
| Hero h1 (STEM) | two lines: `clamp(34px, 5vw, 60px)` then `clamp(52px, 9.5vw, 120px)` | 700 | 1 then 0.88 | flexible width, max 18em |
| Section h2 | `clamp(34px, 4vw, 52px)` (some `clamp(34px, 5vw, 60px)`) | 700 | 1 to 1.05 | |
| Card h3 | 32px / 36px | 700 | 1.05 | |
| Ticker | `clamp(32px, 4.4vw, 56px)` | 800 | 1 | letter-spacing -0.03em |
| Lead paragraph | 19px to 22px | 400 to 500 | 1.5 | |
| Body | 17px | 400 | 1.5 | |
| UI / labels / nav | 16px | 500 | 1.3 | form labels 500 |
| FAQ summary | 18px | 500 | | |
| Small / helper | 15px | 400 | | colour `muted` |
| Micro / captions | 13px to 14px | 500 to 700 | | uppercase eyebrows use +0.14em tracking |

Minimum body size on mobile: 16px. Never go below 13px (placeholders and captions only).

---

## 3. Layout and spacing

- Page container `.wrap`: `max-width: 1296px`, centred, horizontal padding `clamp(20px, 4vw, 48px)`.
- Design canvas widths: desktop 1440px, mobile test 390px. Fluid between.
- Section vertical padding: `clamp(56px, 8vw, 104px)` or `clamp(64px, 9vw, 112px)` top and bottom.
- Grids: CSS grid with `repeat(auto-fit, minmax(min(Npx, 100%), 1fr))`. World cards: 4 across on desktop, 2 on tablet, 1 on mobile. Form rows: `minmax(min(200px, 100%), 1fr)`, gap 16px.
- Common gaps: 6, 8, 12, 16, 20, 24, 28, 32, 48, 64px.
- Radius: **0 everywhere** (buttons, inputs, cards, images).
- Borders: 2px solid `ink` for inputs and cards, 3px for poster cards and banner rule, 1px solid `ink` for FAQ dividers, 1px solid `coral` for schedule rows.
- Shadows: none.

### Tailwind mapping hint

```js
// tailwind.config.js (v3 style)
theme: {
  extend: {
    colors: {
      ink: '#141212', coral: '#D63A28', tint: '#FFF0C9',
      rule: '#E3A79E', muted: '#4A4442', paper: '#FAFAFA',
      cream: '#FFF6E5', indigo: '#2E2A6B', sun: '#FFD23F', mint: '#8FD9CB',
    },
    fontFamily: {
      display: ['"Bricolage Grotesque"', '"DM Sans"', 'system-ui', 'sans-serif'],
      body: ['"DM Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
    },
    letterSpacing: { display: '-0.035em' },
    maxWidth: { wrap: '1296px' },
    borderRadius: { DEFAULT: '0' },
  },
}
```

Tailwind v4 equivalent: put the same tokens in `@theme { --color-ink: #141212; --font-display: ...; }`.

---

## 4. Components

### Buttons (`.btn`)
- Inline-flex, centred, gap 10px, **min-height 52px**, padding 14px 28px, font DM Sans 700 17px/1.2, 2px transparent border, radius 0.
- Variants: `btn-coral` (coral bg, white text), `btn-white` (white bg, ink text), `btn-ink` (ink bg, white text), `btn-outline` (transparent, ink border and text).
- Arrow glyph `→` in an `aria-hidden` span after the label.

### Inputs (`.input`)
- Width 100%, min-height 52px, padding 12px 14px, 2px solid ink, white bg, 17px DM Sans, radius 0. Textarea min-height 120px, vertical resize.
- Label above, 16px / 500. Optional marker "(optional)" in `muted`, weight 400.
- Fields are grid with 6px gap.

### Focus ring (global)
`:focus-visible { outline: 3px solid #141212; outline-offset: 3px; box-shadow: 0 0 0 6px #fff; }`

### Skip link
Hidden at `top: -100px`, appears at `top: 12px; left: 12px` on focus, white bg, ink 2px border, padding 12px 18px, bold.

### Header / nav
Absolute over the hero, white text, links min-height 44px, 16px / 500, hover or `aria-current` = underline with offset 6px (2px thick when current). Logo: stacked-layers mark (SVG, `currentColor`) + "CraftKit" wordmark (Bricolage 800, 34px, -0.035em) + "BUILD YOUR DREAMS" eyebrow (11px / 700 / +0.14em).

### Ticker / marquee
Track `display: flex; width: max-content; animation: marquee 38s linear infinite` moving `translateX(0) -> translateX(-50%)`. The list is duplicated so the loop is seamless. Items separated by a coral asterisk glyph. Pause/play button provided. `prefers-reduced-motion`: animation off.

### Testimonial carousel
3 slides, auto-advance every 7s, pause button, prev/next buttons, respects reduced-motion (no auto-advance). `aria-live` polite when paused, off when auto-rotating.

### World cards (Parties)
Image placeholder, h3 world name, price line `[PRICE] · [DEPOSIT] deposit to book`, button "Reserve {world}" which selects the world in the payment section. Worlds: Deep Blue, Jungle Life, Dinosaurs, Wizard Magic.

### FAQ (`details/summary`)
Top border 1px ink on each, last item also bottom border. Summary min-height 64px, 18px / 500, `+` icon at 34px/300 that becomes `−` when open. Answer max width 62ch.

### Schedule list
Rows with `display: flex; justify-content: space-between`, padding 22px 0, 1px coral top border (last row also bottom). Time in `muted`.

### Payment box (Square placeholder)
2px dashed ink border, `paper` bg, padding 28px 20px, centred, min-height 150px. Title Bricolage 20px. Hooks: `data-square-checkout="[SQUARE LOCATION ID]"`. Order summary rows `.sumrow` with 1px coral top border, value bold.

### Newsletter / Klaviyo
Hook: `data-klaviyo-list="[KLAVIYO LIST ID]"`. Blush panel "Not ready for a deposit? Stay in the loop." plus footer signup.

### Footer
Ink background, white text, social icons 44x44 touch targets, address and phone, link underline on hover.

---

## 5. Motion

- Marquee 38s linear infinite. Carousel advance 7s. Smooth scroll on anchors.
- All motion has a visible pause control and is disabled under `prefers-reduced-motion: reduce` (including `scroll-behavior: auto`).

---

## 6. Accessibility rules

- Skip link, landmarks (`header`, `nav`, `main`, `footer`), one h1 per page.
- Real `button` / `a` / `label` / `fieldset+legend` elements; no div buttons.
- Touch targets at least 44px (buttons 52px).
- Contrast AA minimum on every text and background pair listed above.
- Visible focus ring on every interactive element.
- Images have alt text (placeholders carry `role="img"` with `aria-label`).
- Forms: required fields marked, errors announced, success message in an `aria-live` region.

---

## 7. Email design (VIP voucher)

- Outer background `#F4ECE9`, content column **600px** white, centred, 40px side padding inside.
- Header ink bar with logo, hero photo 280px tall, greeting 20px / 500, h1 36px / 700 / -0.035em.
- Voucher block: ink background, white text, "YOUR CODE" 13px / 700 / +0.14em, code 48px Bricolage 800 (`GORGEVIP50`), coral CTA.
- Section divider: 2px `rule` lines with an asterisk glyph.
- Reply-prompt section: blush background, 44px/40px padding, three theme picks (Dragons, Space, Robots).
- Footer: ink, 14px text, address, phone, unsubscribe link.
- Email-safe notes: table layout, inline styles, Arial/Helvetica fallbacks for display type, bulletproof buttons, linked cards (mailto) in place of radio inputs, since most email clients strip form controls.

---

## 8. Poster design (Letter portrait, 816 x 1056 px at 96 dpi)

- Margins at least 40px. Body at least 16px. Flat colour blocks, legible in grayscale.
- Order: indigo hero (330px) with h1 64px / 700 and yellow "Magic", yellow themes banner (58px, 26px / 800, coral asterisk separators, 3px ink bottom border), subhead 21px / 700, coral QR band (132px dashed QR placeholder), two cards (yellow, mint) with 3px ink borders, indigo footer line.
- QR placeholder: 132px, white, 3px dashed ink, three corner markers, "[QR CODE]" label.

---

## 9. Copy and voice

Warm, plain-spoken, parent-first. Talk about the child's joy and the parent getting to enjoy the day. Avoid scare-the-parent contrast copy and clichés. Prompts invite a reply: "What is your child obsessed with right now?"

Placeholders to replace before launch: `[PRICE]`, `[DEPOSIT]`, `[SQUARE LOCATION ID]`, `[KLAVIYO LIST ID]`, `[YOUR EMAIL]`, `[Your Name]`, `[Your Business Phone]`, `[QR CODE]`, and all `[PHOTO: ...]` image slots.

---

## 10. Tracking (Google Analytics 4 + Klaviyo)

Placeholders only. Replace `G-XXXXXXXXXX` (GA4 Measurement ID) and `YOUR_KLAVIYO_PUBLIC_API_KEY` (Klaviyo Public API Key / Company ID) in the `<head>` of `index.html` and `stem-camps.html`.

- Helpers `ckTrack(name, params)` and `ckIdentify(props)` send to GA4 (`gtag`) and Klaviyo (`_learnq`) and do nothing if either is missing. Run `window.CK_DEBUG = true` in the browser console to see every event.
- Any element with `data-track="id"` reports `cta_click` with `cta_id` automatically.
- UTM values (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) are remembered for the session and attached to every event.

| Event | Fires when |
|---|---|
| `cta_click` (`cta_id`) | Header, hero, banner, sticky and big "Book" buttons, hero "Check available dates", nav links, "Join the 2027 Priority Waitlist" |
| `select_world` | A party world is chosen (card button or checkout picker) |
| `begin_checkout` | First world chosen |
| `apply_promotion` | Voucher code applied (`valid` true or false) |
| `purchase` | Party deposit or STEM deposit submitted (`value` and `transaction_id` are TODOs for Square) |
| `generate_lead` | Party enquiry or STEM waitlist submitted (`lead_type`, themes, breaks, afterschool) |
| `sign_up` | Footer newsletter, or the STEM no-deposit waitlist path |
| `select_waitlist_path` | STEM deposit or no-deposit choice changed |
| `email_pick` | Visit from an email pick link (`?interest=Dragons`) |

Klaviyo profile properties set on form submit: `ck_theme_interest`, `ck_theme_other`, `ck_child_ages`, `ck_location`, `ck_break_interest`, `ck_afterschool_interest`, `ck_waitlist_path`, `ck_party_world`, `ck_party_date`, `ck_voucher`, `ck_interest`, `ck_source`.

Email: every link has `utm_source=klaviyo&utm_medium=email&utm_campaign=vip-voucher&utm_content=...`. The three picks open `/parties?interest=Dragons|Space|Robots`. Set the Klaviyo campaign Reply-To to an inbox you monitor for "just hit reply".

Poster: build the QR link as `https://[YOUR-SITE]/?utm_source=poster&utm_medium=qr&utm_campaign=gorge-launch&utm_content=[LOCATION]` and use a different `utm_content` per place you hang it.

## 11. Layout and spacing spec (add this when converting to Tailwind or React)

Colors and fonts alone do not reproduce the layout. Use these structural rules too.

- Container: `max-width 1296px; margin 0 auto; padding-inline clamp(20px, 4vw, 48px)` (class `wrap`). Every section's content sits inside it.
- Section vertical rhythm: desktop 96px top and bottom (`py-24`), mobile 56px (`py-14`). Alternate backgrounds: white, tint (#FFF0C9), ink (#141212).
- Header: ink background, flex row, logo left, nav centre or right, coral "Book a party" button far right, min-height 80px, wraps on mobile.
- Hero: ink background, min-height 760px desktop, headline clamp(52px, 8vw, 120px) with line-height 0.95, two buttons 16px apart, 32px gap between headline, buttons and the info line.
- Ticker: full width, 2px ink borders top and bottom, text clamp(32px, 4.4vw, 56px) weight 800, scrolls left, pause button at right.
- Cards (worlds): 4 columns at 1024px and up, 2 at 640px, 1 below. 24px gap. Image 4:3, then 20px, title, then price and button on one row, then bullets.
- Headings: margin 0 by default; spacing comes from the parent (`mt-*`, `gap-*`). Base rules must live in `@layer base` so utilities can override them.
- Buttons: min-height 52px, padding 14px 28px, 2px border, square corners.
- Forms: 2 columns on desktop, 1 on mobile, 16px gaps, labels 14px above inputs, inputs min-height 52px with 2px ink border.
- Footer: ink background, 48px padding, newsletter on the right at desktop.
- Delivery: ship compiled CSS (Tailwind CLI, Vite or Next). Do not rely on the Play CDN for anything beyond a quick test.

## 12. EDS theme (for the design-system build)

The same tokens now exist as CSS variables in `eds-theme/craftkit-theme.css` with a Tailwind preset in `eds-theme/tailwind.eds-preset.js`. Variable names are guesses at the EDS pattern and must be renamed to match the repo. See `eds-theme/README.md`.

## 13. Stylesheet setup
All pages link one shared compiled stylesheet, `craftkit.css`, plus `eds-theme/craftkit-theme.css`. The Tailwind source is `tailwind-source/input.css` and `tailwind-source/tailwind.config.js`. Rebuild with:
`npx tailwindcss@3.4.16 -c tailwind-source/tailwind.config.js -i tailwind-source/input.css -o craftkit.css --minify`

## 14. Party pages, products and booking (latest)

- **Pages:** `index.html` is the Meta-ad landing page (story first, booking near the end, booking CTAs throughout). `book.html` is the SMS landing page (booking card at the very top, `noindex`). `about.html`, `privacy.html` unchanged in structure. `stem-camps.html` (paused) and `after-school.html` (reworded copy, no payment) are drafts, `noindex` and not linked in any nav.
- **Worlds:** five game-based worlds live in `craftkit-products.js` (`window.CK_PRODUCTS.party.items`): tagline, description, four games (name + type), six photo slots and a CTA label each. One price, `party.price` = $300, drives every price on the pages. Game types (Chase, Quick reaction, Sneak, Team relay) are defined once in `party.gameTypes`.
- **Photos and galleries:** every photo slot is a label now, and becomes `{src, alt}` when you have images. `party.galleryMode` switches all galleries between an even grid and a swipe carousel; any gallery can override it with `data-gallery="grid|carousel"`. The Meta page shows a "See a CraftKit party in action" carousel (8 photos) in addition to the six photos per world.
- **Booking:** `craftkit-booking.js` is one component: pick a world, enter details, then the date calendar sits directly above the order summary and the Pay button in the same box. Settings (lead days, booked dates, voucher, Square links) are at the top of the file or `window.CK_BOOKING`. Link parameters `?world=<id>&code=<code>` preselect a world and apply a voucher (used by emails and SMS).
- **Payment:** Square Payment Links with fixed prices: $280 standard, $230 with the $50 voucher, $380 for "Choose your own world" and $330 with the voucher (four links). Until the real links are pasted in, the button shows a preview confirmation instead of redirecting.
- **Tint:** cream `#FFF0C9` (`--en-palette-tint`) replaces the old pink everywhere on the site; the VIP email still uses pink by request.
- **Tokens:** colours, fonts and radius come from `eds-theme/craftkit-theme.css`; variable names are guesses until compared with the EDS repo.
