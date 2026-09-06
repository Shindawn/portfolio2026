import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer, Navigation } from "./Sections";

gsap.registerPlugin(ScrollTrigger);

interface ColorSwatch {
  name: string;
  hex: string;
  tone: string;
  role: string;
}

const colorPalette: ColorSwatch[] = [
  { name: "Deep Teal", hex: "#1D3D3A", tone: "Rich Forest Accent", role: "Primary Identity & Monogram" },
  { name: "Ice Blue", hex: "#A8C6D6", tone: "Glacial Morning Hue", role: "Secondary Accents & Atmospheric Sheen" },
  { name: "Soft Sky", hex: "#E8F1F5", tone: "Air & Luminosity", role: "Background Layers & Paper Wash" },
  { name: "Champagne", hex: "#E6DAC8", tone: "Warm Celebratory Veil", role: "Stationery Borders & Wax Seals" },
  { name: "Silver Pearl", hex: "#C5CBD3", tone: "Polished Mineral Sheen", role: "Subtle Separators & Micro Details" },
];

export default function CCWeddingCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "A Digital Invitation Made Personal — CC Wedding";
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Cinematic Hero Entrance
      gsap.from(".w-hero__kicker", {
        opacity: 0,
        y: -16,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".w-hero__title", {
        opacity: 0,
        y: 32,
        duration: 1.1,
        delay: 0.1,
        ease: "power3.out",
      });
      gsap.from(".w-hero__subtitle", {
        opacity: 0,
        y: 24,
        duration: 1.0,
        delay: 0.25,
        ease: "power3.out",
      });
      gsap.from(".w-hero__meta", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 0.4,
        ease: "power3.out",
      });

      // Editorial Sections Stagger
      gsap.utils.toArray<HTMLElement>(".w-animate-section").forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: {
            trigger: sec,
            start: "top 82%",
          },
          opacity: 0,
          y: 40,
          duration: 1.0,
          ease: "power3.out",
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main ref={pageRef} className="wedding-editorial" id="main-content">
        
        {/* =========================================================================
            OPENING — CINEMATIC HERO
           ========================================================================= */}
        <section className="w-hero">
          <div className="w-hero__container">
            <span className="w-hero__kicker">Charlon & Chilzia · Destination Celebration</span>
            
            <h1 className="w-hero__title">
              A Digital Invitation <em>Made Personal</em>
            </h1>

            <p className="w-hero__subtitle">
              Designing a wedding website that brings the couple’s story, celebration details, and RSVP experience together in one thoughtful digital space.
            </p>

            <div className="w-hero__meta">
              <span className="w-hero__meta-item">
                <span className="w-hero__meta-dot" /> Private Client
              </span>
              <span className="w-hero__meta-item">
                <span className="w-hero__meta-dot" /> UI/UX Design + Frontend Development
              </span>
              <span className="w-hero__meta-item">
                <span className="w-hero__meta-dot" /> Responsive Web Experience
              </span>
            </div>

            <div className="w-hero__scroll-hint">
              <span>Scroll to explore the story</span>
              <div className="w-hero__scroll-line" />
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02 — THE STORY
           ========================================================================= */}
        <section className="w-section w-animate-section">
          <div className="w-container">
            <div className="w-story-grid">
              <div>
                <div className="w-story-num">01</div>
                <span className="w-label">THE STORY</span>
                <h2 className="w-heading-serif">
                  More than an <em>invitation.</em>
                </h2>
                <div className="w-body-editorial">
                  <p style={{ marginBottom: "1.5rem" }}>
                    The goal was to create a personalized wedding website that could serve as both a digital invitation and a central place for guests to find everything they needed before the celebration.
                  </p>
                  <p>
                    The experience needed to communicate the couple’s personality while keeping practical information easy to find.
                  </p>
                </div>
              </div>

              <div className="w-story-frame">
                <img
                  src="/cc-wedding-mockup.jpg"
                  alt="Charlon & Chilzia Wedding Digital Platform overview"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03 — FROM WEDDING THEME TO DIGITAL EXPERIENCE
           ========================================================================= */}
        <section className="w-section w-animate-section">
          <div className="w-container">
            <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 3rem" }}>
              <span className="w-label">CREATIVE DIRECTION</span>
              <h2 className="w-heading-serif">
                From Wedding Theme to <em>Digital Experience</em>
              </h2>
              <p className="w-body-editorial">
                Translating physical stationery textures, coastal evening tones, and personal typography into a cohesive digital atmosphere.
              </p>
            </div>

            {/* Organic Moodboard Collage */}
            <div className="w-moodboard-collage">
              
              {/* Color Swatches */}
              <div className="w-mood-swatches">
                <span className="w-label">CURATED ATTIRE PALETTE</span>
                <div className="w-swatch-list">
                  {colorPalette.map((swatch) => (
                    <div key={swatch.hex} className="w-swatch-item">
                      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        <span
                          className="w-swatch-color-pill"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <div>
                          <strong style={{ fontSize: "0.92rem", display: "block", color: "var(--w-text)" }}>{swatch.name}</strong>
                          <span style={{ fontSize: "0.78rem", color: "var(--w-text-muted)" }}>{swatch.tone}</span>
                        </div>
                      </div>
                      <code style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "var(--w-gold)", fontWeight: 700 }}>
                        {swatch.hex}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Large Scale Typography Card */}
              <div className="w-mood-type-card">
                <span className="w-label">TYPOGRAPHY SAMPLES</span>
                <div style={{ marginTop: "1rem" }}>
                  <div style={{ fontFamily: "var(--w-font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.2rem)", fontStyle: "italic", lineHeight: 1.05, color: "var(--w-text)", marginBottom: "1rem" }}>
                    Charlon & Chilzia
                  </div>
                  <div style={{ fontFamily: "var(--w-font-sans)", fontSize: "0.86rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--w-gold)", marginBottom: "1.75rem" }}>
                    Together with their families · Save the Date
                  </div>
                  <div style={{ fontFamily: "var(--w-font-serif)", fontSize: "1.4rem", color: "var(--w-text-muted)", fontStyle: "italic" }}>
                    “Two lives, one shared horizon across the Pacific.”
                  </div>
                </div>

                <div style={{ marginTop: "2.5rem", borderTop: "1px solid var(--w-border)", paddingTop: "1.5rem" }}>
                  <span className="w-label">VISUAL DIRECTION</span>
                  <div className="w-direction-tags">
                    <span className="w-direction-tag">Elegant</span>
                    <span className="w-direction-tag">Romantic</span>
                    <span className="w-direction-tag">Personal</span>
                    <span className="w-direction-tag">Modern</span>
                    <span className="w-direction-tag">Soft</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04 — DESIGNING THE FIRST IMPRESSION
           ========================================================================= */}
        <section className="w-section w-animate-section">
          <div className="w-container--wide">
            <div style={{ maxWidth: "800px", margin: "0 auto 3.5rem", textAlign: "center" }}>
              <span className="w-label">IMMEDIACY & EMOTION</span>
              <h2 className="w-heading-serif">
                Designing the <em>First Impression</em>
              </h2>
              <p className="w-body-editorial">
                The opening section needed to immediately communicate the couple, date, and celebration while keeping the primary RSVP action visible without disrupting the emotional tone of the page.
              </p>
            </div>

            {/* Massive Hero Screenshot */}
            <div className="w-hero-showcase">
              <div className="w-showcase-screen">
                <video
                  src="/ccwedding.mp4"
                  poster="/cc-wedding-mockup.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>

              {/* Callout Pins */}
              <div className="w-callout-pins">
                <div className="w-callout-pin">
                  <span className="w-callout-pin__tag">01 · Wedding Date</span>
                  <span className="w-callout-pin__desc">Prominently anchored above the fold with subtle calendar integration.</span>
                </div>
                <div className="w-callout-pin">
                  <span className="w-callout-pin__tag">02 · Couple Names</span>
                  <span className="w-callout-pin__desc">Handcrafted editorial serif heading communicating romantic elegance.</span>
                </div>
                <div className="w-callout-pin">
                  <span className="w-callout-pin__tag">03 · Primary RSVP Action</span>
                  <span className="w-callout-pin__desc">Unobtrusive sticky CTA allowing guests to respond at any point in their read.</span>
                </div>
                <div className="w-callout-pin">
                  <span className="w-callout-pin__tag">04 · Visual Hierarchy</span>
                  <span className="w-callout-pin__desc">Breathing whitespace guiding attention gently from emotion to logistics.</span>
                </div>
                <div className="w-callout-pin">
                  <span className="w-callout-pin__tag">05 · Wedding Identity</span>
                  <span className="w-callout-pin__desc">Custom monogram seal bridging digital interactions with physical keepsakes.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05 — THE WEBSITE AS A STORY
           ========================================================================= */}
        <section className="w-section w-animate-section">
          <div className="w-container">
            <div style={{ maxWidth: "780px", marginBottom: "3rem" }}>
              <span className="w-label">NARRATIVE ARCHITECTURE</span>
              <h2 className="w-heading-serif">
                The Website as a <em>Story</em>
              </h2>
              <p className="w-body-editorial">
                Rather than treating the website like a fragmented utility, information unfolds as one continuous, harmonious scroll.
              </p>
            </div>

            <div className="w-story-scroll">
              
              {/* Sticky Timeline / Chapter Index */}
              <div className="w-story-timeline-nav">
                <div className="w-timeline-node">
                  <span className="w-timeline-node__num">I</span>
                  <span>Welcome & Monogram</span>
                </div>
                <div className="w-timeline-node">
                  <span className="w-timeline-node__num">II</span>
                  <span>Our Story & Odyssey</span>
                </div>
                <div className="w-timeline-node">
                  <span className="w-timeline-node__num">III</span>
                  <span>Wedding Details & Date</span>
                </div>
                <div className="w-timeline-node">
                  <span className="w-timeline-node__num">IV</span>
                  <span>Day-of Schedule</span>
                </div>
                <div className="w-timeline-node">
                  <span className="w-timeline-node__num">V</span>
                  <span>Attire & Dress Code</span>
                </div>
                <div className="w-timeline-node">
                  <span className="w-timeline-node__num">VI</span>
                  <span>Venue & Flight Guides</span>
                </div>
                <div className="w-timeline-node">
                  <span className="w-timeline-node__num">VII</span>
                  <span>Interactive RSVP Gate</span>
                </div>
                <div className="w-timeline-node">
                  <span className="w-timeline-node__num">VIII</span>
                  <span>Travel FAQs</span>
                </div>
                <div className="w-timeline-node">
                  <span className="w-timeline-node__num">IX</span>
                  <span>Confirmation & Love Notes</span>
                </div>
              </div>

              {/* Continuous Visual Scroll Feed */}
              <div className="w-story-feed">
                <div className="w-feed-card">
                  <span className="w-label">CHAPTER 01 · WELCOME & OUR STORY</span>
                  <div style={{ fontFamily: "var(--w-font-serif)", fontSize: "1.8rem", color: "var(--ink)" }}>
                    Setting the emotional tone through memory & anticipation
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: "0.98rem" }}>
                    The journey opens with high-resolution memories from Tokyo and San Francisco, bridging the couple's international background with the upcoming celebration in the Philippines.
                  </p>
                </div>

                <div className="w-feed-card">
                  <span className="w-label">CHAPTER 02 · CELEBRATION DETAILS & ATTIRE</span>
                  <div style={{ fontFamily: "var(--w-font-serif)", fontSize: "1.8rem", color: "var(--ink)" }}>
                    Eliminating guest uncertainty before packing begins
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: "0.98rem" }}>
                    From formal evening wear color swatches to venue climate suggestions, every detail was carefully paced to ensure family members and distant travelers felt prepared.
                  </p>
                </div>

                <div className="w-feed-card">
                  <span className="w-label">CHAPTER 03 · VENUE, TRAVEL & FAQS</span>
                  <div style={{ fontFamily: "var(--w-font-serif)", fontSize: "1.8rem", color: "var(--ink)" }}>
                    Clear logistics without clinical complexity
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: "0.98rem" }}>
                    Integrated flight map routes, airport recommendations, and accordion-style FAQs minimized direct inquiries to the couple during busy wedding preparation weeks.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 06 — THE GUEST JOURNEY
           ========================================================================= */}
        <section className="w-section w-animate-section" style={{ background: "var(--w-champagne)" }}>
          <div className="w-container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <span className="w-label">GUEST EXPERIENCE FLOW</span>
              <h2 className="w-heading-serif">
                A Seamless <em>Guest Journey</em>
              </h2>
            </div>

            {/* Sentence-Like Progression */}
            <div className="w-journey-sentence">
              <span className="w-journey-step">Receive invitation</span>
              <span className="w-journey-arrow">→</span>
              <span className="w-journey-step">Explore the celebration</span>
              <span className="w-journey-arrow">→</span>
              <span className="w-journey-step">Check wedding details</span>
              <span className="w-journey-arrow">→</span>
              <span className="w-journey-step">Confirm attendance</span>
              <span className="w-journey-arrow">→</span>
              <span className="w-journey-step">Receive RSVP confirmation</span>
            </div>

            <div style={{ maxWidth: "720px", margin: "2rem auto 0", textAlign: "center" }}>
              <p className="w-body-editorial">
                Most guests would interact with the invitation from their phones, so the experience was designed to make essential information easy to find without requiring guests to search through long pages.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 07 — THE RSVP EXPERIENCE
           ========================================================================= */}
        <section className="w-section w-animate-section">
          <div className="w-container">
            <div style={{ maxWidth: "820px", margin: "0 auto 3rem", textAlign: "center" }}>
              <span className="w-label">CORE INTERACTION</span>
              <h2 className="w-heading-serif">
                The RSVP <em>Experience</em>
              </h2>
              <p className="w-body-editorial">
                Paced with grace, personal validation, and instantaneous confirmation feedback.
              </p>
            </div>

            {/* 6 Steps arranged in an editorial stage */}
            <div className="w-rsvp-diagonal-stage">
              <div className="w-rsvp-step-card">
                <div>
                  <div className="w-rsvp-step-card__num">01</div>
                  <h3 style={{ fontFamily: "var(--w-font-serif)", fontSize: "1.4rem", margin: "0.75rem 0 0.5rem" }}>
                    Guest Identification
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                    Passcode-gated invitation access ensuring personalized responses.
                  </p>
                </div>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--w-gold)", fontWeight: 700 }}>
                  Short Form Sections
                </span>
              </div>

              <div className="w-rsvp-step-card">
                <div>
                  <div className="w-rsvp-step-card__num">02</div>
                  <h3 style={{ fontFamily: "var(--w-font-serif)", fontSize: "1.4rem", margin: "0.75rem 0 0.5rem" }}>
                    Attendance Response
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                    1-tap joyful acceptance or warm decline with immediate feedback.
                  </p>
                </div>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--w-gold)", fontWeight: 700 }}>
                  Clear Required Fields
                </span>
              </div>

              <div className="w-rsvp-step-card">
                <div>
                  <div className="w-rsvp-step-card__num">03</div>
                  <h3 style={{ fontFamily: "var(--w-font-serif)", fontSize: "1.4rem", margin: "0.75rem 0 0.5rem" }}>
                    Guest Details
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                    Dietary requirements, companion names, and origin travel points.
                  </p>
                </div>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--w-gold)", fontWeight: 700 }}>
                  Large Mobile Inputs
                </span>
              </div>

              <div className="w-rsvp-step-card">
                <div>
                  <div className="w-rsvp-step-card__num">04</div>
                  <h3 style={{ fontFamily: "var(--w-font-serif)", fontSize: "1.4rem", margin: "0.75rem 0 0.5rem" }}>
                    Additional Info
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                    Personal wishes and song requests for the reception dance floor.
                  </p>
                </div>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--w-gold)", fontWeight: 700 }}>
                  Visible Progress
                </span>
              </div>

              <div className="w-rsvp-step-card">
                <div>
                  <div className="w-rsvp-step-card__num">05</div>
                  <h3 style={{ fontFamily: "var(--w-font-serif)", fontSize: "1.4rem", margin: "0.75rem 0 0.5rem" }}>
                    Review
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                    Clean summary card for guests to confirm before final transmission.
                  </p>
                </div>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--w-gold)", fontWeight: 700 }}>
                  Reduced Cognitive Load
                </span>
              </div>

              <div className="w-rsvp-step-card">
                <div>
                  <div className="w-rsvp-step-card__num">06</div>
                  <h3 style={{ fontFamily: "var(--w-font-serif)", fontSize: "1.4rem", margin: "0.75rem 0 0.5rem" }}>
                    Confirmation
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                    Celebratory animated feedback with calendar download integration.
                  </p>
                </div>
                <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--w-gold)", fontWeight: 700 }}>
                  Simple Confirmation
                </span>
              </div>
            </div>

            {/* Design Statement Quote */}
            <div className="w-rsvp-quote-banner">
              <blockquote className="w-rsvp-quote">
                “The RSVP should feel like part of the invitation—not like filling out an administrative form.”
              </blockquote>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 08 — MOBILE FIRST
           ========================================================================= */}
        <section className="w-section w-animate-section">
          <div className="w-container--wide">
            <div style={{ maxWidth: "800px", margin: "0 auto 3rem", textAlign: "center" }}>
              <span className="w-label">RESPONSIVE CRAFT</span>
              <h2 className="w-heading-serif">
                Mobile First by <em>Design</em>
              </h2>
              <p className="w-body-editorial">
                Because wedding invitations are often shared through messaging apps and social media, mobile usability was treated as a primary design requirement rather than an afterthought.
              </p>
            </div>

            {/* Staggered Phone Showcases */}
            <div className="w-mobile-stagger-grid">
              <div className="w-mobile-mock-card w-mobile-mock-card--offset-1">
                <img src="/cc-wedding-mobile.jpg" alt="CC Wedding Mobile Cover View" />
                <div style={{ padding: "1.25rem", textAlign: "center", background: "var(--w-surface-card)" }}>
                  <strong style={{ fontSize: "0.9rem", color: "var(--w-text)" }}>Home & Welcome</strong>
                </div>
              </div>

              <div className="w-mobile-mock-card w-mobile-mock-card--offset-2">
                <img src="/cc-wedding-mobile.jpg" alt="CC Wedding Mobile Schedule View" />
                <div style={{ padding: "1.25rem", textAlign: "center", background: "var(--w-surface-card)" }}>
                  <strong style={{ fontSize: "0.9rem", color: "var(--w-text)" }}>Wedding Details</strong>
                </div>
              </div>

              <div className="w-mobile-mock-card w-mobile-mock-card--offset-3">
                <img src="/cc-wedding-mobile.jpg" alt="CC Wedding Mobile Schedule View" />
                <div style={{ padding: "1.25rem", textAlign: "center", background: "var(--w-surface-card)" }}>
                  <strong style={{ fontSize: "0.9rem", color: "var(--w-text)" }}>Schedule & Timeline</strong>
                </div>
              </div>

              <div className="w-mobile-mock-card w-mobile-mock-card--offset-4">
                <img src="/cc-wedding-mobile.jpg" alt="CC Wedding Mobile RSVP View" />
                <div style={{ padding: "1.25rem", textAlign: "center", background: "var(--w-surface-card)" }}>
                  <strong style={{ fontSize: "0.9rem", color: "var(--w-text)" }}>Instant RSVP</strong>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", marginTop: "2rem", color: "var(--w-text-muted)", fontSize: "0.92rem" }}>
              <span>• Readable typography</span>
              <span>• Large tap areas</span>
              <span>• Clear navigation</span>
              <span>• Quick RSVP access</span>
              <span>• Responsive imagery</span>
              <span>• Minimal clutter</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 09 — SMALL DETAILS, BIG DIFFERENCE
           ========================================================================= */}
        <section className="w-section w-animate-section">
          <div className="w-container">
            <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 3rem" }}>
              <span className="w-label">MICRO-CRAFT</span>
              <h2 className="w-heading-serif">
                Details that shape the <em>experience</em>
              </h2>
            </div>

            <div className="w-details-masonry">
              <div className="w-detail-chip">
                <span className="w-label">INTERACTION</span>
                <div className="w-detail-chip__title">Chroma-Key Hover State</div>
                <p style={{ fontSize: "0.88rem", color: "var(--w-text-muted)" }}>
                  Delicate video background isolation responding organically to mouse movement.
                </p>
              </div>

              <div className="w-detail-chip">
                <span className="w-label">AFFORDANCE</span>
                <div className="w-detail-chip__title">Gold Foil RSVP Button</div>
                <p style={{ fontSize: "0.88rem", color: "var(--w-text-muted)" }}>
                  Tactile pill buttons with ambient glow imitating physical letterpress stamping.
                </p>
              </div>

              <div className="w-detail-chip">
                <span className="w-label">TEXTURE</span>
                <div className="w-detail-chip__title">Decorative Botanical Dividers</div>
                <p style={{ fontSize: "0.88rem", color: "var(--w-text-muted)" }}>
                  Custom line flourishes that visually bridge separate event chapters.
                </p>
              </div>

              <div className="w-detail-chip">
                <span className="w-label">LOGISTICS</span>
                <div className="w-detail-chip__title">Venue & Wayfinding Cards</div>
                <p style={{ fontSize: "0.88rem", color: "var(--w-text-muted)" }}>
                  1-tap Google Maps integration and localized transport tips for out-of-town guests.
                </p>
              </div>

              <div className="w-detail-chip">
                <span className="w-label">TYPOGRAPHY</span>
                <div className="w-detail-chip__title">Date & Countdown Treatment</div>
                <p style={{ fontSize: "0.88rem", color: "var(--w-text-muted)" }}>
                  Elegant numerals reflecting the passage of days leading to the celebration.
                </p>
              </div>

              <div className="w-detail-chip">
                <span className="w-label">FEEDBACK</span>
                <div className="w-detail-chip__title">Personalized Confirmation</div>
                <p style={{ fontSize: "0.88rem", color: "var(--w-text-muted)" }}>
                  Dynamic congratulatory receipt generated with guest names and custom details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10 — DESIGNING FOR DIFFERENT GUESTS
           ========================================================================= */}
        <section className="w-section w-animate-section" style={{ background: "var(--w-champagne)" }}>
          <div className="w-container">
            <div style={{ maxWidth: "800px", marginBottom: "3.5rem" }}>
              <span className="w-label">INCLUSIVE EMPATHY</span>
              <h2 className="w-heading-serif">
                Designing for <em>Different Guests</em>
              </h2>
              <p className="w-body-editorial">
                Ensuring clarity across generations, technical confidence levels, and devices.
              </p>
            </div>

            <div className="w-guest-columns">
              <div className="w-guest-col">
                <h3>Family Members</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--w-text-muted)", lineHeight: 1.7 }}>
                  Needed straightforward access to venue details, schedules, and important reminders without navigational friction.
                </p>
              </div>

              <div className="w-guest-col">
                <h3>Friends & Peers</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--w-text-muted)", lineHeight: 1.7 }}>
                  Needed a convenient way to review event information on the go, check attire palettes, and RSVP quickly from group chats.
                </p>
              </div>

              <div className="w-guest-col">
                <h3>Mobile Guests</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--w-text-muted)", lineHeight: 1.7 }}>
                  Needed the entire experience to work comfortably on smaller screens with generous tap targets and zero pinching.
                </p>
              </div>
            </div>

            <div style={{ marginTop: "3rem", padding: "1.25rem 1.75rem", borderRadius: "12px", border: "1px solid var(--w-border)", background: "var(--w-surface-card)", fontSize: "0.86rem", color: "var(--w-text-muted)" }}>
              ♿ <strong>Accessibility Note:</strong> High-contrast color ratios, readable minimum 16px body type, and screen-reader accessible form labels were maintained across all viewports.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11 — FINAL EXPERIENCE
           ========================================================================= */}
        <section className="w-section w-animate-section">
          <div className="w-container--wide">
            <div style={{ maxWidth: "800px", margin: "0 auto 3rem", textAlign: "center" }}>
              <span className="w-label">THE OUTCOME</span>
              <h2 className="w-heading-serif">
                The Final <em>Experience</em>
              </h2>
              <p className="w-body-editorial">
                The final experience brought the couple’s wedding identity and practical guest information into one cohesive digital invitation that could be accessed from any device.
              </p>
            </div>

            <div className="w-final-stage">
              <div className="w-final-desktop">
                <img
                  src="/cc-wedding-mockup.jpg"
                  alt="Final CC Wedding digital platform showcase"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CLOSING — REFLECTION
           ========================================================================= */}
        <section className="w-section">
          <div className="w-container--narrow">
            <div className="w-closing-wrap">
              <span className="w-label">DESIGN REFLECTION</span>
              
              <h2 className="w-heading-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
                Designing for an <em>emotional moment</em>
              </h2>

              <div className="w-body-editorial" style={{ textAlign: "center", margin: "2rem auto" }}>
                <p style={{ marginBottom: "1.5rem" }}>
                  This project gave me the opportunity to approach web design from a different perspective. The interface was not only meant to function well—it also needed to communicate personality, anticipation, and celebration.
                </p>
                <p>
                  It strengthened my ability to translate a client’s visual direction into a responsive digital experience while keeping usability at the center of the design.
                </p>
              </div>

              <div style={{ marginTop: "2rem" }}>
                <a
                  href="https://www.ccwedding.page/"
                  target="_blank"
                  rel="noreferrer"
                  className="editorial-btn editorial-btn--primary"
                  style={{ padding: "0.85rem 2rem", fontSize: "0.95rem" }}
                >
                  <span>Visit Live Experience · ccwedding.page ↗</span>
                </a>
              </div>
            </div>

            {/* Subtle Footer Navigation */}
            <footer className="w-footer-nav">
              <span style={{ fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--w-text-muted)" }}>
                Private Client Case Study · 2025—2026
              </span>
              <a href="/works/lgu-water" className="editorial-btn editorial-btn--ghost">
                <span>Next Project: LGU Water District →</span>
              </a>
            </footer>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
