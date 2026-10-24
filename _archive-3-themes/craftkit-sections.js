/* =====================================================================
   CraftKit shared sections. Used by BOTH landing pages (index.html and
   book.html), so a change here, or in the copy inside craftkit-products.js,
   shows up on both pages. A page just contains a placeholder such as:
     <div data-ck="booking-card" data-title="Book your party"></div>
     <div data-ck="faq" data-open-first="true"></div>
     <div data-ck="quotes"></div>
     <ol data-ck="schedule"></ol>
     <div data-ck="final-cta"></div>
     <div data-ck="custom-callout"></div>
   Load this file BEFORE craftkit-products.js.
   ===================================================================== */
(function () {
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function P() { return window.CK_PRODUCTS.party; }
  function m(n) { return '$' + n; }
  function fill(s) {
    var p = P();
    return String(s).replace(/\{price\}/g, m(p.price)).replace(/\{upcharge\}/g, m(p.customUpcharge))
      .replace(/\{customPrice\}/g, m(p.price + p.customUpcharge)).replace(/\{voucherPrice\}/g, m(p.price - p.voucherOff));
  }

  var R = {};

  R['booking-card'] = function (el) {
    var p = P(), title = el.getAttribute('data-title') || 'Book your party', compact = el.getAttribute('data-compact') === 'true';
    return '<form id="book-form" class="bg-white text-ink border-2 border-ink p-3 sm:p-[clamp(20px,3vw,36px)] grid ' + (compact ? 'gap-6' : 'gap-9') + '" ' + (compact ? 'aria-label="' + esc(title) + '"' : 'aria-labelledby="book-card-h"') + '>' +
      (compact ? '' : '<div class="grid gap-2"><h2 id="book-card-h" class="text-[clamp(30px,3.6vw,44px)] leading-none">' + esc(title) + '</h2>' +
      '<p class="text-[19px]"><strong>' + m(p.price) + '</strong>, or <strong>' + m(p.price + p.customUpcharge) + '</strong> if you choose your own world · one simple payment holds your date</p></div>') +
      '<div id="savings" role="status" class="hidden bg-tint border-2 border-ink px-4 py-3 font-bold"><span aria-hidden="true">✓</span> Your VIP voucher is applied. You save <span id="sav-amt">' + m(p.voucherOff) + '</span> on any party.</div>' +

      '<fieldset id="world-fieldset" class="field !gap-3"><legend class="step-title">1. Pick a world</legend>' +
      '<div id="world-picked" class="hidden flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-2 border-ink bg-white p-4" style="outline:4px solid var(--coral);outline-offset:-2px">' +
      '<p class="m-0 grid"><strong id="picked-name" class="font-display text-[22px] leading-[1.1]"></strong></p>' +
      '<button type="button" id="world-change" class="inline-flex items-center min-h-[44px] underline underline-offset-4 font-medium" aria-expanded="false" aria-controls="world-grid">See other worlds</button></div>' +
      '<div id="world-grid" class="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3" data-ck="book-worlds"></div>' +
      '<div id="custom-wrap" class="field hidden"><label for="c-custom">Describe your world <span class="req">(required)</span></label>' +
      '<textarea class="input" id="c-custom" name="customWorld" rows="3" placeholder="For example: a favourite game, animal, sport or story"></textarea></div>' +
      '<p id="world-err" role="alert" class="err hidden">Please pick a world to continue.</p></fieldset>' +

      '<fieldset class="field !gap-4"><legend class="step-title">2. Your details</legend>' +
      '<div class="f-row"><div class="field"><label for="c-first">First name <span class="req">(required)</span></label><input class="input" id="c-first" name="first" type="text" autocomplete="given-name" required></div>' +
      '<div class="field"><label for="c-last">Last name <span class="req">(required)</span></label><input class="input" id="c-last" name="last" type="text" autocomplete="family-name" required></div></div>' +
      '<div class="f-row"><div class="field"><label for="c-email">Email <span class="req">(required)</span></label><input class="input" id="c-email" name="email" type="email" autocomplete="email" required></div>' +
      '<div class="field"><label for="c-phone">Mobile <span class="req">(required)</span></label><input class="input" id="c-phone" name="phone" type="tel" autocomplete="tel" required></div></div>' +
      '<div class="f-row"><div class="field"><label for="c-child">Who is the party for? <span class="req">(required)</span></label><input class="input" id="c-child" name="child" type="text" autocomplete="off" placeholder="Birthday child’s first name" required></div>' +
      '<div class="field"><label for="c-age">Turning age <span class="req">(required)</span></label><input class="input" id="c-age" name="age" type="number" inputmode="numeric" min="1" max="18" step="1" autocomplete="off" placeholder="e.g. 6" required></div></div></fieldset>' +

      '<fieldset class="field !gap-5 grid-cols-[minmax(0,1fr)] bg-tint border-2 border-ink p-2 sm:p-[clamp(16px,3vw,28px)]"><legend class="step-title !float-left !w-full">3. Pick your date and pay</legend>' +
      '<div id="cal" class="clear-both"></div><p id="date-err" role="alert" class="err hidden">Please pick a date to continue.</p>' +
      '<p class="text-[15px] text-muted">Crossed-out dates aren’t available online. Need a closer date? Call or text <a class="underline" href="tel:+15412884132">+1 (541) 288-4132</a>.</p>' +
      '<dl class="m-0 bg-white border-2 border-ink px-4" aria-live="polite">' +
      '<div class="flex justify-between gap-4 py-3"><dt>World</dt><dd id="sum-world" class="m-0 font-bold text-right">Not chosen yet</dd></div>' +
      '<div class="sumrow"><dt>Date</dt><dd id="sum-date" class="text-right">Not chosen yet</dd></div>' +
      '<div class="sumrow"><dt>Party package</dt><dd>' + m(p.price) + '</dd></div>' +
      '<div id="row-custom" class="sumrow hidden"><dt>Choose your own world</dt><dd>+' + m(p.customUpcharge) + '</dd></div>' +
      '<div id="row-voucher" class="sumrow hidden"><dt>VIP voucher</dt><dd>−' + m(p.voucherOff) + '</dd></div>' +
      '<div class="sumrow"><dt class="font-bold">Total today</dt><dd id="sum-total" class="text-[20px]">' + m(p.price) + '</dd></div></dl>' +
      '<details id="code-details"><summary class="inline-flex items-center min-h-[44px] cursor-pointer font-medium underline underline-offset-4">Have a voucher code?</summary>' +
      '<div class="field mt-2"><label for="c-code" class="sr">Voucher code</label><div class="flex flex-wrap gap-3">' +
      '<input class="input !w-auto min-w-0 flex-[1_1_160px]" id="c-code" name="code" type="text" autocomplete="off" autocapitalize="characters" placeholder="Enter code">' +
      '<button type="button" id="code-apply" class="btn btn-outline">Apply</button></div>' +
      '<p id="code-ok" role="status" class="ok hidden">Code applied: ' + m(p.voucherOff) + ' off your party.</p>' +
      '<p id="code-bad" role="status" class="err hidden">That code isn’t valid. Check it and try again.</p></div></details>' +
      '<div id="sdk-wrap" class="hidden grid gap-2"><p class="m-0 font-bold">Card details</p><div id="card-container" class="min-h-[96px] bg-white border-2 border-ink p-2"></div><p id="card-err" role="alert" class="err hidden"></p></div>' +
      '<label class="choice items-start"><input type="checkbox" name="terms" required class="mt-[11px]"> <span>I agree to the <a class="underline" href="privacy.html#terms" target="_blank" rel="noopener">booking and cancellation terms</a>.</span></label>' +
      '<div class="grid gap-[10px] justify-items-start"><button id="pay-btn" class="btn btn-coral min-h-[60px] px-9 py-4 text-lg w-full sm:w-auto" type="submit"><span>Pay <span id="pay-amount">' + m(p.price) + '</span> and lock in my date</span></button>' +
            '<p class="text-[15px] text-muted">Secure payment processed by Square. Move the date over 10 days before for free.</p></div></fieldset></form>' +
      '<div id="book-done" role="status" class="hidden bg-white text-ink border-2 border-ink p-8 gap-3"><h3 class="text-[32px] leading-none">You’re booked! (preview)</h3>' +
      '<p class="mt-3"><strong id="done-world"></strong> on <strong id="done-date"></strong>. <span id="done-note">In the live site this step sends the parent to Square to pay, then back here. A Square receipt and your Party Pack details arrive by email. [Confirm copy]</span></p></div>';
  };

  R['faq'] = function (el) {
    var open = el.getAttribute('data-open-first') === 'true', compact = el.getAttribute('data-compact') === 'true';
    return P().faq.filter(function (f) { return !compact || f[2]; }).map(function (f, i) {
      return '<details' + (open && i === 0 ? ' open' : '') + '><summary>' + fill(f[0]) + '</summary><div class="ans">' + fill(f[1]) + '</div></details>';
    }).join('');
  };

  R['schedule'] = function () {
    return P().schedule.map(function (s) { return '<li><span>' + esc(s[0]) + '</span><span class="t">' + esc(s[1]) + '</span></li>'; }).join('');
  };

  R['final-cta'] = function (el) {
    var c = P().finalCta, compact = el && el.getAttribute('data-compact') === 'true';
    return '<div class="wrap flex flex-wrap items-center justify-between gap-x-12 ' + (compact ? 'gap-y-4' : 'gap-y-8') + '">' +
      '<h2 class="' + (compact ? 'text-[clamp(28px,5vw,44px)] leading-[.95] max-w-[14em]' : 'text-[clamp(44px,7vw,96px)] leading-[.9] max-w-[9em]') + '">' + esc(c.headline) + '</h2>' +
      '<a class="btn btn-coral min-h-[64px] px-10 py-[18px] text-[19px]" href="#book" data-track="final_book_now">' + esc(c.button) + (compact ? '' : ' · ' + m(P().price)) + '</a></div>';
  };

  R['custom-callout'] = function (el) {
    var p = P(), c = null, compact = el && el.getAttribute('data-compact') === 'true';
    p.items.forEach(function (i) { if (i.kind === 'custom') c = i; });
    return '<div class="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 bg-tint border-2 border-ink p-[clamp(20px,3vw,36px)]">' +
      '<div class="grid gap-2 max-w-[60ch]"><h3 class="text-[clamp(26px,3vw,36px)] leading-[1.05]">Don’t see your child’s world?</h3>' +
      '<p>' + (compact ? 'Tell us the theme and we build the games around it. ' : esc(c.desc) + ' ') + 'It’s ' + m(p.customUpcharge) + ' more, so ' + m(p.price + p.customUpcharge) + ' in total.</p></div>' +
      '<a class="btn btn-coral" href="#book" data-world="' + esc(c.id) + '" data-track="custom_world_cta">' + esc(c.cta) + ' <span aria-hidden="true">→</span></a></div>';
  };

  R['quotes'] = function (el) {
    var compact = el && el.getAttribute('data-compact') === 'true';
    return '<figure id="quote-box" aria-live="off" class="m-0 ' + (compact ? 'min-h-[150px]' : 'min-h-[260px]') + ' flex flex-col justify-between gap-6"><div class="grid gap-4 max-w-[1100px]">' +
      '<blockquote id="quote-text" class="display m-0 ' + (compact ? 'text-[clamp(22px,3vw,30px)]' : 'text-[clamp(26px,3.4vw,44px)]') + ' leading-[1.1] font-bold"></blockquote>' +
      '<figcaption id="quote-who" class="text-[17px]"></figcaption></div></figure>' +
      '<div class="flex justify-end items-center gap-4 mt-2"><p id="quote-count" class="text-[15px] text-muted" aria-hidden="true"></p>' +
      '<button type="button" id="slide-toggle" aria-label="Pause automatic quote rotation" class="btn btn-outline icon-btn">' +
      '<svg class="icon-pause" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="currentColor"><rect x="3" y="2" width="4" height="14"/><rect x="11" y="2" width="4" height="14"/></svg>' +
      '<svg class="icon-play hidden" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="currentColor"><path d="M4 2l12 7-12 7z"/></svg></button>' +
      '<button type="button" id="slide-prev" aria-label="Previous quote" class="btn btn-coral icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H4M10 6l-6 6 6 6"/></svg></button>' +
      '<button type="button" id="slide-next" aria-label="Next quote" class="btn btn-coral icon-btn"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M14 6l6 6-6 6"/></svg></button></div>';
  };

  function wireQuotes() {
    var qBox = document.getElementById('quote-box'); if (!qBox || qBox._w) return; qBox._w = 1;
    var slides = P().quotes, i = 0, reduce = false;
    try { reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) {}
    var paused = reduce, $ = function (s) { return document.getElementById(s); };
    var qText = $('quote-text'), qWho = $('quote-who'), qCount = $('quote-count'), sBtn = $('slide-toggle');
    function show() { qText.textContent = slides[i].q; qWho.textContent = slides[i].w; qCount.textContent = (i + 1) + ' of ' + slides.length; }
    function sync() {
      sBtn.setAttribute('aria-label', paused ? 'Start automatic quote rotation' : 'Pause automatic quote rotation');
      sBtn.querySelector('.icon-pause').classList.toggle('hidden', paused);
      sBtn.querySelector('.icon-play').classList.toggle('hidden', !paused);
      qBox.setAttribute('aria-live', paused ? 'polite' : 'off');
    }
    $('slide-prev').addEventListener('click', function () { i = (i + slides.length - 1) % slides.length; show(); });
    $('slide-next').addEventListener('click', function () { i = (i + 1) % slides.length; show(); });
    sBtn.addEventListener('click', function () { paused = !paused; sync(); });
    if (!reduce) setInterval(function () { if (!paused) { i = (i + 1) % slides.length; show(); } }, 7000);
    show(); sync();
  }

  window.CK_EXTRA_R = R;
  window.CK_AFTER = (window.CK_AFTER || []).concat([wireQuotes]);
})();
