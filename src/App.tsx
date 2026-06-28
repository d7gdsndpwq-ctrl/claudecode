import { type CSSProperties } from "react";
import "./App.css";

const FONT_UI = "'Hanken Grotesk', sans-serif";
const FONT_SERIF = "'Newsreader', serif";

/* Shared style tokens ------------------------------------------------ */

const eyebrow: CSSProperties = {
  fontFamily: FONT_UI,
  fontSize: "13px",
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--accent)",
  marginBottom: "18px",
};

const regCard: CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--line)",
  borderRadius: "calc(var(--radius) + 2px)",
  padding: "26px",
};

const chip: CSSProperties = {
  fontSize: "15px",
  padding: "9px 18px",
  borderRadius: "999px",
  border: "1px solid var(--line)",
  background: "var(--surface)",
};

/* Content data ------------------------------------------------------- */

const REG_CARDS = [
  {
    title: "UK GDPR & Data Protection Act 2018",
    body: "Personal data you put into an AI tool is still personal data. The same obligations, and the ICO, still apply.",
  },
  {
    title: "The EU AI Act",
    body: "Now in force, with obligations phasing in through 2026. If you serve EU clients, it reaches you too.",
  },
  {
    title: "ICO guidance on AI",
    body: 'The regulator has published clear expectations for AI and data protection. "We didn\'t know" no longer holds up.',
  },
  {
    title: "Your sector's regulator",
    body: "Bodies like the FCA and SRA now expect you to show you manage AI and data risk, not just adopt the tools.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Find what's already happening",
    body: "We map where AI is already being used across your organisation and exactly what data it can see.",
    top: true,
    bottom: false,
  },
  {
    num: "02",
    title: "Put controls and policy around it",
    body: "Approved tools, access rules and clear policy that satisfy GDPR and your regulator without slowing people down.",
    top: true,
    bottom: false,
  },
  {
    num: "03",
    title: "Train your team to use it safely",
    body: "Built around how your organisation actually works and the data it handles, not a generic playbook.",
    top: true,
    bottom: true,
  },
  {
    num: "04",
    title: "Keep it auditable",
    body: "A clear record of what's allowed, what's in use and why. Ready for a client question, an audit or a regulator.",
    top: false,
    bottom: true,
  },
];

const SECTORS = ["Accountancy", "Legal", "Financial services", "Healthcare", "Property", "Professional services"];

// Paste your Google Form embed src here (Send → Embed → copy the src URL).
const GOOGLE_FORM_SRC = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true";

function App() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", fontFamily: FONT_SERIF, minHeight: "100vh" }}>
      {/* HEADER ------------------------------------------------------- */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "saturate(140%) blur(10px)",
          WebkitBackdropFilter: "saturate(140%) blur(10px)",
          background: "color-mix(in srgb, var(--bg) 82%, transparent)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <a href="#top" className="niyam-link" style={{ display: "flex", alignItems: "baseline", gap: "8px", fontFamily: FONT_UI }}>
            <span style={{ fontWeight: 700, fontSize: "21px", letterSpacing: "-0.01em" }}>Niyam</span>
            <span style={{ fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
              Consulting
            </span>
          </a>
          <nav className="niyam-navlinks" style={{ display: "flex", alignItems: "center", gap: "30px", fontFamily: FONT_UI, fontSize: "15px" }}>
            <a href="#problem" className="niyam-link">The problem</a>
            <a href="#work" className="niyam-link">What we do</a>
            <a href="#why" className="niyam-link">Why us</a>
            <a href="#start" className="niyam-link">How to start</a>
          </nav>
          <a
            href="#contact"
            className="niyam-cta niyam-link"
            style={{
              fontFamily: FONT_UI,
              fontSize: "14px",
              fontWeight: 600,
              background: "var(--accent)",
              color: "var(--accent-ink)",
              padding: "10px 18px",
              borderRadius: "var(--radius)",
              whiteSpace: "nowrap",
            }}
          >
            Book a call
          </a>
        </div>
      </header>

      {/* HERO --------------------------------------------------------- */}
      <section id="top" style={{ padding: "96px 32px 92px" }}>
        <div
          className="niyam-hero-grid"
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ ...eyebrow, marginBottom: "22px" }}>Governance-led AI adoption</div>
            <h1
              style={{
                fontFamily: FONT_UI,
                fontWeight: 700,
                fontSize: "clamp(40px, 5.6vw, 68px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                margin: "0 0 26px",
                maxWidth: "14ch",
              }}
            >
              Use AI without exposing your clients.
            </h1>
            <p style={{ fontSize: "21px", lineHeight: 1.55, color: "var(--muted)", maxWidth: "50ch", margin: "0 0 36px" }}>
              Most AI advice skips the part that actually carries the risk: the data. We don't. We help organisations get
              real value from AI while keeping client and company information governed, controlled, and compliant.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", fontFamily: FONT_UI }}>
              <a
                href="#contact"
                className="niyam-cta niyam-link"
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  background: "var(--accent)",
                  color: "var(--accent-ink)",
                  padding: "15px 26px",
                  borderRadius: "var(--radius)",
                }}
              >
                Book a free 30-minute call
              </a>
              <a
                href="#start"
                className="niyam-cta niyam-link"
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  background: "transparent",
                  color: "var(--ink)",
                  padding: "15px 26px",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--line)",
                }}
              >
                Ask about an in-house seminar
              </a>
            </div>
          </div>

          {/* "client file" visual card */}
          <div
            className="niyam-hero-card"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: "calc(var(--radius) + 6px)",
              padding: "26px",
              boxShadow: "0 24px 60px -32px rgba(40,30,20,0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "22px", fontFamily: FONT_UI }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "var(--accent)" }} />
              <span style={{ fontSize: "13px", color: "var(--muted)" }}>client-file.pdf</span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 600,
                }}
              >
                Contained
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ height: "11px", width: "88%", borderRadius: "6px", background: "var(--line)" }} />
              <div style={{ height: "11px", width: "70%", borderRadius: "6px", background: "var(--accent-soft)" }} />
              <div style={{ height: "11px", width: "94%", borderRadius: "6px", background: "var(--line)" }} />
              <div style={{ height: "11px", width: "60%", borderRadius: "6px", background: "var(--line)" }} />
              <div style={{ height: "11px", width: "78%", borderRadius: "6px", background: "var(--accent-soft)" }} />
            </div>
            <div
              style={{
                marginTop: "24px",
                paddingTop: "20px",
                borderTop: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontFamily: FONT_UI,
              }}
            >
              <span
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "9px",
                  background: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "none",
                  position: "relative",
                }}
              >
                <span style={{ display: "block", width: "13px", height: "10px", borderRadius: "3px", background: "var(--accent-ink)" }} />
                <span
                  style={{
                    position: "absolute",
                    width: "8px",
                    height: "8px",
                    border: "2px solid var(--accent-ink)",
                    borderBottom: "none",
                    borderRadius: "5px 5px 0 0",
                    marginTop: "-9px",
                  }}
                />
              </span>
              <span style={{ fontSize: "14px", lineHeight: 1.35, color: "var(--ink)" }}>
                Stays in your control. Governed, logged, and compliant, not loose in a chatbot somewhere.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM -------------------------------------------------- */}
      <section id="problem" style={{ padding: "30px 32px 96px" }}>
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            borderTop: "1px solid var(--line)",
            paddingTop: "72px",
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: "56px",
          }}
          className="niyam-two"
        >
          <div>
            <div style={eyebrow}>The problem</div>
            <h2 style={{ ...h2Base, maxWidth: "14ch" }}>Your team is already using AI.</h2>
          </div>
          <div style={{ maxWidth: "58ch" }}>
            <p style={{ fontSize: "21px", lineHeight: 1.6, margin: "0 0 22px" }}>
              Maybe you signed off on it, maybe you didn't. Either way, someone in your office has pasted client details
              into a chatbot this month.
            </p>
            <p style={{ fontSize: "19px", lineHeight: 1.65, color: "var(--muted)", margin: "0 0 22px" }}>
              That's the tension. AI genuinely saves hours on drafting, summarising and the routine work. But every tool
              your staff reach for is another place regulated data can land, and most organisations have no record of
              where any of it has gone.
            </p>
            <p style={{ fontSize: "19px", lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>
              The usual "AI training" won't help here. It teaches people to write better prompts. It says nothing about
              the confidential, regulated information flowing underneath.
            </p>
          </div>
        </div>
      </section>

      {/* REGULATION --------------------------------------------------- */}
      <section id="rules" style={{ padding: "30px 32px 100px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", borderTop: "1px solid var(--line)", paddingTop: "72px" }}>
          <div style={eyebrow}>Regulation</div>
          <h2 style={{ ...h2Base, fontSize: "clamp(28px, 3.4vw, 42px)", margin: "0 0 16px", maxWidth: "20ch" }}>
            The rules are catching up faster than the tools.
          </h2>
          <p style={{ fontSize: "20px", lineHeight: 1.6, color: "var(--muted)", maxWidth: "58ch", margin: "0 0 48px" }}>
            AI doesn't get a pass on data protection. If anything, it raises the bar. Most of this is already sitting on
            your desk, whether anyone has read it or not.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "20px" }}>
            {REG_CARDS.map((c) => (
              <div key={c.title} style={regCard}>
                <div
                  style={{
                    fontFamily: FONT_UI,
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                    marginBottom: "10px",
                  }}
                >
                  {c.title}
                </div>
                <p style={{ fontSize: "16px", lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO --------------------------------------------------- */}
      <section
        id="work"
        style={{
          padding: "30px 32px 100px",
          background: "var(--surface)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto", paddingTop: "80px" }}>
          <div style={eyebrow}>What we actually do</div>
          <h2 style={{ ...h2Base, fontSize: "clamp(28px, 3.4vw, 42px)", margin: "0 0 16px", maxWidth: "20ch" }}>
            We lead with governance and risk, then the tools.
          </h2>
          <p style={{ fontSize: "20px", lineHeight: 1.6, color: "var(--muted)", maxWidth: "56ch", margin: "0 0 56px" }}>
            Before anyone gets excited about what AI can do, we map what it touches, what's regulated, and where the
            exposure sits.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {STEPS.map((s) => (
              <div
                key={s.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px 1fr",
                  gap: "28px",
                  padding: "30px 0",
                  borderTop: s.top ? "1px solid var(--line)" : "none",
                  borderBottom: s.bottom ? "1px solid var(--line)" : "none",
                  alignItems: "start",
                }}
              >
                <div style={{ fontFamily: FONT_UI, fontSize: "18px", fontWeight: 600, color: "var(--accent)", paddingTop: "4px" }}>
                  {s.num}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "32px", alignItems: "baseline" }}>
                  <h3 style={{ fontFamily: FONT_UI, fontWeight: 600, fontSize: "23px", letterSpacing: "-0.01em", margin: 0 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "18px", lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US ------------------------------------------------------- */}
      <section id="why" style={{ padding: "96px 32px" }}>
        <div
          className="niyam-two"
          style={{ maxWidth: "1140px", margin: "0 auto", display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "56px" }}
        >
          <div>
            <div style={eyebrow}>Why us</div>
            <h2 style={{ ...h2Base, maxWidth: "16ch" }}>Plenty of people will sell you AI consulting.</h2>
          </div>
          <div style={{ maxWidth: "58ch" }}>
            <p style={{ fontSize: "21px", lineHeight: 1.6, margin: "0 0 22px" }}>
              Most of them come from marketing or software. We come from data governance.
            </p>
            <p style={{ fontSize: "19px", lineHeight: 1.65, color: "var(--muted)", margin: "0 0 22px" }}>
              We've spent years in enterprise data governance, protecting sensitive information for organisations that
              can't afford to get it wrong. Master data, data quality, and the control frameworks large institutions use
              to keep regulated data locked down.
            </p>
            <p style={{ fontSize: "19px", lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>
              That's the discipline we bring to your business. So we're not just pointing at clever tools. We're making
              sure they're safe, compliant and defensible the moment they touch real client data.
            </p>
          </div>
        </div>
      </section>

      {/* HOW TO START ------------------------------------------------- */}
      <section
        id="start"
        style={{
          padding: "30px 32px 100px",
          background: "var(--surface)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto", paddingTop: "80px" }}>
          <div style={eyebrow}>How to start</div>
          <h2 style={{ ...h2Base, fontSize: "clamp(28px, 3.4vw, 42px)", margin: "0 0 56px", maxWidth: "18ch" }}>
            Two steps. No pressure between them.
          </h2>
          <div className="niyam-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            <div style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "calc(var(--radius) + 4px)", padding: "34px" }}>
              <div
                style={{
                  fontFamily: FONT_UI,
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "14px",
                }}
              >
                Step 01 · Free
              </div>
              <h3 style={{ ...stepCardH3 }}>A seminar at your office</h3>
              <p style={{ fontSize: "18px", lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>
                About 45 minutes. You complete a short survey first so we can tailor it to your organisation and the data
                you handle. No recycled slides, no filler.
              </p>
            </div>
            <div style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "calc(var(--radius) + 4px)", padding: "34px" }}>
              <div
                style={{
                  fontFamily: FONT_UI,
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "14px",
                }}
              >
                Step 02 · Paid
              </div>
              <h3 style={{ ...stepCardH3 }}>Risk &amp; Governance Review</h3>
              <p style={{ fontSize: "18px", lineHeight: 1.6, color: "var(--muted)", margin: 0 }}>
                A structured review of where you're exposed, where AI can safely add value, and a prioritised plan to
                adopt it in line with GDPR and your regulator.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR ---------------------------------------------- */}
      <section style={{ padding: "96px 32px" }}>
        <div style={{ maxWidth: "1140px", margin: "0 auto", textAlign: "center" }}>
          <div style={eyebrow}>Who this is for</div>
          <h2
            style={{
              fontFamily: FONT_UI,
              fontWeight: 600,
              fontSize: "clamp(26px, 3.2vw, 38px)",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              margin: "0 auto 14px",
              maxWidth: "24ch",
            }}
          >
            Built for any business that handles sensitive data.
          </h2>
          <p style={{ fontSize: "20px", lineHeight: 1.6, color: "var(--muted)", maxWidth: "50ch", margin: "0 auto 36px" }}>
            Wherever client records, financial details or personal data are part of the day-to-day, and a regulator is
            paying attention, the same governance gap shows up.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", fontFamily: FONT_UI }}>
            {SECTORS.map((s) => (
              <span key={s} style={chip}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / CLOSING -------------------------------------------- */}
      <section id="contact" style={{ padding: "30px 32px 110px" }}>
        <div
          className="niyam-two"
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            borderTop: "1px solid var(--line)",
            paddingTop: "80px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: FONT_UI,
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 52px)",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                margin: "0 0 22px",
                maxWidth: "14ch",
              }}
            >
              Want AI in your business without the risk?
            </h2>
            <p style={{ fontSize: "21px", lineHeight: 1.55, color: "var(--muted)", maxWidth: "42ch", margin: 0 }}>
              Start with a quick call. Thirty minutes, no pitch. We'll work out where you stand and whether a seminar or
              a Risk &amp; Governance Review is the right next step.
            </p>
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: "calc(var(--radius) + 6px)",
              overflow: "hidden",
              boxShadow: "0 24px 60px -34px rgba(40,30,20,0.35)",
            }}
          >
            <iframe
              src={GOOGLE_FORM_SRC}
              title="Contact form"
              width="100%"
              height="680"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              style={{ display: "block", border: "none" }}
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>

      {/* FOOTER ------------------------------------------------------- */}
      <footer style={{ borderTop: "1px solid var(--line)", padding: "32px" }}>
        <div
          style={{
            maxWidth: "1140px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            fontFamily: FONT_UI,
            fontSize: "14px",
            color: "var(--muted)",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontWeight: 700, fontSize: "17px", color: "var(--ink)" }}>Niyam</span>
            <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}>Consulting</span>
          </div>
          <span>AI adoption, governed properly. © 2026 Niyam Consulting.</span>
        </div>
      </footer>
    </div>
  );
}

/* Heading style shared across most section H2s. */
const h2Base: CSSProperties = {
  fontFamily: FONT_UI,
  fontWeight: 600,
  fontSize: "clamp(28px, 3.4vw, 40px)",
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
  margin: 0,
};

const stepCardH3: CSSProperties = {
  fontFamily: FONT_UI,
  fontWeight: 600,
  fontSize: "25px",
  letterSpacing: "-0.01em",
  margin: "0 0 14px",
};

export default App;
