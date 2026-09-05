import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer, Navigation } from "./Sections";
import WeddingFlightMap from "./WeddingFlightMap";

gsap.registerPlugin(ScrollTrigger);

interface Swatch {
  name: string;
  hex: string;
  hsl: string;
}

const swatches: Swatch[] = [
  { name: "Deep Teal", hex: "#1D3D3A", hsl: "172°, 35%, 18%" },
  { name: "Ice Blue", hex: "#A8C6D6", hsl: "201°, 40%, 75%" },
  { name: "Soft Sky", hex: "#E8F1F5", hsl: "198°, 36%, 94%" },
  { name: "Champagne", hex: "#E6DAC8", hsl: "37°, 37%, 85%" },
  { name: "Silver Pearl", hex: "#C5CBD3", hsl: "216°, 14%, 80%" },
];

const rsvpPipelineSnippet = `// Formspree + Passcode Gated RSVP Pipeline
export async function submitRSVP(payload: RSVPPayload, passcode: string) {
  if (passcode.trim().toUpperCase() !== EVENT_PASSCODE) {
    throw new Error("Invalid access passcode. Please check your invitation.");
  }

  const response = await fetch("https://formspree.io/f/xgeggpln", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      guestName: payload.name,
      attendance: payload.attending ? "Attending" : "Declined",
      dietary: payload.dietary || "None",
      message: payload.message || "",
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit RSVP. Please try again.");
  }

  return response.json();
}`;

export default function CCWeddingCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"video" | "mobile" | "desktop">("video");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "CC Wedding — Lescy G. Caadlawon";
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Header Entrance
      gsap.from(".clean-header__meta-row", {
        opacity: 0,
        y: -12,
        duration: 0.6,
        ease: "power3.out",
      });
      gsap.from(".clean-header__title", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        delay: 0.08,
        ease: "power3.out",
      });
      gsap.from(".clean-header__subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.16,
        ease: "power3.out",
      });
      gsap.from(".clean-meta-strip", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.24,
        ease: "power3.out",
      });

      // Media Frame Reveal
      gsap.from(".clean-media-frame", {
        opacity: 0,
        y: 36,
        duration: 0.85,
        delay: 0.35,
        ease: "power3.out",
      });

      // Stats Stagger
      gsap.from(".clean-stat", {
        scrollTrigger: {
          trigger: ".clean-stats-grid",
          start: "top 85%",
        },
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      });

      // Sections Reveal
      gsap.utils.toArray<HTMLElement>(".clean-section").forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
          },
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Footer Navigation
      gsap.from(".clean-footer-nav", {
        scrollTrigger: {
          trigger: ".clean-footer-nav",
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(rsvpPipelineSnippet);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <>
      <Navigation />
      <main ref={pageRef} className="clean-case-study shell" id="main-content">
        
        {/* Top Header */}
        <header className="clean-header">
          <div className="clean-header__meta-row">
            <a href="/#work" className="clean-back-link">
              ← Latest Work
            </a>
            <span className="clean-header__tag">Charlon & Chilzia · 2025—2026</span>
          </div>

          <h1 className="clean-header__title">
            CC Wedding Digital Platform
          </h1>
          <p className="clean-header__subtitle">
            Interactive digital wedding invitation and RSVP platform with client-side 60 FPS chroma-key canvas rendering.
          </p>

          <div className="clean-meta-strip">
            <div>
              <span className="clean-meta-label">Role</span>
              <strong className="clean-meta-value">Lead Frontend Engineer & UI/UX Designer</strong>
            </div>
            <div>
              <span className="clean-meta-label">Stack</span>
              <strong className="clean-meta-value">React 18 · TypeScript · Vite · Canvas API · Tailwind CSS · Formspree</strong>
            </div>
            <div>
              <span className="clean-meta-label">Live</span>
              <a
                href="https://www.ccwedding.page/"
                target="_blank"
                rel="noreferrer"
                className="clean-live-link"
              >
                ccwedding.page ↗
              </a>
            </div>
          </div>
        </header>

        {/* Media Frame */}
        <section className="clean-media-frame">
          <div className="clean-media-tabs">
            <button
              type="button"
              className={`clean-media-tab${activeTab === "video" ? " is-active" : ""}`}
              onClick={() => setActiveTab("video")}
            >
              Video Walkthrough
            </button>
            <button
              type="button"
              className={`clean-media-tab${activeTab === "mobile" ? " is-active" : ""}`}
              onClick={() => setActiveTab("mobile")}
            >
              Mobile View
            </button>
            <button
              type="button"
              className={`clean-media-tab${activeTab === "desktop" ? " is-active" : ""}`}
              onClick={() => setActiveTab("desktop")}
            >
              Desktop View
            </button>
          </div>

          <div className="clean-media-stage">
            {activeTab === "video" && (
              <video
                src="/ccwedding.mp4"
                poster="/cc-wedding-mockup.jpg"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="clean-media-element"
              />
            )}
            {activeTab === "mobile" && (
              <img
                src="/cc-wedding-mobile.jpg"
                alt="CC Wedding Mobile Experience"
                className="clean-media-element"
              />
            )}
            {activeTab === "desktop" && (
              <img
                src="/cc-wedding-mockup.jpg"
                alt="CC Wedding Desktop Mockup"
                className="clean-media-element"
              />
            )}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="clean-stats-grid">
          <div className="clean-stat">
            <span className="clean-stat__num">94%</span>
            <span className="clean-stat__label">RSVP Completion</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">&lt; 2m</span>
            <span className="clean-stat__label">Response Time</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">60 FPS</span>
            <span className="clean-stat__label">Canvas Rendering</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">99/100</span>
            <span className="clean-stat__label">Mobile Lighthouse</span>
          </div>
        </section>

        {/* Global Guest Flight Arc Network */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Global Guest Odyssey & Flight Network</h2>
            <p className="clean-section__subtitle">
              Interactive travel network mapping international and local guests traveling from Tokyo, San Francisco, London, Sydney, Manila, and provincial regions to the destination celebration.
            </p>
          </div>

          <WeddingFlightMap />
        </section>

        {/* Design System Swatches */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Attire Palette & Swatches</h2>
          </div>

          <div className="clean-swatches-grid">
            {swatches.map((swatch) => (
              <button
                type="button"
                key={swatch.hex}
                className="clean-swatch-card"
                onClick={() => copyHex(swatch.hex)}
                title="Click to copy Hex"
              >
                <span
                  className="clean-swatch-chip"
                  style={{ backgroundColor: swatch.hex }}
                />
                <div className="clean-swatch-info">
                  <strong>{swatch.name}</strong>
                  <code>{swatch.hex}</code>
                </div>
              </button>
            ))}
          </div>
          {copiedHex && (
            <p className="clean-copy-notice">Copied {copiedHex}</p>
          )}
        </section>

        {/* Code Section */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Passcode & RSVP Submission Pipeline</h2>
          </div>

          <div className="clean-code-box">
            <div className="clean-code-box__header">
              <span>RSVPHandler.ts</span>
              <button type="button" onClick={copyCode} className="clean-copy-btn">
                {codeCopied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="clean-code-box__pre">
              <code>{rsvpPipelineSnippet}</code>
            </pre>
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className="clean-footer-nav">
          <a href="/#work" className="editorial-btn editorial-btn--ghost">
            <span>← Latest Work</span>
          </a>
          <a href="/works/lgu-water" className="editorial-btn editorial-btn--primary">
            <span>Next: LGU Water District →</span>
          </a>
        </footer>

      </main>
      <Footer />
    </>
  );
}
