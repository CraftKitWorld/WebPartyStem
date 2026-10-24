# CraftKit kids-party site: how it all works

> Latest version = this folder. History and older versions: see `VERSIONS.md`.

Start here, then read `HANDOVER.md` for decisions and the test checklist.

## The pieces

- **Pages** (`index.html` Meta landing, `book.html` SMS landing, about, privacy, after-school): generated. Don't hand-edit.
- **Data and copy** (`craftkit-products.js`): worlds, age groups, prices, steps, FAQ, page text. Edit here.
- **Components** (`craftkit-sections.js`, `craftkit-booking.js`, `craftkit-memory.js`, `craftkit-chrome.js`): layout and behaviour. They read the data above.
- **Comms** (`comms/copy/emails.md`, `social.md`): all email and social copy. `comms/build_comms.py` builds `email/*.html` and `social/*`. Zipped as `craftkit-email-and-social.zip`.
- **Payments** (`square-payment-function.js`): server function. Not yet tested against live Square.
- **Skills** (`skills/`): the usability and EDS checker skills, with a change log.
- **Backup** (`_archive-3-themes/`): the pre-age-group site.

## Typical jobs

| I want to... | Do this |
|---|---|
| Change page text | Edit `party.copy` in `craftkit-products.js`, rebuild |
| Change a world or add one | Edit `party.items`, add its id to the server function, rebuild site and comms |
| Change email or social copy | Edit the `.md` file, run `python3 build_comms.py --png` in `comms/` |
| Go back to 3 worlds, no ages | `tiersEnabled: false`, rebuild |

Rebuild site: `python3 gen_pages.py && python3 gen_after.py && python3 build2.py` (sources in `craftkit-build-sources.zip`; see `build/README-build.md` inside for the path changes).

## How a visit flows

1. Link arrives (`?world=&age=&first=&code=`) or no params.
2. Tier (age group) chosen: world > tier > age > remembered > default young.
3. Personal fields are stored in the browser session and removed from the address bar.
4. Visitor picks or confirms a world, enters child name and age, voucher is applied, pays via Square.
5. Details go to Klaviyo (`ck_party_*`), which feeds the emails.
