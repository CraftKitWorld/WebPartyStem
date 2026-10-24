#!/usr/bin/env python3
"""Rebuilds the three Klaviyo emails and the social ad layouts from the markdown copy files.

    python3 build_comms.py            # rebuild HTML
    python3 build_comms.py --png      # also re-export the social PNGs (needs: pip install playwright && playwright install chromium)

Reads   copy/emails.md, copy/social.md           (the words you edit)
        ../craftkit-products.js                   (prices, steps, age groups and worlds: same data as the website)
Writes  ../email/craftkit-email-*.html, ../social/craftkit-social-ad-layouts.html (+ PNGs with --png)
Edit copy in the .md files only. Layout/design lives in this script, comms_helpers.py and social.css.
"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
exec(open(os.path.join(HERE, 'comms_helpers.py')).read())          # INK, CORAL, utm(), btn(), photo(), page(), p(), h1(), row() ...
KRAFT = "#E8D3A8"
TONE = {'forest': '#2F5D3A', 'desert': '#7A5226', 'ocean': '#1F4068', 'violet': '#4B2E6B', 'mars': '#7A3B26', 'slate': '#4A5045', 'cocoa': '#3A2E2A', 'moss': '#6B7A63', 'sakura': '#6B2E3E', 'pine': '#2E5A3F', 'walnut': '#5A3A2E'}

# ---------- website data (single source for prices, steps and worlds) ----------
_t = open(os.path.join(ROOT, 'craftkit-products.js'), encoding='utf-8').read()
PP = json.loads(_t[_t.index('window.CK_PRODUCTS = ') + len('window.CK_PRODUCTS = '):_t.index('};\n\n(function') + 1])['party']
def tok(s):
    return (s.replace('{price}', '$%d' % PP['price']).replace('{customPrice}', '$%d' % (PP['price'] + PP['customUpcharge']))
             .replace('{voucherOff}', '$%d' % PP['voucherOff']).replace('{voucherPrice}', '$%d' % (PP['price'] - PP['voucherOff']))
             .replace('{upcharge}', '$%d' % PP['customUpcharge']))

# ---------- markdown copy ----------
def load_md(path):
    d, cur, key = {}, None, None
    for line in open(path, encoding='utf-8').read().split('\n'):
        if line.startswith('## '): cur = line[3:].strip(); d[cur] = {}; key = None
        elif cur and re.match(r'^[a-z0-9_]+:( |$)', line): key, v = line.split(':', 1); d[cur][key] = v.strip()
        elif cur and key and line.startswith('  ') and line.strip(): d[cur][key] += ' ' + line.strip()
    return d
def esc(s):
    s = s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    return re.sub(r'&lt;(/?)(strong|b)&gt;', r'<\1\2>', s)
def T(sec, key, markup=True):          # text with tokens filled and HTML escaped (allowed: <strong>, <b>)
    v = tok(sec[key].replace('{voucher_code}', VOUCHER_CODE))
    return esc(v)
def br(s): return s.replace(' // ', '<br>')

E = load_md(os.path.join(HERE, 'copy', 'emails.md')); S = load_md(os.path.join(HERE, 'copy', 'social.md'))
VOUCHER_CODE = E['shared']['voucher_code']
KRAFT_OUT = os.path.join(ROOT, 'email'); os.makedirs(KRAFT_OUT, exist_ok=True)

def label(t): return f'<tr><td align="center" bgcolor="{KRAFT}" style="background-color:{KRAFT};padding:10px 20px;border-bottom:2px solid {INK};{F}font-size:12px;line-height:16px;font-weight:bold;letter-spacing:3px;color:{INK};">{t}</td></tr>'
def hi(): return p("Hi {{ first_name|default:'there' }},", "font-weight:bold;font-size:20px;margin-bottom:12px;")
def sig():
    s = E['shared']
    return f'<p style="margin:24px 0 0 0;{F}font-size:17px;line-height:26px;color:{INK};">{esc(s["signoff"])}<br><strong>{esc(s["founder"])}</strong><br><span style="font-size:14px;color:{MUTED};">{esc(s["place"])}</span></p>'
def ps(t): return row(f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{TINT}" style="background-color:{TINT};border-left:6px solid {CORAL};"><tr><td style="padding:18px 22px;{F}font-size:16px;line-height:24px;color:{INK};"><strong>P.S.</strong> {t}</td></tr></table>', "28px 40px 44px 40px")
def step(n, t, d): return f'<tr><td width="72" valign="top" style="padding:0 0 22px 0;width:72px;{F}font-size:56px;line-height:52px;font-weight:bold;color:{CORAL};letter-spacing:-2px;">{n}</td><td valign="top" style="padding:2px 0 22px 0;{F}"><p style="margin:0 0 4px 0;{F}font-size:21px;line-height:26px;font-weight:bold;color:{INK};">{t}</p><p style="margin:0;{F}font-size:16px;line-height:24px;color:{MUTED};">{d}</p></td></tr>'
def write(name, html): open(os.path.join(KRAFT_OUT, name), 'w', encoding='utf-8').write(html)

# ---------------- EMAIL 1 ----------------
e = E['email-1-welcome-voucher']; c = "welcome-voucher"
b = label(T(e, 'label').replace('·', '&nbsp;&middot;&nbsp;'))
b += photo(T(e, 'hero_photo'), 260)
b += row(f'''{hi()}{h1(T(e, 'headline'))}{p(T(e, 'intro1'))}{p(T(e, 'intro2'))}''')
b += row(f'''<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{INK}" style="background-color:{INK};"><tr><td align="center" style="padding:26px 20px 6px 20px;{F}font-size:16px;line-height:22px;color:#FFFFFF;">{T(e, 'voucher_line')}</td></tr><tr><td align="center" class="code" style="padding:0 20px 18px 20px;{F}font-size:44px;line-height:48px;font-weight:bold;letter-spacing:3px;color:{TINT};">{esc(VOUCHER_CODE)}</td></tr><tr><td align="center" style="padding:0 20px 28px 20px;">{btn(T(e, 'voucher_cta'), utm(c, "voucher-cta", "code=" + VOUCHER_CODE + "&amp;"))}</td></tr></table>''', "8px 40px 0 40px")
steps = ''.join(step(str(i + 1), esc(tok(a)), esc(tok(bb))) for i, (a, bb) in enumerate(PP['steps']))
b += row(f'<p style="margin:0 0 22px 0;{F}font-size:26px;line-height:30px;font-weight:bold;letter-spacing:-.5px;color:{INK};">{T(e, "how_heading")}</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{steps}</table>', "40px 40px 0 40px")
b += row(p(T(e, 'note'), f"font-size:15px;color:{MUTED};margin:0;"), "0 40px 0 40px")
b += row(sig(), "8px 40px 0 40px")
b += ps(T(e, 'ps'))
write('craftkit-email-1-welcome-voucher.html', page(T(e, 'subject'), T(e, 'preheader'), b, c, KRAFT))

# ---------------- EMAIL 2 (worlds come from craftkit-products.js, grouped by age group) ----------------
e = E['email-2-pick-a-world']; c = "pick-a-world"
def world_row(wid, name, blurb, col):
    href = utm(c, "world-" + wid, "world=" + wid + "&amp;")
    return f'<tr><td style="padding:0 0 14px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px solid {INK};"><tr><td class="col" width="130" height="96" align="center" valign="middle" bgcolor="{col}" style="width:130px;height:96px;background-color:{col};{F}font-size:12px;color:#FFFFFF;">[PHOTO]</td><td class="col" valign="middle" style="padding:14px 20px;{F}"><p style="margin:0 0 4px 0;{F}font-size:20px;line-height:24px;font-weight:bold;color:{INK};"><a href="{href}" target="_blank" style="color:{INK};text-decoration:none;">{esc(name)}</a></p><p style="margin:0;{F}font-size:15px;line-height:22px;color:{MUTED};">{esc(blurb)}</p></td></tr></table></td></tr>'
rows = ''
tiers_on = PP.get('tiersEnabled', True)
worlds = [w for w in PP['items'] if w['kind'] == 'world' and (tiers_on or w.get('core'))]
custom = [w for w in PP['items'] if w['kind'] == 'custom'][0]
groups = [(t, [w for w in worlds if w['tier'] == t['id']]) for t in PP['tiers']] if tiers_on else [(None, worlds)]
for t, ws in groups:
    if t: rows += f'<tr><td style="padding:{"0" if rows == "" else "10px"} 0 12px 0;{F}"><p style="margin:0;{F}font-size:13px;line-height:18px;font-weight:bold;letter-spacing:2px;color:{CORAL};">{esc(t["label"].upper())} &nbsp;&middot;&nbsp; {esc(t["name"].upper())}</p></td></tr>'
    for w in ws: rows += world_row(w['id'], w['name'], w['tagline'], TONE.get(w['tone'], '#4A4442'))
rows += world_row(custom['id'], T(e, 'custom_title'), T(e, 'custom_blurb').replace('&amp;', '&'), TONE['cocoa'])
b = label(T(e, 'label').replace('·', '&nbsp;&middot;&nbsp;'))
b += photo(T(e, 'hero_photo'), 300, "#2D2A5A")
b += row(f'''{hi()}{h1(T(e, 'headline'))}{p(T(e, 'intro1'))}{p(T(e, 'intro2'))}''')
b += row(f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{rows}</table>', "8px 40px 0 40px")
b += row(p(T(e, 'note'), f"font-size:16px;color:{MUTED};"), "10px 40px 0 40px")
b += row(btn(T(e, 'cta'), utm(c, "worlds-cta")), "6px 40px 0 40px")
b += row(sig(), "8px 40px 0 40px")
b += ps(T(e, 'ps'))
write('craftkit-email-2-pick-a-world.html', page(T(e, 'subject'), T(e, 'preheader'), b, c, KRAFT))

# ---------------- EMAIL 3 ----------------
e = E['email-3-voucher-expiry']; c = "voucher-expiry"
b = label(T(e, 'label').replace('·', '&nbsp;&middot;&nbsp;'))
b += row(f'''<p style="margin:0 0 18px 0;{F}font-size:13px;line-height:18px;font-weight:bold;letter-spacing:2px;color:{CORAL};">{T(e, 'quote_label')}</p><p class="q" style="margin:0 0 18px 0;{F}font-size:32px;line-height:38px;font-weight:bold;letter-spacing:-.5px;color:{INK};">&ldquo;{T(e, 'quote')}&rdquo;</p><p style="margin:0;{F}font-size:16px;line-height:22px;color:{MUTED};">{T(e, 'quote_who')}</p><p style="margin:14px 0 0 0;{F}font-size:12px;line-height:18px;color:{MUTED};border:1px dashed {MUTED};padding:8px;">{T(e, 'quote_note')}</p>''', "44px 40px 40px 40px", TINT)
steps = ''.join(step(str(i), T(e, f'step{i}_title'), T(e, f'step{i}_body')) for i in (1, 2, 3))
b += row(f'''{hi()}{h1(T(e, 'headline'))}{p(T(e, 'intro1'))}{p(T(e, 'intro2'))}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">{steps}</table>{btn(T(e, 'cta'), utm(c, "expiry-cta"))}''', "40px 40px 0 40px")
b += row(sig(), "8px 40px 0 40px")
b += ps(T(e, 'ps'))
write('craftkit-email-3-voucher-expiry.html', page(T(e, 'subject'), T(e, 'preheader'), b, c, KRAFT))

# ---------------- SOCIAL ----------------
def ph(label, col, extra=""): return f'<div class="ph" style="--c:{col};{extra}"><span>[{esc(label)}]</span></div>'
def art(id, w, h, inner, name): return f'<section class="art-wrap"><h2>{name} <small>{w}×{h}</small></h2><div class="art" id="{id}" style="width:{w}px;height:{h}px">{inner}</div></section>'
def s_(sec, key): return br(T(S[sec], key))
a = []
a.append(art("feed-a", 1080, 1350, f'''{ph(S["feed-a"]["photo"], "#5A2A22", "position:absolute;inset:0;")}
<div class="sticker" style="top:56px;right:56px;">{s_("feed-a", "sticker")}</div>
<div class="band"><p class="eyebrow">{s_("feed-a", "eyebrow")}</p><h3>{s_("feed-a", "headline")}</h3><div class="row"><span class="pill">{s_("feed-a", "cta")} &rarr;</span><span class="small">{s_("feed-a", "small")}</span></div></div>''', "Feed 4:5 · Layout 1 · bottom band (Ad A)"))
a.append(art("feed-b", 1080, 1350, f'''{ph(S["feed-b"]["photo"], "#2D2A5A", "position:absolute;inset:0;")}
<div class="scrim-top"></div>
<div class="topcopy"><h3 class="xl">{s_("feed-b", "headline")}</h3><p class="lead">{s_("feed-b", "lead")}</p></div>
<div class="botbar"><span class="logo">CraftKit</span><span class="pill">{s_("feed-b", "cta")} &rarr;</span></div>''', "Feed 4:5 · Layout 2 · headline over photo (Ad B)"))
a.append(art("square", 1080, 1080, f'''<div class="split-l"><p class="eyebrow dark">{s_("square", "eyebrow")}</p><h3 class="xl dark">{s_("square", "headline")}</h3><p class="lead dark">{s_("square", "lead")}</p><span class="pill">{s_("square", "cta")} &rarr;</span><span class="logo dark">CraftKit</span></div>{ph(S["square"]["photo"], "#1F4A3A", "position:absolute;top:0;right:0;width:46%;height:100%;")}''', "Square 1:1 · Layout 3 · split voucher"))
for i, col in enumerate(["#5A2A22", "#7A5226", "#1F4A3A"]):
    sec = S['story-%d' % (i + 1)]
    safe = f'<div class="story-copy"><p class="eyebrow">{i + 1} / 3</p><h3 class="xl">{br(T(sec, "headline"))}</h3></div>'
    if 'cta' in sec: safe += f'<div class="story-cta"><span class="pill big">{T(sec, "cta")} &rarr;</span></div>'
    a.append(art(f"story-{i + 1}", 1080, 1920, f'''{ph(sec["photo"], col, "position:absolute;inset:0;")}<div class="scrim-bot"></div><div class="logo-top logo">CraftKit</div>{safe}<div class="safe-guide"></div>''', f"Story / Reel 9:16 · Frame {i + 1} (Ad C)"))
CSS_SOC = open(os.path.join(HERE, 'social.css')).read()
html = f'''<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CraftKit Social Ad Layouts</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=DM+Sans:wght@500;700&display=swap" rel="stylesheet">
<style>
{CSS_SOC}</style></head><body>
<div class="intro"><h1>CraftKit social ad layouts</h1><p>{esc(S["intro"]["text"])}</p></div>
{"".join(a)}
</body></html>'''
os.makedirs(os.path.join(ROOT, 'social'), exist_ok=True)
open(os.path.join(ROOT, 'social', 'craftkit-social-ad-layouts.html'), 'w', encoding='utf-8').write(html)
print('Built 3 emails and the social layouts.')

if '--png' in sys.argv:
    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        br_ = pw.chromium.launch(); pg = br_.new_page(viewport={'width': 1300, 'height': 900})
        pg.goto('file://' + os.path.join(ROOT, 'social', 'craftkit-social-ad-layouts.html')); pg.wait_for_timeout(500)
        pg.add_style_tag(content='.safe-guide{display:none}')
        for i in ['feed-a', 'feed-b', 'square', 'story-1', 'story-2', 'story-3']:
            pg.locator('#' + i).screenshot(path=os.path.join(ROOT, 'social', f'ad-{i}.png'))
        br_.close()
    print('Exported social PNGs.')
