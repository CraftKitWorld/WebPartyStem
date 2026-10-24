INK="#141212";CORAL="#D63A28";TINT="#FFF0C9";LINE="#E0CD9A";MUTED="#4A4442"
F="font-family:Arial,Helvetica,sans-serif;"
VOUCHER_CODE="CRAFT50VIP"      # must match voucherCode in craftkit-booking.js (set from copy/emails.md by build_comms.py)
def utm(c,content,extra=""):
    # personalised booking link: Klaviyo fills first name, the theme saved from the Meta form (profile property ck_party_world) and the voucher code
    # world: the theme saved from the Meta form (profile property ck_party_world). age: the child's age from the Meta form
    # (profile property ck_child_age), which the booking page uses to open on the right age group when no world is known.
    world="" if "world=" in extra else "world={{ person|lookup:'ck_party_world'|default:'' }}&amp;age={{ person|lookup:'ck_child_age'|default:'' }}&amp;"
    return f"https://[YOUR-SITE]/book?{extra}{world}first={{{{ first_name|default:'' }}}}&amp;code={VOUCHER_CODE}&amp;utm_source=klaviyo&amp;utm_medium=email&amp;utm_campaign={c}&amp;utm_content={content}"
def btn(label,href,bg=CORAL,fg="#FFFFFF"):
    return f'''<table role="presentation" class="btn-full" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="{bg}" style="background-color:{bg};border:2px solid {INK if bg!=CORAL else CORAL};"><a href="{href}" target="_blank" style="display:inline-block;padding:16px 28px;{F}font-size:17px;line-height:22px;font-weight:bold;color:{fg};text-decoration:none;">{label}</a></td></tr></table>'''
def photo(label,h,bg="#3A2E2A"):
    return f'''<tr><td align="center" bgcolor="{bg}" height="{h}" style="background-color:{bg};height:{h}px;{F}font-size:14px;line-height:20px;color:#FFFFFF;"><!-- <img src="https://[YOUR-CDN]/IMAGE.jpg" width="600" height="{h}" alt="" style="display:block;width:100%;max-width:600px;height:auto;"> -->[{label}]</td></tr>'''
def header(c):
    return f'''<tr><td class="pad" bgcolor="{INK}" style="background-color:{INK};padding:24px 40px;"><a href="https://[YOUR-SITE]?utm_source=klaviyo&amp;utm_medium=email&amp;utm_campaign={c}&amp;utm_content=header-logo" target="_blank" style="text-decoration:none;color:#FFFFFF;"><span style="{F}font-size:32px;line-height:32px;font-weight:800;letter-spacing:-1px;color:#FFFFFF;">CraftKit</span><br><span style="{F}font-size:11px;line-height:16px;font-weight:700;letter-spacing:2px;color:#FFFFFF;">BUILD YOUR DREAMS</span></a></td></tr>'''
def footer(c):
    return f'''<tr><td class="pad" bgcolor="{INK}" style="background-color:{INK};padding:32px 40px;{F}font-size:13px;line-height:20px;color:#FFFFFF;"><strong style="font-size:16px;">CraftKit World</strong><br>Hood River, OR, USA &middot; Melbourne, Australia<br><a href="tel:+15412884132" style="color:#FFFFFF;text-decoration:underline;">+1 (541) 288-4132</a><br><br>You're getting this because you signed up for CraftKit news. <a href="{{{{ unsubscribe_url }}}}" style="color:#FFFFFF;text-decoration:underline;">Unsubscribe</a> &middot; {{{{ organization.full_address }}}}</td></tr>'''
CSS='''body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;}img{-ms-interpolation-mode:bicubic;border:0;outline:none;}a{text-decoration:none;}
@media screen and (max-width:620px){.container{width:100% !important;max-width:100% !important;}.pad{padding-left:20px !important;padding-right:20px !important;}.h1{font-size:30px !important;line-height:34px !important;}.code{font-size:36px !important;}.col{display:block !important;width:100% !important;padding:0 0 14px 0 !important;}.btn-full{width:100% !important;}.q{font-size:26px !important;line-height:32px !important;}}'''
def page(title,pre,body,c,bg="#F4F0E4"):
    return f'''<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light">
<title>{title}</title>
<!--[if mso]><style>table,td,div,p,a{{font-family:Arial,Helvetica,sans-serif !important;}}</style><![endif]-->
<style>{CSS}</style></head>
<body style="margin:0;padding:0;background-color:{bg};">
<!-- KLAVIYO: every link carries utm_source/medium/campaign/content. Set Reply-to to a monitored inbox. {{{{ first_name|default:'there' }}}} is Klaviyo merge syntax. -->
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">{pre}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{bg}" style="background-color:{bg};"><tr><td align="center" style="padding:24px 10px;">
<!--[if mso]><table role="presentation" align="center" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="width:600px;max-width:600px;background-color:#FFFFFF;">
{header(c)}
{body}
{footer(c)}
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>'''
def p(t,extra=""): return f'<p style="margin:0 0 16px 0;{F}font-size:17px;line-height:26px;color:{INK};{extra}">{t}</p>'
def h1(t): return f'<h1 class="h1" style="margin:0 0 20px 0;{F}font-size:36px;line-height:40px;font-weight:bold;letter-spacing:-1px;color:{INK};">{t}</h1>'
def row(inner,pad="32px 40px 0 40px",bg=None):
    b=f' bgcolor="{bg}" style="background-color:{bg};padding:{pad};"' if bg else f' style="padding:{pad};"'
    return f'<tr><td class="pad"{b}>{inner}</td></tr>'

