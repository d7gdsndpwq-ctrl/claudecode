#!/usr/bin/env python3
"""Generate the Niyam Consulting brand kit (sophisticated, Canva-style)."""
import math, cairosvg, os

# ---- palette --------------------------------------------------------------
NAVY_D  = "#15233E"
NAVY_M  = "#1E3357"
NAVY_L  = "#2C466E"
GOLD    = "#C9A24B"
GOLD_D  = "#B0852E"
GOLD_L  = "#E6CB7E"
INK     = "#0E1A30"
MIST    = "#F6F8FB"
LINE    = "#E5E9F0"
GREY    = "#9AA4B5"

# ---- faceted compass star -------------------------------------------------
# geometry around centre (60,60)
C   = (60, 60)
N, E, S, W = (60, 10), (110, 60), (60, 110), (10, 60)
o   = 16 / math.sqrt(2)            # inner vertex offset (~11.31)
NE, SE, SW, NW = (60+o, 60-o), (60+o, 60+o), (60-o, 60+o), (60-o, 60-o)

def tri(a, b, c, fill):
    return f'<polygon points="{a[0]:.2f},{a[1]:.2f} {b[0]:.2f},{b[1]:.2f} {c[0]:.2f},{c[1]:.2f}" fill="{fill}"/>'

def star(nl, nd, gl, gd, ring, center_in, ticks=True):
    """Return an <g> for a faceted star, sized 120x120 (centre 60,60)."""
    p = []
    # ring + ticks
    p.append(f'<circle cx="60" cy="60" r="57" fill="none" stroke="{ring}" stroke-width="1.6" opacity="0.9"/>')
    if ticks:
        for i in range(12):
            ang = math.radians(i * 30)
            long = i % 3 == 0
            r1, r2 = (51, 57) if long else (54, 57)
            x1, y1 = 60 + r1*math.sin(ang), 60 - r1*math.cos(ang)
            x2, y2 = 60 + r2*math.sin(ang), 60 - r2*math.cos(ang)
            p.append(f'<line x1="{x1:.2f}" y1="{y1:.2f}" x2="{x2:.2f}" y2="{y2:.2f}" stroke="{ring}" stroke-width="{1.4 if long else 0.9}" opacity="{0.95 if long else 0.5}"/>')
    # arms (lit from top-left)
    p.append(tri(C, NW, N, gl)); p.append(tri(C, N, NE, gd))   # north (gold)
    p.append(tri(C, NE, E, nl)); p.append(tri(C, E, SE, nd))   # east
    p.append(tri(C, SW, S, nl)); p.append(tri(C, S, SE, nd))   # south
    p.append(tri(C, NW, W, nl)); p.append(tri(C, W, SW, nd))   # west
    # centre
    p.append(f'<circle cx="60" cy="60" r="6.4" fill="{gl}"/>')
    p.append(f'<circle cx="60" cy="60" r="2.6" fill="{center_in}"/>')
    return "".join(p)

STAR_NAVY = star(NAVY_L, NAVY_D, GOLD_L, GOLD_D, GOLD, NAVY_D)
STAR_REV  = star("#E9EEF6", "#AFBCD2", GOLD_L, GOLD_D, GOLD_L, NAVY_D)
STAR_MONO = star("#3A3A3A", "#171717", "#8A8A8A", "#5C5C5C", "#5C5C5C", "#FFFFFF", ticks=True)

SHADOW = ('<filter id="soft" x="-40%" y="-40%" width="180%" height="180%">'
          '<feDropShadow dx="0" dy="6" stdDeviation="9" flood-color="#0E1A30" flood-opacity="0.18"/></filter>')
SHADOW_S = ('<filter id="softs" x="-40%" y="-40%" width="180%" height="180%">'
            '<feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#0E1A30" flood-opacity="0.16"/></filter>')

FONT = "font-family=\"'Helvetica Neue', Arial, sans-serif\""

def wordmark(x, y, color=NAVY_D, accent=GOLD, scale=1.0, anchor="start"):
    a = f'text-anchor="{anchor}"' if anchor != "start" else ""
    return (f'<g transform="translate({x},{y})">'
            f'<text {a} y="0" font-size="{56*scale:.1f}" font-weight="600" letter-spacing="0.5" fill="{color}">Niyam</text>'
            f'<text {a} y="{32*scale:.1f}" font-size="{19*scale:.1f}" font-weight="400" letter-spacing="{11*scale:.1f}" fill="{accent}">CONSULTING</text>'
            f'</g>')

# ===========================================================================
# BOARD 1 — brand presentation
# ===========================================================================
def board():
    W_, H_ = 1400, 1880
    s = [f'<svg width="{W_}" height="{H_}" viewBox="0 0 {W_} {H_}" xmlns="http://www.w3.org/2000/svg" {FONT}>']
    s.append('<defs>')
    s.append(f'<linearGradient id="navyG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{NAVY_M}"/><stop offset="1" stop-color="{INK}"/></linearGradient>')
    s.append(f'<radialGradient id="glow" cx="0.5" cy="0.42" r="0.6"><stop offset="0" stop-color="{NAVY_L}" stop-opacity="0.55"/><stop offset="1" stop-color="{INK}" stop-opacity="0"/></radialGradient>')
    s.append(f'<linearGradient id="goldG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{GOLD_L}"/><stop offset="1" stop-color="{GOLD_D}"/></linearGradient>')
    s.append(SHADOW); s.append(SHADOW_S)
    s.append('</defs>')
    s.append(f'<rect width="{W_}" height="{H_}" fill="{MIST}"/>')

    # ---- hero ----
    s.append('<g>')
    s.append(f'<rect x="0" y="0" width="{W_}" height="640" fill="url(#navyG)"/>')
    s.append(f'<rect x="0" y="0" width="{W_}" height="640" fill="url(#glow)"/>')
    s.append(f'<g transform="translate({W_/2-60},150) scale(1.55)" filter="url(#soft)">{STAR_REV}</g>')
    s.append(f'<text x="{W_/2}" y="500" text-anchor="middle" font-size="72" font-weight="600" letter-spacing="2" fill="#FFFFFF">Niyam</text>')
    s.append(f'<text x="{W_/2}" y="538" text-anchor="middle" font-size="22" font-weight="400" letter-spacing="17" fill="{GOLD_L}">CONSULTING</text>')
    s.append(f'<line x1="{W_/2-60}" y1="572" x2="{W_/2+60}" y2="572" stroke="{GOLD}" stroke-width="1.5" opacity="0.8"/>')
    s.append(f'<text x="{W_/2}" y="602" text-anchor="middle" font-size="16" font-weight="300" letter-spacing="6" fill="#C7D2E2">GUIDED BY PRINCIPLE</text>')
    s.append('</g>')

    def heading(x, y, t):
        return (f'<text x="{x}" y="{y}" font-size="13" font-weight="600" letter-spacing="3" fill="{GREY}">{t}</text>'
                f'<line x1="{x}" y1="{y+14}" x2="{W_-90}" y2="{y+14}" stroke="{LINE}" stroke-width="1"/>')

    # ---- the mark ----
    s.append(heading(90, 730, "THE MARK"))
    s.append(f'<g transform="translate(150,770) scale(2.1)" filter="url(#softs)">{STAR_NAVY}</g>')
    mx = 560
    s.append(f'<text x="{mx}" y="800" font-size="24" font-weight="600" fill="{NAVY_D}">A north-star compass</text>')
    for i, line in enumerate([
        "A faceted four-point star set in a calibrated ring — a",
        "compass for direction and judgement. “Niyam” means",
        "principle and order, so the mark stands for guidance you",
        "can trust. The single gold point marks true north."]):
        s.append(f'<text x="{mx}" y="{838+i*30}" font-size="17" fill="{NAVY_M}" opacity="0.85">{line}</text>')
    # mini feature chips
    for i,(t,) in enumerate([("Direction",),("Precision",),("Principle",)]):
        cx = mx + i*150
        s.append(f'<rect x="{cx}" y="975" width="135" height="40" rx="20" fill="#FFFFFF" stroke="{LINE}"/>'
                 f'<circle cx="{cx+22}" cy="995" r="4" fill="{GOLD}"/>'
                 f'<text x="{cx+38}" y="1000" font-size="14" font-weight="500" fill="{NAVY_D}">{t}</text>')

    # ---- logo variations ----
    s.append(heading(90, 1110, "LOGO LOCKUPS"))
    # primary on white
    s.append(f'<rect x="90" y="1150" width="600" height="190" rx="14" fill="#FFFFFF" stroke="{LINE}"/>')
    s.append(f'<g transform="translate(120,1185) scale(0.78)" filter="url(#softs)">{STAR_NAVY}</g>')
    s.append(wordmark(250, 1252))
    # reversed on navy
    s.append(f'<rect x="710" y="1150" width="600" height="190" rx="14" fill="url(#navyG)"/>')
    s.append(f'<g transform="translate(740,1185) scale(0.78)">{STAR_REV}</g>')
    s.append(wordmark(870, 1252, color="#FFFFFF", accent=GOLD_L))
    # stacked
    s.append(f'<rect x="90" y="1360" width="385" height="230" rx="14" fill="{MIST}" stroke="{LINE}"/>')
    s.append(f'<g transform="translate(222,1390) scale(0.62)">{STAR_NAVY}</g>')
    s.append(f'<text x="282" y="1530" text-anchor="middle" font-size="34" font-weight="600" fill="{NAVY_D}">Niyam</text>')
    s.append(f'<text x="284" y="1556" text-anchor="middle" font-size="12" letter-spacing="7" fill="{GOLD}">CONSULTING</text>')
    # monochrome
    s.append(f'<rect x="495" y="1360" width="385" height="230" rx="14" fill="#FFFFFF" stroke="{LINE}"/>')
    s.append(f'<g transform="translate(627,1390) scale(0.62)">{STAR_MONO}</g>')
    s.append(f'<text x="687" y="1530" text-anchor="middle" font-size="34" font-weight="600" fill="#1d1d1d">Niyam</text>')
    s.append(f'<text x="689" y="1556" text-anchor="middle" font-size="12" letter-spacing="7" fill="#777">CONSULTING</text>')
    # icon tile
    s.append(f'<rect x="900" y="1360" width="410" height="230" rx="14" fill="{MIST}" stroke="{LINE}"/>')
    s.append(f'<rect x="945" y="1400" width="150" height="150" rx="34" fill="url(#navyG)" filter="url(#softs)"/>')
    s.append(f'<g transform="translate(975,1430) scale(0.75)">{STAR_REV}</g>')
    s.append(f'<rect x="1120" y="1430" width="92" height="92" rx="46" fill="url(#navyG)"/>')
    s.append(f'<g transform="translate(1133,1443) scale(0.55)">{STAR_REV}</g>')
    s.append(f'<text x="1150" y="1570" text-anchor="middle" font-size="12" fill="{GREY}">app  ·  avatar</text>')

    # ---- colour + type ----
    s.append(heading(90, 1660, "COLOUR  &amp;  TYPE"))
    sw = [("Deep Navy", NAVY_D, "#FFF"), ("Slate", NAVY_L, "#FFF"), ("Gold", GOLD, INK), ("Light Gold", GOLD_L, INK), ("Mist", MIST, GREY)]
    for i,(name,hexv,tc) in enumerate(sw):
        x = 90 + i*132
        s.append(f'<rect x="{x}" y="1700" width="116" height="92" rx="10" fill="{hexv}" stroke="{LINE if hexv==MIST else hexv}"/>')
        s.append(f'<text x="{x+12}" y="1760" font-size="13" font-weight="600" fill="{tc}">{name}</text>')
        s.append(f'<text x="{x+12}" y="1779" font-size="11" fill="{tc}" opacity="0.8">{hexv}</text>')
    # type specimen
    tx = 800
    s.append(f'<text x="{tx}" y="1730" font-size="58" font-weight="600" fill="{NAVY_D}">Aa</text>')
    s.append(f'<text x="{tx+95}" y="1718" font-size="15" font-weight="600" fill="{NAVY_D}">Geometric Sans</text>')
    s.append(f'<text x="{tx+95}" y="1740" font-size="13" fill="{GREY}">Poppins / Montserrat — 600 &amp; 400</text>')
    s.append(f'<text x="{tx+95}" y="1762" font-size="13" letter-spacing="1" fill="{NAVY_M}">ABCDEFG abcdefg 0123456789</text>')
    s.append(f'<text x="{tx}" y="1792" font-size="13" fill="{GREY}">Wordmark 600 · Tagline 400, wide tracking</text>')

    s.append('</svg>')
    return "".join(s)

# ===========================================================================
# BOARD 2 — mockups
# ===========================================================================
def mockups():
    W_, H_ = 1400, 1000
    s = [f'<svg width="{W_}" height="{H_}" viewBox="0 0 {W_} {H_}" xmlns="http://www.w3.org/2000/svg" {FONT}>']
    s.append('<defs>')
    s.append(f'<linearGradient id="navyG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{NAVY_M}"/><stop offset="1" stop-color="{INK}"/></linearGradient>')
    s.append(f'<radialGradient id="glow" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="{NAVY_L}" stop-opacity="0.5"/><stop offset="1" stop-color="{INK}" stop-opacity="0"/></radialGradient>')
    s.append(SHADOW); s.append(SHADOW_S)
    s.append('</defs>')
    s.append(f'<rect width="{W_}" height="{H_}" fill="#EDEFF3"/>')
    s.append(f'<text x="90" y="70" font-size="13" font-weight="600" letter-spacing="3" fill="{GREY}">IN USE</text>')
    s.append(f'<line x1="90" y1="84" x2="{W_-90}" y2="84" stroke="{LINE}" stroke-width="1"/>')

    # business card front (navy)
    s.append(f'<g filter="url(#soft)"><rect x="90" y="130" width="500" height="290" rx="16" fill="url(#navyG)"/></g>')
    s.append(f'<rect x="90" y="130" width="500" height="290" rx="16" fill="url(#glow)"/>')
    s.append(f'<g transform="translate(280,170) scale(1.2)">{STAR_REV}</g>')
    s.append(f'<text x="340" y="370" text-anchor="middle" font-size="34" font-weight="600" letter-spacing="1" fill="#FFFFFF">Niyam</text>')
    s.append(f'<text x="342" y="392" text-anchor="middle" font-size="11" letter-spacing="8" fill="{GOLD_L}">CONSULTING</text>')

    # business card back (white)
    s.append(f'<g filter="url(#soft)"><rect x="640" y="130" width="500" height="290" rx="16" fill="#FFFFFF"/></g>')
    s.append(f'<g transform="translate(680,165) scale(0.62)">{STAR_NAVY}</g>')
    s.append(f'<text x="760" y="205" font-size="26" font-weight="600" fill="{NAVY_D}">Niyam</text>')
    s.append(f'<text x="761" y="224" font-size="9" letter-spacing="6" fill="{GOLD}">CONSULTING</text>')
    s.append(f'<line x1="680" y1="290" x2="1100" y2="290" stroke="{LINE}"/>')
    s.append(f'<text x="680" y="330" font-size="20" font-weight="600" fill="{NAVY_D}">Rohin Mehta</text>')
    s.append(f'<text x="680" y="352" font-size="13" fill="{GREY}">Principal Consultant</text>')
    for i,(t) in enumerate(["niyamconsulting.com", "hello@niyamconsulting.com", "+1 (555) 012 3456"]):
        s.append(f'<circle cx="684" cy="{380+i*24-4}" r="2.5" fill="{GOLD}"/>'
                 f'<text x="700" y="{380+i*24}" font-size="13" fill="{NAVY_M}">{t}</text>')

    # phone app icon
    s.append(f'<g filter="url(#soft)"><rect x="90" y="470" width="220" height="420" rx="40" fill="{INK}"/></g>')
    s.append(f'<rect x="104" y="484" width="192" height="392" rx="30" fill="url(#navyG)"/>')
    s.append(f'<rect x="160" y="560" width="80" height="80" rx="20" fill="#FFFFFF" filter="url(#softs)"/>')
    s.append(f'<g transform="translate(168,568) scale(0.533)">{STAR_NAVY}</g>')
    s.append(f'<text x="200" y="665" text-anchor="middle" font-size="13" font-weight="500" fill="#FFFFFF">Niyam</text>')
    # dock dots
    for i in range(4):
        s.append(f'<rect x="{128+i*40}" y="820" width="28" height="28" rx="8" fill="#FFFFFF" opacity="0.18"/>')

    # browser window
    s.append(f'<g filter="url(#soft)"><rect x="360" y="470" width="780" height="420" rx="16" fill="#FFFFFF"/></g>')
    s.append(f'<rect x="360" y="470" width="780" height="48" rx="16" fill="#F2F4F8"/>')
    s.append(f'<rect x="360" y="500" width="780" height="18" fill="#F2F4F8"/>')
    for i,c in enumerate(["#FF5F57","#FEBC2E","#28C840"]):
        s.append(f'<circle cx="{386+i*22}" cy="494" r="6" fill="{c}"/>')
    s.append(f'<rect x="470" y="482" width="500" height="24" rx="12" fill="#FFFFFF" stroke="{LINE}"/>')
    s.append(f'<g transform="translate(478,488) scale(0.10)">{STAR_NAVY}</g>')
    s.append(f'<text x="500" y="499" font-size="12" fill="{GREY}">niyamconsulting.com</text>')
    # site hero
    s.append(f'<g transform="translate(395,545) scale(0.42)">{STAR_NAVY}</g>')
    s.append(f'<text x="455" y="582" font-size="22" font-weight="600" fill="{NAVY_D}">Niyam</text>')
    s.append(f'<text x="456" y="598" font-size="8" letter-spacing="5" fill="{GOLD}">CONSULTING</text>')
    for i,t in enumerate(["Services","Approach","About","Contact"]):
        s.append(f'<text x="{840+i*72}" y="582" font-size="13" fill="{NAVY_M}">{t}</text>')
    s.append(f'<text x="400" y="700" font-size="40" font-weight="600" fill="{NAVY_D}">Strategy, guided by principle.</text>')
    s.append(f'<text x="400" y="740" font-size="17" fill="{GREY}">Clear direction for the decisions that matter most.</text>')
    s.append(f'<rect x="400" y="770" width="190" height="50" rx="25" fill="url(#navyG)"/>')
    s.append(f'<text x="495" y="801" text-anchor="middle" font-size="15" font-weight="500" fill="#FFFFFF">Book a consult</text>')
    s.append(f'<rect x="610" y="770" width="160" height="50" rx="25" fill="none" stroke="{GOLD}"/>')
    s.append(f'<text x="690" y="801" text-anchor="middle" font-size="15" font-weight="500" fill="{GOLD_D}">Our work</text>')

    s.append('</svg>')
    return "".join(s)

# ---- write + render -------------------------------------------------------
os.makedirs("/home/user/claudecode/brand", exist_ok=True)
items = {"niyam-brand-board": board(), "niyam-mockups": mockups()}
for name, svg in items.items():
    path = f"/home/user/claudecode/brand/{name}.svg"
    open(path, "w").write(svg)
    cairosvg.svg2png(url=path, write_to=path.replace(".svg", ".png"), scale=2)
    print("wrote", name)
print("done")
