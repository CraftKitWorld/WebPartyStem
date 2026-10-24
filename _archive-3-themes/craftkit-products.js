/* =====================================================================
   CraftKit products: the single source for every product on the site.
   To add, rename or remove a world, edit ONLY this file. The pages render
   their world tabs, galleries, game lists, booking options and ticker from
   it, so the same world can never differ between sections.

   Scaling notes
   - party.price is the one standard price (a simple Square payment). The
     voucher takes voucherOff off, and "Choose your own world" adds
     customUpcharge. Every price on the site reads from these three numbers.
   - party.faq, quotes, schedule and finalCta are the shared copy for BOTH
     landing pages (rendered by craftkit-sections.js). Edit them here, once.
   - Each world has: tagline, desc, games[] (name + type), photos[] (labels
     now, image URLs later) and cta. Game "type" keys are defined once in
     party.gameTypes so the plain-English explanation never differs.
   - tone: a placeholder photo tone (see --en-theme-photo-* in the theme).
     Replace a photo's label with { src, alt } when real images exist.
   - party.galleryMode: "grid" (mosaic) or "carousel" (swipe row, for when
     you have lots of photos). One setting; any gallery can override it with
     data-gallery="grid|carousel" on its container.
   - "camps" feeds the unlinked STEM draft page; "afterschool" feeds the
     unlinked after-school draft page.
   ===================================================================== */
window.CK_PRODUCTS = {
  "currency": "USD",
  "party": {
    "price": 280,
    "priceLabel": "$280",
    "voucherOff": 50,
    "customUpcharge": 100,
    "galleryMode": "grid",
    "faq": [
      [
        "Where are the parties held?",
        "<p>At your home, backyard or a venue you choose. We bring everything, so there is nothing to buy or set up. [CONFIRM: indoor options for bad weather]</p>"
      ],
      [
        "What ages is it for?",
        "<p>[Best for ages 00 to 00. Younger or older siblings are welcome to join in, and parents are welcome to stay and watch.] [CONFIRM]</p>",
        true
      ],
      [
        "What do the four games look like?",
        "<p>Every world has the same four types of game, each themed to the adventure. <strong>Chase:</strong> run, dodge and tag. <strong>Quick reaction:</strong> a dial calls the move and the kids respond as fast as they can. <strong>Sneak:</strong> creep past without being spotted. <strong>Team relay:</strong> teams race together to finish the mission. A piñata finale ends the party.</p>",
        true
      ],
      [
        "What does “choose your own world” mean?",
        "<p>If none of the three worlds fits, tell us the theme your child loves and we'll build the four games and props around it. It costs {upcharge} more, so {customPrice} in total. [CONFIRM what you can build, and how much notice you need]</p>",
        true
      ],
      [
        "What is included in the price?",
        "<p>Every party is {price} and includes a friendly host who runs the whole party, the four games for your child's world, all the props and costumes, and the piñata finale. Choosing your own world is {upcharge} extra. [CONFIRM: number of guests included, set-up and pack-down.]</p><p>After you book we'll send a Party Pack with everything you need to know.</p>",
        true
      ],
      [
        "How long is the party and how many kids can come?",
        "<p>[Parties run 00 hours and suit up to 00 children. Extra children can be added for $00 each.] [CONFIRM]</p>"
      ],
      [
        "How much space do you need?",
        "<p>[A flat area of about 00 x 00 feet, indoors or outdoors. A backyard, park or hall all work.] [CONFIRM]</p>"
      ],
      [
        "What if it rains?",
        "<p>[Describe your wet-weather plan: indoor version, a covered area, or a free date change.] [CONFIRM]</p>"
      ],
      [
        "Is it safe? What about food and allergies?",
        "<p>[Describe safety: adult hosts, supervision, how the games and props are kept safe.]</p><p>We don't provide any food, so you can bring snacks and cake as you like. [CONFIRM: what is inside the piñata (sweets, small toys or empty), and whether you can fill it yourself for allergies.]</p>"
      ],
      [
        "How far ahead do I need to book?",
        "<p>Dates book up [3 to 4 weeks] ahead, and online booking closes [21] days before the party. Need something sooner? Call or text <a class='underline' href='tel:+15412884132'>+1 (541) 288-4132</a> and we'll see what we can do.</p>"
      ],
      [
        "Can I change or cancel my date?",
        "<p>You can move your date for free if you ask more than 10 days before the party. [CONFIRM cancellation and refund policy]</p>",
        true
      ]
    ],
    "quotes": [
      {
        "q": "[PARENT QUOTE 1: paste a real review of a CraftKit party here]",
        "w": "[Parent name · Jurassic Dinosaurs party]"
      },
      {
        "q": "[PARENT QUOTE 2: paste a real review of a CraftKit party here]",
        "w": "[Parent name · Construction & Diggers party]"
      },
      {
        "q": "[PARENT QUOTE 3: paste a real review of a CraftKit party here]",
        "w": "[Parent name · Deep Sea Exploration party]"
      }
    ],
    "schedule": [
      [
        "Welcome and costumes",
        "[00 min]"
      ],
      [
        "Game 1: the chase",
        "[00 min]"
      ],
      [
        "Game 2: quick reaction",
        "[00 min]"
      ],
      [
        "Game 3: sneak",
        "[00 min]"
      ],
      [
        "Game 4: team relay",
        "[00 min]"
      ],
      [
        "Piñata finale",
        "[00 min]"
      ],
      [
        "Cake and photos",
        "[00 min]"
      ]
    ],
    "finalCta": {
      "headline": "Give them a party they will talk about for weeks",
      "button": "Book now"
    },
    "includes": [
      "A friendly host who runs the whole party",
      "Four games built around your child's world",
      "All the props and costumes (badges, gates, hard hats and more)",
      "The big piñata finale",
      "Set-up before the kids arrive [CONFIRM: and pack-down after]"
    ],
    "gameTypes": {
      "chase": {
        "label": "Chase",
        "blurb": "Run, dodge and tag"
      },
      "react": {
        "label": "Quick reaction",
        "blurb": "Follow the dial's call as fast as you can"
      },
      "sneak": {
        "label": "Sneak",
        "blurb": "Creep past without being spotted"
      },
      "relay": {
        "label": "Team relay",
        "blurb": "Teams race together to finish the mission"
      }
    },
    "photoWall": [
      "Crew photo at the finale",
      "The host explaining a game",
      "Parents laughing on the sidelines",
      "The piñata moment",
      "Birthday child in costume",
      "Kids planning their next move",
      "Cake and photos",
      "The yard, transformed"
    ],
    "items": [
      {
        "id": "jurassic-adventure",
        "kind": "world",
        "name": "Jurassic Dinosaurs",
        "short": "Dinosaurs",
        "tone": "forest",
        "tagline": "Escape the Raptor Pack & Crack the Fossil Code.",
        "desc": "Transform your yard into a dinosaur sanctuary! Kids put on cardboard field badges, make their way through the T-Rex Skull Gate, sneak past sleeping raptors, and smash open the Fossil Egg Piñata.",
        "games": [
          {
            "name": "Raptor Pack Tag",
            "type": "chase"
          },
          {
            "name": "Dino Dial Command & Reaction",
            "type": "react"
          },
          {
            "name": "Fossil Freeze Stealth",
            "type": "sneak"
          },
          {
            "name": "Egg Rescue Relay",
            "type": "relay"
          }
        ],
        "photos": [
          "Kids in cardboard field badges",
          "The T-Rex Skull Gate",
          "Raptor Pack Tag in action",
          "Sneaking past sleeping raptors",
          "The Dino Dial",
          "Fossil Egg Piñata smash"
        ],
        "cta": "Get Jurassic Party Pack"
      },
      {
        "id": "build-and-demolition",
        "kind": "world",
        "name": "Construction & Diggers",
        "short": "Construction",
        "tone": "desert",
        "tagline": "Build the Site. Then Bring It Down.",
        "desc": "Put on your hard hats! Crew members make their way past caution-tape barricades, dodge traffic jams, race through pylon slaloms, and demolish the site with a wrecking ball piñata.",
        "games": [
          {
            "name": "Traffic Sign Command & Reaction",
            "type": "react"
          },
          {
            "name": "Steamroller Stealth",
            "type": "sneak"
          },
          {
            "name": "Detour Crossing",
            "type": "chase"
          },
          {
            "name": "Pylon Slalom Relay",
            "type": "relay"
          }
        ],
        "photos": [
          "Kids in hard hats",
          "Caution-tape barricades",
          "The pylon slalom",
          "The traffic sign dial",
          "Steamroller stealth",
          "Wrecking ball piñata"
        ],
        "cta": "Get Construction Party Pack"
      },
      {
        "id": "deep-sea-explorers",
        "kind": "world",
        "name": "Deep Sea Exploration",
        "short": "Under the sea",
        "tone": "ocean",
        "tagline": "Dodge the Kraken. Secure the Sunken Treasure.",
        "desc": "Dive into a deep-sea adventure! Submariners dodge the Kraken's tentacle chain, tiptoe past sleeping anglerfish, race through shipwreck anchors, and crack open the Sunken Chest Piñata.",
        "games": [
          {
            "name": "Kraken Tentacle Tag",
            "type": "chase"
          },
          {
            "name": "Sonar Dial Reaction",
            "type": "react"
          },
          {
            "name": "Deep Ocean Stealth",
            "type": "sneak"
          },
          {
            "name": "Pearl Rescue Relay",
            "type": "relay"
          }
        ],
        "photos": [
          "Submariners ready to dive",
          "The Kraken tentacle chain",
          "The sonar dial",
          "Anglerfish stealth",
          "Shipwreck anchor course",
          "Sunken Chest Piñata"
        ],
        "cta": "Get Deep Sea Party Pack"
      },
      {
        "id": "custom-world",
        "kind": "custom",
        "name": "Choose your own world",
        "short": "Your idea · +$100",
        "tone": "cocoa",
        "tagline": "Tell us what your child loves. We build the adventure.",
        "desc": "Not seeing the right world? Tell us the theme your child is obsessed with and we'll build the four games and the props around it, with the piñata finale. [CONFIRM what you can and can't build, and how much notice you need]",
        "games": [],
        "photos": [],
        "cta": "Choose your own world"
      }
    ],
    "retiredWorlds": [
      {
        "id": "speed-lab-flight-school",
        "kind": "world",
        "name": "Speed Lab & Flight School",
        "short": "Planes & vehicles",
        "tone": "slate",
        "tagline": "Mach 1 Action. Clear the Runway.",
        "desc": "Earn your wings! Pilots test their reflexes on the Throttle Dial, dodge enemy radar, race through a flight-pylon obstacle course, and trigger the Jet Engine Piñata drop.",
        "games": [
          {
            "name": "Interceptor Tag",
            "type": "chase"
          },
          {
            "name": "Throttle Dial Reaction",
            "type": "react"
          },
          {
            "name": "Radar Stealth",
            "type": "sneak"
          },
          {
            "name": "Refuel Relay",
            "type": "relay"
          }
        ],
        "photos": [
          "Pilots with their wings",
          "The Throttle Dial",
          "Radar stealth",
          "The flight-pylon course",
          "Refuel relay",
          "Jet Engine Piñata drop"
        ],
        "cta": "Get Speed Lab Party Pack"
      },
      {
        "id": "enchanted-realm",
        "kind": "world",
        "name": "Enchanted Realm",
        "short": "Unicorns & magic",
        "tone": "violet",
        "tagline": "Step Through the Rainbow Arch into Magic.",
        "desc": "Embark on an enchanted quest! Guardians use the Magic Crystal Dial to find their way through the forest, outsmart dark clouds, cross the lava swamp, and release the Sparkle Cloud Piñata.",
        "games": [
          {
            "name": "Crystal Dial Reaction",
            "type": "react"
          },
          {
            "name": "Sleepy Cloud Stealth",
            "type": "sneak"
          },
          {
            "name": "Rainbow Arch Crossing",
            "type": "chase"
          },
          {
            "name": "Star Retrieval Relay",
            "type": "relay"
          }
        ],
        "photos": [
          "Guardians at the Rainbow Arch",
          "The Magic Crystal Dial",
          "Sleepy cloud stealth",
          "Crossing the lava swamp",
          "Star retrieval relay",
          "Sparkle Cloud Piñata"
        ],
        "cta": "Get Enchanted Party Pack"
      }
    ]
  },
  "camps": {
    "items": [
      {
        "id": "mars",
        "name": "Mars",
        "tone": "mars",
        "desc": "[ONE-LINE DESCRIPTION]"
      },
      {
        "id": "deep-blue",
        "name": "Deep Blue",
        "tone": "ocean",
        "desc": "[ONE-LINE DESCRIPTION]"
      },
      {
        "id": "japan",
        "name": "Japan",
        "tone": "sakura",
        "desc": "[ONE-LINE DESCRIPTION]"
      },
      {
        "id": "the-gorge",
        "name": "The Gorge",
        "tone": "forest",
        "desc": "[ONE-LINE DESCRIPTION]"
      }
    ]
  },
  "afterschool": {
    "items": [
      {
        "id": "mars",
        "name": "Mars",
        "tone": "mars",
        "desc": "[ONE-LINE DESCRIPTION]"
      },
      {
        "id": "deep-blue",
        "name": "Deep Blue",
        "tone": "ocean",
        "desc": "[ONE-LINE DESCRIPTION]"
      },
      {
        "id": "japan",
        "name": "Japan",
        "tone": "sakura",
        "desc": "[ONE-LINE DESCRIPTION]"
      },
      {
        "id": "the-gorge",
        "name": "The Gorge",
        "tone": "forest",
        "desc": "[ONE-LINE DESCRIPTION]"
      }
    ]
  }
};

(function () {
  var P = window.CK_PRODUCTS;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  var STAR = '<svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><path d="M20 5v30M5 20h30M9.4 9.4l21.2 21.2M30.6 9.4L9.4 30.6"/></svg>';
  var ARROW_L = '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H4M10 6l-6 6 6 6"/></svg>';
  var ARROW_R = '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';
  function money(n) { return '$' + n; }
  function worlds() { return P.party.items.filter(function (p) { return p.kind === 'world'; }); }
  function options() { return P.party.items.filter(function (p) { return p.kind === 'world' || p.kind === 'custom'; }); }
  function find(key) {
    var all = options(); key = String(key || '').toLowerCase();
    for (var i = 0; i < all.length; i++) { if (all[i].id === key || all[i].name.toLowerCase() === key || (all[i].short || '').toLowerCase() === key) return all[i]; }
    return null;
  }

  /* One photo slot. A photo is a label (placeholder) or { src, alt }. */
  function photo(ph, tone, cls) {
    cls = cls || 'aspect-[4/3]';
    if (ph && ph.src) return '<img class="' + cls + ' w-full object-cover" src="' + esc(ph.src) + '" alt="' + esc(ph.alt || '') + '" loading="lazy">';
    var label = typeof ph === 'string' ? ph : (ph && ph.alt) || 'Photo';
    return '<div class="ph ' + cls + ' w-full h-full" role="img" aria-label="Photo placeholder: ' + esc(label) + '" style="--ph:var(--en-theme-photo-' + esc(tone) + ')"><span>[PHOTO: ' + esc(label) + ']</span></div>';
  }

  /* Gallery: mosaic grid or swipe carousel, one component, one setting. */
  var galN = 0;
  function gallery(photos, tone, mode, label) {
    mode = mode || P.party.galleryMode || 'grid';
    if (mode === 'carousel') {
      var id = 'gal' + (++galN);
      return '<div class="gal-car relative" role="region" aria-roledescription="carousel" aria-label="' + esc(label) + '">' +
        '<ul id="' + id + '" class="gal-track flex gap-3 overflow-x-auto snap-x snap-mandatory list-none m-0 p-0 pb-2" tabindex="0">' +
        photos.map(function (p, i) { return '<li class="snap-start shrink-0 basis-[82%] sm:basis-[48%] lg:basis-[32%]" aria-label="' + (i + 1) + ' of ' + photos.length + '">' + photo(p, tone, 'aspect-[4/3]') + '</li>'; }).join('') +
        '</ul>' +
        '<div class="flex justify-end gap-3 mt-3">' +
        '<button type="button" class="btn btn-outline icon-btn" data-gal-prev="' + id + '" aria-label="Previous photos">' + ARROW_L + '</button>' +
        '<button type="button" class="btn btn-coral icon-btn" data-gal-next="' + id + '" aria-label="Next photos">' + ARROW_R + '</button></div></div>';
    }
    // grid: with 5, 9... photos the first is large (fills the mosaic); otherwise an even grid
    var mosaic = (photos.length - 1) % 4 === 0;
    return '<ul class="gal-grid grid grid-cols-2 ' + (mosaic ? 'lg:grid-cols-4' : 'lg:grid-cols-3') + ' gap-3 list-none m-0 p-0" aria-label="' + esc(label) + '">' +
      photos.map(function (p, i) {
        var big = mosaic && i === 0;
        return '<li class="' + (big ? 'col-span-2 row-span-2 ' : '') + 'min-h-0">' + photo(p, tone, big ? 'aspect-square lg:aspect-auto lg:h-full' : 'aspect-[4/3]') + '</li>';
      }).join('') + '</ul>';
  }

  function gamesList(w, compact) {
    return '<ul class="grid gap-3 list-none m-0 p-0 ' + (compact ? '' : 'sm:grid-cols-2') + '">' + w.games.map(function (g) {
      var t = P.party.gameTypes[g.type] || { label: '', blurb: '' };
      return '<li class="border-2 border-ink bg-white p-4 grid gap-1 content-start"><span class="text-[13px] font-bold tracking-[.08em] uppercase text-coral">' + esc(t.label) + '</span><strong class="font-display text-[19px] leading-[1.15]">' + esc(g.name) + '</strong><span class="text-[15px] text-muted">' + esc(t.blurb) + '</span></li>';
    }).join('') + '</ul>';
  }

  function panel(w, mode) {
    return '<div class="grid gap-[clamp(28px,4vw,48px)]" data-panel="' + esc(w.id) + '">' +
      '<div class="grid gap-5 max-w-[760px]">' +
        '<p class="text-base font-bold tracking-[.08em] uppercase text-muted">' + esc(w.short) + '</p>' +
        '<h3 class="text-[clamp(34px,5vw,64px)] leading-[.98]">' + esc(w.tagline) + '</h3>' +
        '<p class="text-[19px] leading-[1.5]">' + esc(w.desc) + '</p>' +
        '<div><a class="btn btn-coral" href="#book" data-world="' + esc(w.id) + '" data-track="world_cta_' + esc(w.id) + '">' + esc(w.cta) + ' <span aria-hidden="true">→</span></a></div>' +
      '</div>' +
      gallery(w.photos, w.tone, mode, w.name + ' photos') +
      '<div class="grid gap-4"><h4 class="font-display text-[26px] tracking-[-0.03em]">The four games</h4>' + gamesList(w) + '</div>' +
    '</div>';
  }

  var R = {
    'party-ticker': function () {
      return worlds().map(function (p) { return '<li><span>' + esc(p.name) + '</span>' + STAR + '</li>'; }).join('');
    },
    /* Meta page: tab tiles + one detail panel */
    'world-tabs': function () {
      return worlds().map(function (p, i) {
        return '<button type="button" role="tab" id="tab-' + esc(p.id) + '" aria-selected="' + (i === 0) + '" aria-controls="world-panel" tabindex="' + (i === 0 ? 0 : -1) + '" data-tab="' + esc(p.id) + '" class="worldtab text-left">' +
          '<span class="block">' + photo(p.name, p.tone, 'aspect-[4/3]') + '</span>' +
          '<span class="block px-3 py-3"><span class="block font-display font-bold text-[20px] leading-[1.1] tracking-[-0.02em]">' + esc(p.name) + '</span></span></button>';
      }).join('');
    },
    'world-panel': function (el) {
      var w = worlds()[0];
      return panel(w, el.getAttribute('data-gallery'));
    },
    /* SMS page: compact accordion */
    'world-accordion': function (el) {
      var mode = el.getAttribute('data-gallery') || 'carousel';
      return worlds().map(function (w) {
        return '<details class="border-t-2 border-ink last:border-b-2"><summary class="list-none cursor-pointer flex justify-between items-center gap-4 min-h-[72px] py-4"><span class="grid gap-[2px]"><strong class="font-display text-[24px] leading-[1.05] tracking-[-0.02em]">' + esc(w.name) + '</strong><span class="text-[15px] text-muted">' + esc(w.tagline) + '</span></span><span class="plus text-[34px] font-light leading-none shrink-0" aria-hidden="true">+</span><span class="minus text-[34px] font-light leading-none shrink-0" aria-hidden="true">\u2212</span></summary>' +
          '<div class="grid gap-6 pb-8"><p class="max-w-[60ch]">' + esc(w.desc) + '</p>' + gallery(w.photos, w.tone, mode, w.name + ' photos') +
          '<div class="grid gap-3"><h4 class="font-display text-[20px]">The four games</h4>' + gamesList(w, true) + '</div></div></details>';
      }).join('');
    },
    'photo-wall': function (el) {
      return gallery(P.party.photoWall, 'cocoa', el.getAttribute('data-gallery'), 'More party photos');
    },
    'party-includes': function () {
      return P.party.includes.map(function (t) { return '<li class="flex gap-3 items-start"><svg class="shrink-0 mt-[5px]" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square"><path d="M3 10.5l4.5 4.5L17 5.5"/></svg><span>' + esc(t) + '</span></li>'; }).join('');
    },
    'book-worlds': function () {
      return options().map(function (p) {
        return '<label class="worldopt"><input type="radio" name="world" value="' + esc(p.id) + '"><span>' + esc(p.name) + '</span></label>';
      }).join('');
    },
    /* Unlinked draft pages */
    'camp-cards': function () { return cards(P.camps.items, 'camp'); },
    'camp-checkboxes': function () { return checks(P.camps.items); },
    'camp-ticker': function () { return ticker(P.camps.items); },
    'after-cards': function () { return cards(P.afterschool.items, 'program'); },
    'after-checkboxes': function () { return checks(P.afterschool.items); },
    'after-ticker': function () { return ticker(P.afterschool.items); }
  };
  function cards(list, kind) {
    return list.map(function (c) {
      return '<article class="grid gap-[14px] content-start" data-product="' + esc(c.id) + '">' + photo(c.name + ' ' + kind, c.tone) + '<h3 class="text-[32px] leading-none">' + esc(c.name) + '</h3><p>' + esc(c.desc) + '</p></article>';
    }).join('');
  }
  function checks(list) { return list.map(function (c) { return '<label class="choice"><input type="checkbox" name="world" value="' + esc(c.name) + '"> ' + esc(c.name) + '</label>'; }).join(''); }
  function ticker(list) { return list.map(function (c) { return '<li><span>' + esc(c.name) + '</span>' + STAR + '</li>'; }).join(''); }

  /* ---- behaviour: tabs and carousels ---- */
  function wireTabs() {
    var tabs = document.querySelectorAll('[data-tab]');
    var pan = document.getElementById('world-panel');
    if (!tabs.length || !pan) return;
    function select(id, focus) {
      var w = find(id); if (!w) return;
      tabs.forEach(function (t) { var on = t.getAttribute('data-tab') === w.id; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); });
      pan.innerHTML = panel(w, pan.getAttribute('data-gallery'));
      pan.setAttribute('aria-labelledby', 'tab-' + w.id);
      wireGalleries(pan);
      if (window.ckTrack) ckTrack('view_world', { world: w.id });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t.getAttribute('data-tab')); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = tabs.length, j = -1;
        if (k === 'ArrowRight' || k === 'ArrowDown') j = (i + 1) % n;
        else if (k === 'ArrowLeft' || k === 'ArrowUp') j = (i + n - 1) % n;
        else if (k === 'Home') j = 0; else if (k === 'End') j = n - 1;
        if (j > -1) { e.preventDefault(); select(tabs[j].getAttribute('data-tab'), true); }
      });
    });
    pan.setAttribute('aria-labelledby', 'tab-' + worlds()[0].id);
  }
  function wireGalleries(root) {
    (root || document).querySelectorAll('[data-gal-prev],[data-gal-next]').forEach(function (b) {
      if (b._w) return; b._w = 1;
      b.addEventListener('click', function () {
        var id = b.getAttribute('data-gal-prev') || b.getAttribute('data-gal-next');
        var tr = document.getElementById(id); if (!tr) return;
        var dir = b.hasAttribute('data-gal-next') ? 1 : -1;
        tr.scrollBy({ left: dir * tr.clientWidth * 0.8, behavior: 'smooth' });
      });
    });
  }
  function render() {
    Object.assign(R, window.CK_EXTRA_R || {});
    for (var pass = 0; pass < 2; pass++) {   // second pass fills sections nested inside shared sections
      document.querySelectorAll('[data-ck]').forEach(function (el) {
        if (el._ck) return;
        var f = R[el.getAttribute('data-ck')]; if (f) { el.innerHTML = f(el); el._ck = 1; }
      });
    }
    document.querySelectorAll('[data-ck-price]').forEach(function (el) { el.textContent = P.party.priceLabel; });
    document.querySelectorAll('[data-ck-custom-price]').forEach(function (el) { el.textContent = '$' + (P.party.price + P.party.customUpcharge); });
    wireTabs(); wireGalleries();
    (window.CK_AFTER || []).forEach(function (f) { f(); });
  }
  window.CK = { products: P, find: find, worlds: worlds, options: options, render: render, money: money };
  render();
})();
