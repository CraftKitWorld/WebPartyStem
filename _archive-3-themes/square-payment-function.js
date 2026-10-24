/* =====================================================================
   CraftKit: server function that charges the card token from the Square Web Payments SDK.
   STARTER CODE, NOT TESTED AGAINST A LIVE SQUARE ACCOUNT. Test in the Square SANDBOX first.

   WHY IT EXISTS
   The card form on the page only turns the card into a one-time token. The charge itself must
   happen on a server that holds your secret Square access token (never put that token in the site).
   This function also works out the price itself, so a visitor cannot change what they pay.

   HOW TO USE
   1. Host it as a serverless function (written for Netlify: put it at netlify/functions/book.js
      and set craftkit-booking.js  square.endpoint  to '/.netlify/functions/book', or add a redirect from /api/book).
      Vercel and Cloudflare Workers need a small change to the wrapper at the bottom only.
   2. Set these environment variables in your host (never commit them):
        SQUARE_ACCESS_TOKEN   your Square access token (sandbox token while testing)
        SQUARE_LOCATION_ID    must equal the locationId in craftkit-booking.js
        SQUARE_ENV            'sandbox' or 'production'
        ALLOWED_ORIGIN        e.g. https://www.yourdomain.com
   3. In craftkit-booking.js set  paymentMode: 'sdk'  and fill in  square.appId / locationId / environment.
   4. KEEP THE NUMBERS BELOW IN STEP with craftkit-products.js (price, customUpcharge, voucherOff).
   5. Still to build: block dates that are already booked (read your calendar here), and email or
      Klaviyo the booking details. Square's receipt email is sent by Square.
   ===================================================================== */
const PRICE = 280, CUSTOM_UPCHARGE = 100, VOUCHER_OFF = 50, VOUCHER_CODE = 'CRAFT50VIP', LEAD_DAYS = 21, HORIZON_MONTHS = 9;
const WORLDS = ['jurassic-adventure', 'build-and-demolition', 'deep-sea-explorers', 'custom-world'];
const BLOCKED_DATES = [];   // e.g. ['2026-12-12'], or load from your calendar

function price(world, code) {
  let dollars = PRICE + (world === 'custom-world' ? CUSTOM_UPCHARGE : 0);
  if (String(code || '').trim().toUpperCase() === VOUCHER_CODE) dollars -= VOUCHER_OFF;
  return dollars * 100;   // cents
}
function validDate(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return false;
  const [y, m, d] = iso.split('-').map(Number);
  const day = new Date(y, m - 1, d);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const min = new Date(today); min.setDate(min.getDate() + LEAD_DAYS);
  const max = new Date(today.getFullYear(), today.getMonth() + HORIZON_MONTHS + 1, 0);
  return day >= min && day <= max && BLOCKED_DATES.indexOf(iso) === -1;
}
const clean = (s, n) => String(s || '').replace(/[\r\n]+/g, ' ').trim().slice(0, n);

async function book(body, env, fetchFn) {
  if (!body || !body.sourceId || !body.idempotencyKey) return { status: 400, json: { ok: false, message: 'Missing payment details.' } };
  if (WORLDS.indexOf(body.world) < 0) return { status: 400, json: { ok: false, message: 'Please choose a world.' } };
  if (!validDate(body.date)) return { status: 400, json: { ok: false, message: 'That date is no longer available. Please pick another.' } };
  if (!clean(body.child, 80) || !(Number(body.age) >= 1 && Number(body.age) <= 18) || !clean(body.email, 120)) return { status: 400, json: { ok: false, message: 'Please fill in every required field.' } };
  if (body.world === 'custom-world' && !clean(body.customWorld, 300)) return { status: 400, json: { ok: false, message: 'Please describe your world.' } };

  const base = env.SQUARE_ENV === 'production' ? 'https://connect.squareup.com' : 'https://connect.squareupsandbox.com';
  const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + env.SQUARE_ACCESS_TOKEN };
  if (env.SQUARE_VERSION) headers['Square-Version'] = env.SQUARE_VERSION;
  const note = clean(`CraftKit party for ${body.child} (turning ${Number(body.age)}) | ${body.world}${body.world === 'custom-world' ? ' (' + clean(body.customWorld, 200) + ')' : ''} | ${body.date} | ${clean(body.first, 40)} ${clean(body.last, 40)} ${clean(body.phone, 30)}`, 480);
  const res = await fetchFn(base + '/v2/payments', {
    method: 'POST', headers,
    body: JSON.stringify({
      source_id: body.sourceId, idempotency_key: clean(body.idempotencyKey, 45),
      amount_money: { amount: price(body.world, body.code), currency: 'USD' },
      location_id: env.SQUARE_LOCATION_ID, buyer_email_address: clean(body.email, 120),
      reference_id: clean(body.date + '-' + body.world, 40), note
    })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.payment) return { status: 402, json: { ok: false, message: 'The payment was declined. Your card was not charged. Please check the card details or try another card.' } };
  return { status: 200, json: { ok: true, paymentId: data.payment.id, receiptUrl: data.payment.receipt_url || '' } };
}

// ---- Netlify wrapper (change only this part for Vercel or Cloudflare) ----
exports.handler = async (event) => {
  const origin = process.env.ALLOWED_ORIGIN || '*';
  const cors = { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: cors, body: '' };
  let body; try { body = JSON.parse(event.body || '{}'); } catch (e) { body = null; }
  const out = await book(body, process.env, fetch);
  return { statusCode: out.status, headers: Object.assign({ 'Content-Type': 'application/json' }, cors), body: JSON.stringify(out.json) };
};
exports._book = book; exports._price = price;
