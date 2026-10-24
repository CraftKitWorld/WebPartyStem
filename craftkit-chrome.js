/* =====================================================================
   CraftKit site header and footer: edit them HERE, once, and every page updates.
   Each page just contains:
     <script src="craftkit-chrome.js" data-part="header" data-variant="solid" data-page="about" data-cta="index.html#book"></script>
     <script src="craftkit-chrome.js" data-part="footer"></script>
   data-variant: "solid" (dark bar) | "overlay" (floats over a hero photo) | "sms" (logo + call link only)
   data-page:    parties | after | about | none   (marks the current nav link)
   data-cta:     where the header "Book a party" button goes; leave out to hide the button.
   Your logo: replace assets/logo.svg with your real file (same name), or change LOGO.src below.
   ===================================================================== */
(function () {
  var C = {
    LOGO: { src: 'assets/logo.svg', alt: 'CraftKit, home', height: 56 },
    HOME: 'index.html',
    PHONE: { tel: '+15412884132', text: '+1 (541) 288-4132' },
    NAV: [
      { id: 'parties', label: 'Parties', href: 'index.html', track: 'nav_parties' },
      { id: 'after', label: 'After-school', href: 'after-school.html' },
      { id: 'about', label: 'About', href: 'about.html' }
    ],
    FOOT_LINKS: [
      { label: 'About', href: 'about.html' },
      { label: 'Privacy & booking terms', href: 'privacy.html' }
    ]
  };

  var s = document.currentScript; if (!s) return;
  var part = s.getAttribute('data-part'), variant = s.getAttribute('data-variant') || 'solid';
  var page = s.getAttribute('data-page') || 'none', cta = s.getAttribute('data-cta');

  var logo = '<a href="' + C.HOME + '" aria-label="' + C.LOGO.alt + '" class="flex items-center no-underline text-white"><img src="' + C.LOGO.src + '" alt="" style="height:' + C.LOGO.height + 'px;width:auto;display:block"></a>';

  function nav() {
    return '<nav class="nav flex flex-wrap gap-x-5" aria-label="Main">' + C.NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.id === page ? ' aria-current="page"' : '') + (n.track ? ' data-track="' + n.track + '"' : '') + '>' + n.label + '</a>';
    }).join('') + '</nav>';
  }
  function header() {
    if (variant === 'sms') {
      return '<header class="bg-ink text-white"><div class="wrap flex items-center justify-between gap-4 py-5">' + logo +
        '<a href="tel:' + C.PHONE.tel + '" class="inline-flex items-center min-h-[44px] whitespace-nowrap text-base font-medium text-white underline underline-offset-4"><span class="hidden sm:inline no-underline mr-2">Questions?</span>Call or text</a></div></header>';
    }
    var overlay = variant === 'overlay';
    return '<header class="' + (overlay ? 'absolute top-0 inset-x-0 z-10 text-white' : 'bg-ink text-white') + '">' +
      '<div class="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-2 ' + (overlay ? 'pt-7' : 'py-6') + '">' + logo +
      '<div class="flex flex-wrap items-center gap-x-6 gap-y-2">' + nav() +
      (cta ? '<a class="btn btn-coral !min-h-[46px] !px-[22px] !py-2 !text-base' + (overlay ? ' max-md:!hidden' : '') + '" href="' + cta + '" data-track="header_book_party">Book a party</a>' : '') +
      '</div></div></header>';
  }
  function footer() {
    var footLinks = C.FOOT_LINKS.map(function (l) { return '<a href="' + l.href + '" class="inline-flex items-center min-h-[44px]">' + l.label + '</a>'; }).join('');
    return `<footer class="foot bg-black text-white pt-[72px] pb-[104px] md:pb-14">
  <div class="wrap flex flex-wrap gap-x-10 gap-y-12 justify-between items-start">
    <div class="flex-[1_1_220px] grid gap-4 text-base">
      <p class="display text-[22px] font-semibold">CraftKit World</p>
      <address class="not-italic leading-[1.6]">Hood River, OR, USA<br>Melbourne, Australia</address>
      <a href="tel:+15412884132" class="inline-flex items-center min-h-[44px] no-underline">+1 (541) 288-4132</a>
    </div>
    <div class="flex-[2_1_380px] max-w-[600px] grid gap-5" aria-live="polite">
      <h2 class="text-[32px] leading-none">Newsletter Sign Up</h2>
      <form id="news-form" data-klaviyo-list="[KLAVIYO LIST ID]" class="flex flex-wrap gap-3">
        <label class="sr" for="nl-email">Email address</label>
        <input class="input !w-auto flex-[1_1_240px] !border-white" id="nl-email" name="email" type="email" autocomplete="email" placeholder="Email Address" required>
        <button class="btn btn-white" type="submit">Sign Up</button>
        <p class="basis-full text-sm text-inverse-muted">[Klaviyo: connect this form to your newsletter list]</p>
      </form>
      <p id="news-done" role="status" class="hidden text-lg">Thanks for signing up!</p>
    </div>
    <div class="flex-[1_1_200px] flex flex-col items-start gap-5">
      <nav aria-label="Footer" class="flex flex-col">
        ${footLinks}
      </nav>
      <div class="social flex gap-1">
        <a href="#" aria-label="CraftKit on Instagram"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg></a>
        <a href="#" aria-label="CraftKit on Facebook"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8z"/></svg></a>
        <a href="#" aria-label="CraftKit on Pinterest"><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M10.6 17.5l1.6-7M10 12.6c-.8-2.4.6-4.2 2.5-4.2 1.7 0 2.5 1.2 2.5 2.4 0 1.7-1 3.1-2.4 3.1-.8 0-1.4-.6-1.2-1.4"/></svg></a>
      </div>
    </div>
  </div>
</footer>`;
  }
  s.insertAdjacentHTML('afterend', part === 'footer' ? footer() : header());
})();
