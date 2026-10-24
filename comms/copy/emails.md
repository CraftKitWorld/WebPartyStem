# CraftKit email copy

Edit the text after each `key:` and run `python3 build_comms.py` (from the `comms` folder). The three email HTML files in `../email/`
and the social ads in `../social/` are rebuilt from these files. Do not edit the generated HTML by hand: your changes would be overwritten.

Rules
- One `key: value` per line. A line that starts with two spaces continues the line above it.
- Price tokens: `{price}` `{customPrice}` `{voucherOff}` `{voucherPrice}` `{upcharge}` read from `craftkit-products.js`, so a price change there updates every email.
- Square brackets, e.g. `[FOUNDER FIRST NAME]`, are placeholders to replace before sending.
- `<strong>…</strong>` is allowed. Other HTML is not.
- The party worlds and their one-line descriptions in Email 2 come from `craftkit-products.js` (the same data as the website), not from this file.
- "How it works" steps in Email 1 also come from `craftkit-products.js` (`party.steps`).
- Merge tags like the first name and the child's age are added by the build script; do not type Klaviyo `{{ }}` tags here.

## shared
voucher_code: CRAFT50VIP
signoff: See you at the party,
founder: [FOUNDER FIRST NAME]
place: CraftKit, Hood River & Melbourne

## email-1-welcome-voucher
subject: Your {voucherOff} CraftKit voucher is inside
preheader: A birthday where the kids play, and you actually get to enjoy it.
label: MISSION BRIEFING · PARTY ADVENTURES
hero_photo: HERO PHOTO: kids in cardboard badges, mid-game, laughing (not posed)
headline: A birthday party where the kids are too busy playing to get bored.
intro1: I'm [FOUNDER FIRST NAME], and I run CraftKit. We turn your home or backyard into a life-sized story world, with crafting and story quests for ages 3–7 and squad missions for ages 8–16.
intro2: Our Game Master brings the games, the props and the hosting. The kids spend the party playing, creating and racing. You get to enjoy it.
voucher_line: Here's {voucherOff} off, to say welcome.
voucher_cta: Pick a date and use my {voucherOff}
how_heading: How it works
note: Dates book up 3 to 4 weeks ahead, so it's worth choosing early.
ps: Not sure which world? Hit reply and tell me your child's age and what they're into right now. I'll point you to the right one.

## email-2-pick-a-world
subject: Which world would your child pick?
preheader: Crafting quests for ages 3–7. Squad missions for ages 8–16.
label: TOP SECRET · FOR BIRTHDAY HEROES
hero_photo: HERO PHOTO: the piñata finale, kids mid-cheer
headline: Pick the adventure. We bring the rest.
intro1: Every CraftKit party is a world your child steps into, fully hosted by our Game Masters. Zero stress, zero planning, screen-free fun.
intro2: Pick the age group, then the world. Or choose your own for {upcharge} more. <strong>Which one sounds like your child?</strong>
custom_title: Choose your own world
custom_blurb: Tell us what your child loves and we build the adventure around it. +{upcharge}.
note: Not sure which age group fits? Reply with your child's age and we'll point you to the right one.
cta: See the party worlds
ps: Planning ahead? Dates book up 3 to 4 weeks out, and your {voucherOff} voucher is waiting.

## email-3-voucher-expiry
subject: Your {voucherOff} is about to run out
preheader: Dates are filling up. Here's how to keep yours.
label: DATES FILLING UP · {voucherOff} EXPIRES [EXPIRY DATE]
quote_label: FROM A CRAFTKIT PARENT
quote: [REAL QUOTE FROM A REAL PARENT]
quote_who: [Parent first name], [Town]
quote_note: [PLACEHOLDER: use a real review you have permission to share. Don't publish an invented one.]
headline: Still thinking about the party? Here's an easy way to decide.
intro1: Your {voucherOff} welcome voucher runs out on [EXPIRY DATE]. If there's a birthday coming up in the next few months, now is a good time to hold the date.
intro2: Here's all that happens when you book:
step1_title: Pay {price} to hold your date
step1_body: Use {voucher_code} to take {voucherOff} off.
step2_title: Choose your world
step2_body: Pick the age group that fits, then the theme.
step3_title: We bring the adventure
step3_body: A Game Master arrives with the games and props and runs the party.
cta: Hold my date and use my {voucherOff}
ps: Not sure yet? Reply with your child's birthday month and I'll tell you which dates are still open. No pressure.
