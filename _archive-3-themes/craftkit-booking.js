/* =====================================================================
   CraftKit booking: world + date + details + one $300 Square payment.
   Used by the Meta landing page (index.html) and the SMS page (book.html).
   Needs craftkit-products.js first. Override any setting by defining
   window.CK_BOOKING before this file loads.
   ===================================================================== */
(function () {
  var D = {
    leadDays: 21,            // earliest bookable day = today + this many days  [CONFIRM]
    horizonMonths: 9,        // how far ahead people can book
    blocked: [],             // already-booked dates, e.g. ['2026-12-12', '2026-12-13']  [FILL IN or load from your calendar]
    voucherCode: 'CRAFT50VIP',
    // Square Payment Links carry a fixed price, so each price combination needs its own link.
    // Paste the real links here (prices come from craftkit-products.js: price, voucherOff, customUpcharge).
    squareLink: null,
    // PAYMENT MODE
    //  'link' = send the parent to a Square Payment Link (no server needed; four fixed-price links below).
    //  'sdk'  = take the card on this page with the Square Web Payments SDK. Needs a small server function
    //           (see square-payment-function.js) because the card token must be charged server-side.
    paymentMode: 'link',
    square: { appId: '[SQUARE APPLICATION ID]', locationId: '[SQUARE LOCATION ID]', environment: 'sandbox', endpoint: '/api/book' }
  };
  var C = Object.assign({}, D, window.CK_BOOKING || {});
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var form = $('#book-form'); if (!form) return;
  var P = window.CK_PRODUCTS.party;
  C.voucherOff = P.voucherOff;
  C.squareLink = Object.assign({
    std: '[SQUARE PAYMENT LINK, $' + P.price + ']',
    stdVoucher: '[SQUARE PAYMENT LINK, $' + (P.price - P.voucherOff) + ']',
    custom: '[SQUARE PAYMENT LINK, $' + (P.price + P.customUpcharge) + ']',
    customVoucher: '[SQUARE PAYMENT LINK, $' + (P.price + P.customUpcharge - P.voucherOff) + ']'
  }, C.squareLink || {});
  var state = { world: null, date: null, voucher: false, began: false };

  /* ---------- dates ---------- */
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function fromIso(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function nice(d, opts) { try { return d.toLocaleDateString(undefined, opts); } catch (e) { return iso(d); } }
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var minD = new Date(today); minD.setDate(minD.getDate() + C.leadDays);
  var maxD = new Date(today.getFullYear(), today.getMonth() + C.horizonMonths + 1, 0);
  var view = new Date(minD.getFullYear(), minD.getMonth(), 1);
  var cal = $('#cal');
  var DOW = [];
  (function () { var b = new Date(2023, 0, 1); for (var i = 0; i < 7; i++) { var d = new Date(b); d.setDate(b.getDate() + i); DOW.push({ s: nice(d, { weekday: 'narrow' }), l: nice(d, { weekday: 'long' }) }); } })();

  function dayOk(d) { return d >= minD && d <= maxD && C.blocked.indexOf(iso(d)) === -1; }

  function drawCal(focusIso) {
    var first = new Date(view), last = new Date(view.getFullYear(), view.getMonth() + 1, 0);
    var prevOk = new Date(view.getFullYear(), view.getMonth() - 1, 1) >= new Date(minD.getFullYear(), minD.getMonth(), 1);
    var nextOk = new Date(view.getFullYear(), view.getMonth() + 1, 1) <= maxD;
    var h = '<div class="flex items-center justify-between gap-3 mb-3">' +
      '<button type="button" class="cal-nav" data-cal="prev" aria-label="Previous month"' + (prevOk ? '' : ' disabled') + '>‹</button>' +
      '<p class="font-display font-bold text-[22px] m-0" aria-live="polite">' + nice(first, { month: 'long', year: 'numeric' }) + '</p>' +
      '<button type="button" class="cal-nav" data-cal="next" aria-label="Next month"' + (nextOk ? '' : ' disabled') + '>›</button></div>' +
      '<div class="cal-grid" role="grid" aria-label="Choose your party date">';
    h += DOW.map(function (w) { return '<span class="cal-dow" role="columnheader" aria-label="' + w.l + '">' + w.s + '</span>'; }).join('');
    for (var i = 0; i < first.getDay(); i++) h += '<span></span>';
    for (var n = 1; n <= last.getDate(); n++) {
      var d = new Date(view.getFullYear(), view.getMonth(), n), k = iso(d), ok = dayOk(d), sel = state.date === k;
      var lab = nice(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + (ok ? '' : ', not available');
      h += '<button type="button" class="cal-day' + (sel ? ' is-sel' : '') + '" data-iso="' + k + '" aria-pressed="' + sel + '" aria-label="' + lab + '"' + (ok ? '' : ' disabled') + '>' + n + '</button>';
    }
    h += '</div>';
    cal.innerHTML = h;
    if (focusIso) { var b = cal.querySelector('[data-iso="' + focusIso + '"]:not([disabled])'); if (b) b.focus(); }
  }
  cal.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-cal]');
    if (nav) { view = new Date(view.getFullYear(), view.getMonth() + (nav.getAttribute('data-cal') === 'next' ? 1 : -1), 1); drawCal(); return; }
    var b = e.target.closest('.cal-day'); if (!b || b.disabled) return;
    state.date = b.getAttribute('data-iso'); $('#date-err').classList.add('hidden'); drawCal(state.date); summary();
    if (window.ckTrack) ckTrack('select_date', { date: state.date });
  });
  cal.addEventListener('keydown', function (e) {
    var b = e.target.closest('.cal-day'); if (!b) return;
    var step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key]; if (!step) return;
    e.preventDefault();
    var d = fromIso(b.getAttribute('data-iso')); d.setDate(d.getDate() + step);
    if (d < minD || d > maxD) return;
    if (d.getMonth() !== view.getMonth() || d.getFullYear() !== view.getFullYear()) view = new Date(d.getFullYear(), d.getMonth(), 1);
    drawCal(iso(d));
  });

  /* ---------- summary ---------- */
  function isCustom() { return state.world === 'custom-world'; }
  function total() { return P.price + (isCustom() ? P.customUpcharge : 0) - (state.voucher ? C.voucherOff : 0); }
  function linkFor() {
    var k = (isCustom() ? 'custom' : 'std') + (state.voucher ? (isCustom() ? 'Voucher' : 'Voucher') : '');
    return C.squareLink[k];
  }
  function summary() {
    var w = state.world ? window.CK.find(state.world) : null;
    $('#sum-world').textContent = w ? w.name : 'Not chosen yet';
    $('#sum-date').textContent = state.date ? nice(fromIso(state.date), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Not chosen yet';
    $('#row-voucher').classList.toggle('hidden', !state.voucher);
    $('#row-custom').classList.toggle('hidden', !isCustom());
    var tot = total(), off = C.voucherOff;
    $('#sum-total').innerHTML = state.voucher ? '<s class="text-muted text-[16px] font-normal mr-2">' + window.CK.money(tot + off) + '</s>' + window.CK.money(tot) : window.CK.money(tot);
    $('#savings').classList.toggle('hidden', !state.voucher);
    $('#sav-amt').textContent = window.CK.money(off);
    $('#pay-amount').textContent = window.CK.money(total());
  }

  /* ---------- world ---------- */
  var radios = form.querySelectorAll('input[name="world"]');
  var grid = $('#world-grid'), picked = $('#world-picked'), changeBtn = $('#world-change');
  function collapseWorlds(on) {
    picked.classList.toggle('hidden', !on);
    grid.classList.toggle('hidden', on);
    changeBtn.setAttribute('aria-expanded', 'false'); changeBtn.textContent = 'See other worlds';
  }
  changeBtn.addEventListener('click', function () {
    var open = grid.classList.toggle('hidden') === false;
    changeBtn.setAttribute('aria-expanded', String(open)); changeBtn.textContent = open ? 'Hide other worlds' : 'See other worlds';
  });
  function setWorld(id, quiet) {
    var w = window.CK.find(id); if (!w) return;
    state.world = w.id;
    radios.forEach(function (r) { r.checked = (r.value === w.id); });
    $('#world-err').classList.add('hidden');
    $('#custom-wrap').classList.toggle('hidden', !isCustom());
    $('#picked-name').textContent = w.name;
    $('#c-custom').required = isCustom();
    summary();
    if (!quiet && window.ckTrack) {
      ckTrack('select_world', { world: w.id });
      if (!state.began) { state.began = true; ckTrack('begin_checkout', { world: w.id, value: P.price, currency: 'USD' }); }
    }
  }
  radios.forEach(function (r) { r.addEventListener('change', function () { setWorld(r.value); }); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('[data-world]') : null;
    if (a) setWorld(a.getAttribute('data-world'));
  });

  /* ---------- voucher ---------- */
  function applyCode(v) {
    v = (v || '').trim().toUpperCase();
    var ok = v === C.voucherCode.toUpperCase();
    state.voucher = ok;
    $('#code-ok').classList.toggle('hidden', !ok);
    $('#code-bad').classList.toggle('hidden', ok || !v);
    summary();
    if (v && window.ckTrack) ckTrack('apply_promotion', { coupon: v, valid: ok });
  }
  $('#code-apply').addEventListener('click', function () { applyCode($('#c-code').value); });
  $('#c-code').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); applyCode(this.value); } });

  /* ---------- link parameters (Meta ads, Klaviyo email and SMS) ----------
     ?world=<id | name | short name>  preselects that world (any other value is treated as your own theme)
     ?custom=<theme text>             fills "Describe your world"
     ?code=CRAFT50VIP                 applies the voucher and shows the saving (kept for the session)
     ?first= &last= &email= &phone=   prefills the details (removed from the address bar after reading)  */
  function setField(name, v) { if (v && form.elements[name]) form.elements[name].value = v; }
  try {
    var q = new URLSearchParams(location.search);
    var g = function (k) { return String(q.get(k) || '').trim().slice(0, 200); };
    setField('first', g('first')); setField('last', g('last')); setField('email', g('email')); setField('phone', g('phone'));
    var code = g('code');
    if (!code) { try { code = sessionStorage.getItem('ck_code') || ''; } catch (e) {} }
    if (code) {
      $('#c-code').value = code; applyCode(code);
      if (state.voucher) { $('#code-details').open = true; try { sessionStorage.setItem('ck_code', code); } catch (e) {} }
    }
    var wq = g('world'), cq = g('custom');
    if (wq) {
      var found = window.CK.find(wq) || window.CK.options().filter(function (o) { return o.short && o.short.toLowerCase() === wq.toLowerCase(); })[0];
      if (found) { setWorld(found.id, true); collapseWorlds(true); }
      else { setWorld('custom-world', true); setField('customWorld', cq || wq); collapseWorlds(true); }
    } else if (cq) { setWorld('custom-world', true); }
    if (cq) setField('customWorld', cq);
    ['first', 'last', 'email', 'phone', 'custom'].forEach(function (k) { q.delete(k); });
    if (window.history && history.replaceState) { var qs = q.toString(); history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash); }
  } catch (e) {}

  /* ---------- Square Web Payments SDK (paymentMode: 'sdk') ---------- */
  var sdkCard = null;
  function sdkConfigured() { return C.paymentMode === 'sdk' && C.square && !/^\[/.test(C.square.appId) && !/^\[/.test(C.square.locationId); }
  function cardErr(msg) { var e = $('#card-err'); e.textContent = msg || ''; e.classList.toggle('hidden', !msg); }
  function initSdk() {
    if (C.paymentMode !== 'sdk') return;
    $('#sdk-wrap').classList.remove('hidden');
    if (!sdkConfigured()) { $('#card-container').innerHTML = '<p class="m-0 text-muted">[Square card form appears here once your Square Application ID and Location ID are added in craftkit-booking.js]</p>'; return; }
    var sc = document.createElement('script');
    sc.src = C.square.environment === 'production' ? 'https://web.squarecdn.com/v1/square.js' : 'https://sandbox.web.squarecdn.com/v1/square.js';
    sc.onload = function () {
      try {
        window.Square.payments(C.square.appId, C.square.locationId).card().then(function (card) { sdkCard = card; return card.attach('#card-container'); })
          .catch(function () { cardErr('The card form could not load. Please refresh, or call or text us.'); });
      } catch (e) { cardErr('The card form could not load. Please refresh, or call or text us.'); }
    };
    sc.onerror = function () { cardErr('The card form could not load. Please refresh, or call or text us.'); };
    document.head.appendChild(sc);
  }
  function showDone(note) {
    form.classList.add('hidden');
    var d = $('#book-done'); d.classList.remove('hidden'); d.classList.add('grid');
    $('#done-world').textContent = window.CK.find(state.world).name;
    $('#done-date').textContent = $('#sum-date').textContent;
    if (note) $('#done-note').textContent = note;
    d.scrollIntoView({ block: 'center' });
  }
  function payWithSdk() {
    var btn = $('#pay-btn'), label = btn.innerHTML;
    cardErr('');
    if (!sdkCard) { cardErr('The card form is still loading. Please try again in a moment.'); return; }
    btn.disabled = true; btn.textContent = 'Processing…';
    function fail(m) { btn.disabled = false; btn.innerHTML = label; cardErr(m || 'Something went wrong with the payment. Your card was not charged. Please try again, or call or text us.'); }
    sdkCard.tokenize().then(function (r) {
      if (r.status !== 'OK') { fail('Please check your card details and try again.'); return; }
      var body = {
        sourceId: r.token, idempotencyKey: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random(),
        world: state.world, customWorld: isCustom() ? val('customWorld') : '', date: state.date, code: state.voucher ? C.voucherCode : '',
        child: val('child'), age: val('age'), first: val('first'), last: val('last'), email: val('email'), phone: val('phone')
      };
      return fetch(C.square.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, j: j }; }); })
        .then(function (o) {
          if (!o.ok || !o.j.ok) { fail(o.j && o.j.message); return; }
          if (window.ckTrack) ckTrack('purchase', { transaction_id: o.j.paymentId || '', value: total(), currency: 'USD', world: state.world, date: state.date, coupon: state.voucher ? C.voucherCode : '' });
          showDone('Your payment went through. A Square receipt and your Party Pack details are on their way by email.');
        });
    }).catch(function () { fail(); });
  }

  /* ---------- submit ---------- */
  function val(k) { return form.elements[k] ? String(form.elements[k].value || '').trim() : ''; }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!state.world) { $('#world-err').classList.remove('hidden'); $('#world-fieldset').scrollIntoView({ block: 'center' }); radios[0].focus(); return; }
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (!state.date) { $('#date-err').classList.remove('hidden'); var f = cal.querySelector('.cal-day:not([disabled])'); if (f) f.focus(); return; }
    var link = linkFor();
    if (window.ckIdentify) ckIdentify({ $email: val('email'), $first_name: val('first'), $last_name: val('last'), $phone_number: val('phone'), ck_party_for: val('child'), ck_party_age: val('age'), ck_party_world: state.world, ck_custom_world: isCustom() ? val('customWorld') : '', ck_party_date: state.date, ck_voucher: state.voucher ? C.voucherCode : '' });
    if (window.ckTrack) ckTrack('begin_payment', { world: state.world, date: state.date, value: total(), currency: 'USD', coupon: state.voucher ? C.voucherCode : '' });
    // Live: send the parent to the Square Payment Link. Put world + date + name on the Square order
    // (Checkout API note) or save them first (Klaviyo profile above, or your own form handler).
    // On Square's "after payment" page, fire ckTrack('purchase', {...}) so GA4 and Klaviyo record the sale.
    if (sdkConfigured()) { payWithSdk(); return; }
    if (C.paymentMode !== 'sdk' && link && link.charAt(0) !== '[') { window.location.href = link; return; }
    showDone();   // preview: nothing is configured yet
  });

  drawCal(); summary(); initSdk();
})();
