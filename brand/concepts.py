#!/usr/bin/env python3
"""Niyam Consulting - less-expected logo directions (concept exploration)."""
import math, cairosvg

NAVY_D="#15233E"; NAVY_M="#22395E"; NAVY_L="#33527E"
GOLD="#C9A24B"; GOLD_D="#B0852E"; GOLD_L="#E6CB7E"
INK="#0E1A30"; MIST="#F6F8FB"; LINE="#E5E9F0"; GREY="#94A0B2"
FONT="font-family=\"'Helvetica Neue', Arial, sans-serif\""

def rot(p, deg, cx=60, cy=60):
    a=math.radians(deg); x,y=p[0]-cx,p[1]-cy
    return (cx+x*math.cos(a)-y*math.sin(a), cy+x*math.sin(a)+y*math.cos(a))

def poly(pts, fill, extra=""):
    s=" ".join(f"{x:.2f},{y:.2f}" for x,y in pts)
    return f'<polygon points="{s}" fill="{fill}" {extra}/>'

# ---------------------------------------------------------------- A. APERTURE
def mark_aperture(ml, md, al, ad, node):
    """Pinwheel aperture - precision, focus, order from complexity."""
    p=[f'<circle cx="60" cy="60" r="54" fill="none" stroke="{al}" stroke-width="1.4" opacity="0.55"/>']
    tip=(60,14); side=(100,54); inner=(60,54)
    for k in range(4):
        d=k*90
        t=rot(tip,d); s=rot(side,d); i=rot(inner,d)
        p.append(poly([t,s,i], ml if k%2==0 else md))
    # centre aperture diamond
    p.append(poly([(60,53),(67,60),(60,67),(53,60)], al))
    p.append(f'<circle cx="60" cy="60" r="2.4" fill="{node}"/>')
    return "".join(p)

# ------------------------------------------------------------- B. EQUILIBRIUM
def mark_equilibrium(ml, md, al, ad, node):
    """Two forms in balance - judgement, principle, duality held in poise."""
    petal="M60,66 C48,48 48,30 60,18 C72,30 72,48 60,66 Z"
    g=[f'<g opacity="0.96"><path d="{petal}" fill="{md}" transform="rotate(-27 60 66)"/></g>']
    g.append(f'<path d="{petal}" fill="{al}" transform="rotate(27 60 66)" opacity="0.95"/>')
    g.append(f'<circle cx="60" cy="68" r="4.2" fill="{node}"/>')
    return "".join(g)

# ------------------------------------------------------------------- C. ORDER
def mark_order(ml, md, al, ad, node):
    """Nested geometry - structure, discipline, order within order."""
    p=[f'<rect x="20" y="20" width="80" height="80" rx="18" fill="none" stroke="{md}" stroke-width="8"/>']
    dia=[(60,34),(86,60),(60,86),(34,60)]
    p.append(poly(dia, "none", f'stroke="{al}" stroke-width="6.5" stroke-linejoin="round"'))
    p.append(f'<rect x="52" y="52" width="16" height="16" rx="3" fill="{node}" transform="rotate(45 60 60)"/>')
    return "".join(p)

# -------------------------------------------------------------- D. SHIROREKHA
def mark_shiro(ml, md, al, ad, node):
    """The unifying line - drawn from Devanagari's shirorekha, the bar that
       binds separate marks into one ordered word. Principle that brings order."""
    p=[f'<rect x="24" y="26" width="72" height="8" rx="4" fill="{al}"/>']          # top bar (gold)
    p.append(f'<rect x="33" y="38" width="8" height="48" rx="4" fill="{md}"/>')      # left stroke
    p.append(f'<rect x="79" y="38" width="8" height="34" rx="4" fill="{ml}"/>')      # right stroke
    p.append(f'<path d="M37,80 Q60,104 83,72" fill="none" stroke="{md}" stroke-width="8" stroke-linecap="round"/>')  # ligature
    p.append(f'<circle cx="60" cy="58" r="4.6" fill="{node}"/>')
    return "".join(p)

CONCEPTS=[
    ("APERTURE", "Precision &amp; focus", mark_aperture,
     "Interlocking blades resolve to a single point — bringing order and focus to complexity."),
    ("EQUILIBRIUM", "Balanced judgement", mark_equilibrium,
     "Two forms held in poise — sound judgement, weighing every side before advising."),
    ("ORDER", "Structure &amp; discipline", mark_order,
     "Frame within frame — disciplined structure, the literal sense of niyam: rule and order."),
    ("SHIROREKHA", "Sanskrit heritage", mark_shiro,
     "The unifying line from Devanagari that binds marks into one word — principle made visible."),
]

# light palette (navy on white) and reversed (light on navy)
LP=(NAVY_L, NAVY_D, GOLD, GOLD_D, GOLD)
RP=("#D7E0EE", "#9FB0CC", GOLD_L, GOLD_D, GOLD_L)

def board():
    W,H=1480,1120
    s=[f'<svg width="{W}" height="{H}" viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg" {FONT}>']
    s.append('<defs>')
    s.append(f'<linearGradient id="navyG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{NAVY_M}"/><stop offset="1" stop-color="{INK}"/></linearGradient>')
    s.append('<filter id="sft" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#0E1A30" flood-opacity="0.13"/></filter>')
    s.append('</defs>')
    s.append(f'<rect width="{W}" height="{H}" fill="{MIST}"/>')
    s.append(f'<text x="70" y="70" font-size="26" font-weight="600" fill="{NAVY_D}">Niyam Consulting — four less-expected directions</text>')
    s.append(f'<text x="70" y="98" font-size="15" fill="{GREY}">Moving past the compass. Each mark is built from the meaning of “Niyam”: principle, order, discipline, judgement.</text>')

    cw,ch=650,440; gx,gy=70,140; gapx=40; gapy=40
    for idx,(name,tag,fn,desc) in enumerate(CONCEPTS):
        col=idx%2; row=idx//2
        x=gx+col*(cw+gapx); y=gy+row*(ch+gapy)
        s.append(f'<g filter="url(#sft)"><rect x="{x}" y="{y}" width="{cw}" height="{ch}" rx="18" fill="#FFFFFF"/></g>')
        # label
        s.append(f'<text x="{x+40}" y="{y+52}" font-size="14" font-weight="700" letter-spacing="2" fill="{GOLD_D}">{name}</text>')
        s.append(f'<text x="{x+40}" y="{y+76}" font-size="15" fill="{NAVY_M}">{tag}</text>')
        s.append(f'<circle cx="{x+cw-46}" cy="{y+52}" r="14" fill="{MIST}"/><text x="{x+cw-46}" y="{y+57}" text-anchor="middle" font-size="14" fill="{GREY}">{idx+1}</text>')
        # big mark on light
        s.append(f'<g transform="translate({x+44},{y+108}) scale(1.95)">{fn(*LP)}</g>')
        # reversed chip on navy
        s.append(f'<rect x="{x+300}" y="{y+118}" width="120" height="120" rx="20" fill="url(#navyG)"/>')
        s.append(f'<g transform="translate({x+300},{y+118}) scale(1.0)">{fn(*RP)}</g>')
        # mono chip
        s.append(f'<rect x="{x+440}" y="{y+118}" width="120" height="120" rx="20" fill="{MIST}" stroke="{LINE}"/>')
        s.append(f'<g transform="translate({x+440},{y+118}) scale(1.0)">{fn("#3A3A3A","#171717","#7C7C7C","#5A5A5A","#5A5A5A")}</g>')
        # lockup
        ly=y+300
        s.append(f'<g transform="translate({x+44},{ly}) scale(0.62)">{fn(*LP)}</g>')
        s.append(f'<text x="{x+128}" y="{ly+44}" font-size="34" font-weight="600" fill="{NAVY_D}">Niyam</text>')
        s.append(f'<text x="{x+131}" y="{ly+66}" font-size="11" letter-spacing="6" fill="{GOLD}">CONSULTING</text>')
        # rationale
        words=desc.split(); lines=[]; cur=""
        for w in words:
            if len(cur)+len(w)>58: lines.append(cur); cur=w
            else: cur=(cur+" "+w).strip()
        lines.append(cur)
        for i,ln in enumerate(lines):
            s.append(f'<text x="{x+40}" y="{y+ch-58+i*20}" font-size="13.5" fill="{NAVY_M}" opacity="0.85">{ln}</text>')
    s.append('</svg>')
    return "".join(s)

path="/home/user/claudecode/brand/niyam-concepts.svg"
open(path,"w").write(board())
cairosvg.svg2png(url=path, write_to=path.replace(".svg",".png"), scale=2)
print("done")
