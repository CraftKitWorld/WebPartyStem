/* =====================================================================
   CraftKit "remember me": fills first name, last name, email and mobile on any
   form from (1) link parameters (?first= &last= &email= &phone=) and (2) what
   the visitor already typed earlier in this visit, on any page. So someone
   who signs up in the footer, books, or clicks through to the after-school
   waitlist does not retype their details.
   Stored in sessionStorage (cleared when the tab closes). To keep details
   between visits, change STORE to localStorage and mention it in the privacy page.
   Load AFTER craftkit-products.js and BEFORE craftkit-booking.js.
   ===================================================================== */
(function () {
  var KEY = 'ck_profile', FIELDS = ['first', 'last', 'email', 'phone'];
  var STORE = null; try { STORE = window.sessionStorage; } catch (e) {}
  function load() { try { return JSON.parse(STORE.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function save(o) { try { STORE.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  var prof = load();
  try {
    var q = new URLSearchParams(location.search);
    FIELDS.forEach(function (k) { var v = String(q.get(k) || '').trim().slice(0, 200); if (v) prof[k] = v; });
    save(prof);
  } catch (e) {}
  function inputs(k) { return document.querySelectorAll('input[name="' + k + '"]'); }
  function fill() { FIELDS.forEach(function (k) { if (!prof[k]) return; inputs(k).forEach(function (el) { if (!el.value) el.value = prof[k]; }); }); }
  fill();
  document.addEventListener('change', function (e) {
    var el = e.target; if (!el || !el.name || FIELDS.indexOf(el.name) < 0) return;
    var v = String(el.value || '').trim(); if (!v) return;
    prof[el.name] = v; save(prof);
  });
})();
