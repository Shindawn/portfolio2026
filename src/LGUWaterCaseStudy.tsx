import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer, Navigation } from "./Sections";
import WaterGridSimulation from "./WaterGridSimulation";

gsap.registerPlugin(ScrollTrigger);

type AccountType = "residential" | "commercial";

interface AnomalyPreset {
  id: string;
  name: string;
  previousReading: number;
  currentReading: number;
  flagType: "normal" | "warning" | "danger";
  status: string;
}

const anomalyPresets: AnomalyPreset[] = [
  {
    id: "normal",
    name: "Normal (22 m³)",
    previousReading: 1240,
    currentReading: 1262,
    flagType: "normal",
    status: "PASS · QUEUED FOR BILLING",
  },
  {
    id: "spike",
    name: "Spike (+360%)",
    previousReading: 1400,
    currentReading: 1492,
    flagType: "warning",
    status: "FLAGGED · LEAK / AUDIT CHECK",
  },
  {
    id: "zero",
    name: "Zero Reading",
    previousReading: 890,
    currentReading: 890,
    flagType: "warning",
    status: "FLAGGED · STUCK DIAL CHECK",
  },
  {
    id: "negative",
    name: "Dial Rollback (-60 m³)",
    previousReading: 2150,
    currentReading: 2090,
    flagType: "danger",
    status: "BLOCKED · TAMPER ALERT",
  },
];

const architectureSnippet = `// Fixed-Point Decimal(14, 2) Volumetric Billing
export function computeWaterBill(volume: number, isCommercial: boolean, isOverdue: boolean) {
  const minCharge = isCommercial ? 280.00 : 150.00; // First 10 m³
  let remaining = Math.max(0, volume);
  let base = 0;

  if (remaining > 0) {
    base += minCharge;
    remaining = Math.max(0, remaining - 10);
  }
  if (remaining > 0) {
    const t2 = Math.min(remaining, 10);
    base += t2 * (isCommercial ? 32.00 : 18.50);
    remaining = Math.max(0, remaining - t2);
  }
  if (remaining > 0) {
    const t3 = Math.min(remaining, 10);
    base += t3 * (isCommercial ? 38.00 : 22.00);
    remaining = Math.max(0, remaining - t3);
  }
  if (remaining > 0) {
    base += remaining * (isCommercial ? 45.00 : 26.50);
  }

  const penalty = isOverdue ? base * 0.10 : 0;
  return { base, penalty, total: base + penalty };
}`;

export default function LGUWaterCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"video" | "mockup">("video");

  // Sandbox 1: Tariff Calculator
  const [volume, setVolume] = useState<number>(24);
  const [accountType, setAccountType] = useState<AccountType>("residential");
  const [isOverdue, setIsOverdue] = useState<boolean>(false);

  // Sandbox 2: Anomaly Tester
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyPreset>(anomalyPresets[0]);

  const billCalc = useMemo(() => {
    const isRes = accountType === "residential";
    const minCharge = isRes ? 150.0 : 280.0;
    let rem = Math.max(0, volume);
    let base = 0;

    let tier1Vol = 0;
    let tier2Vol = 0;
    let tier3Vol = 0;
    let tier4Vol = 0;

    if (rem > 0) {
      tier1Vol = Math.min(rem, 10);
      base += minCharge;
      rem = Math.max(0, rem - 10);
    }
    if (rem > 0) {
      tier2Vol = Math.min(rem, 10);
      base += tier2Vol * (isRes ? 18.5 : 32.0);
      rem = Math.max(0, rem - tier2Vol);
    }
    if (rem > 0) {
      tier3Vol = Math.min(rem, 10);
      base += tier3Vol * (isRes ? 22.0 : 38.0);
      rem = Math.max(0, rem - tier3Vol);
    }
    if (rem > 0) {
      tier4Vol = rem;
      base += tier4Vol * (isRes ? 26.5 : 45.0);
    }

    const penalty = isOverdue ? base * 0.1 : 0;
    const total = base + penalty;

    return {
      tier1Amount: tier1Vol > 0 ? minCharge : 0,
      tier2Amount: tier2Vol * (isRes ? 18.5 : 32.0),
      tier3Amount: tier3Vol * (isRes ? 22.0 : 38.0),
      tier4Amount: tier4Vol * (isRes ? 26.5 : 45.0),
      tier2Vol,
      tier3Vol,
      tier4Vol,
      penalty,
      total,
    };
  }, [volume, accountType, isOverdue]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "LGU Water District — Lescy G. Caadlawon";
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

      // Interactive Sections Reveal
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

  const copyCode = () => {
    navigator.clipboard.writeText(architectureSnippet);
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
            <span className="clean-header__tag">Municipality of Bagamanoc · 2024—Present</span>
          </div>

          <h1 className="clean-header__title">
            LGU Water District System
          </h1>
          <p className="clean-header__subtitle">
            Municipal utility billing platform with offline Android meter sync, tiered tariff calculation, and cashier audit reconciliation.
          </p>

          <div className="clean-meta-strip">
            <div>
              <span className="clean-meta-label">Role</span>
              <strong className="clean-meta-value">Lead Systems Architect & Developer</strong>
            </div>
            <div>
              <span className="clean-meta-label">Stack</span>
              <strong className="clean-meta-value">Next.js 16 · TypeScript · PostgreSQL · Prisma ORM · Android Sync</strong>
            </div>
            <div>
              <span className="clean-meta-label">Status</span>
              <strong className="clean-meta-value">Live Production</strong>
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
              className={`clean-media-tab${activeTab === "mockup" ? " is-active" : ""}`}
              onClick={() => setActiveTab("mockup")}
            >
              Admin Dashboard
            </button>
          </div>

          <div className="clean-media-stage">
            {activeTab === "video" ? (
              <video
                src="/lguwater.mp4"
                poster="/lgu-water-district-mockup.png"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="clean-media-element"
              />
            ) : (
              <img
                src="/lgu-water-district-mockup.png"
                alt="LGU Water District Admin Dashboard"
                className="clean-media-element"
              />
            )}
          </div>
        </section>

        {/* Key Numbers */}
        <section className="clean-stats-grid">
          <div className="clean-stat">
            <span className="clean-stat__num">&lt; 1s</span>
            <span className="clean-stat__label">Billing Run</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">100%</span>
            <span className="clean-stat__label">Arithmetic Precision</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">40+</span>
            <span className="clean-stat__label">Database Tables</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">Offline</span>
            <span className="clean-stat__label">Android Sync</span>
          </div>
        </section>

        {/* Live Municipal Grid Simulation */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Live Municipal Pipeline & Metered Neighborhood Simulation</h2>
            <p className="clean-section__subtitle">
              Interactive SCADA telemetry simulation showing water reservoir distribution, pipe junctions, live ticking house meter dials, and real-time burst/leak detection.
            </p>
          </div>

          <WaterGridSimulation />
        </section>

        {/* Interactive Tariff Calculator */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Stepped Tariff Calculator</h2>
          </div>

          <div className="clean-sandbox">
            <div className="clean-sandbox__left">
              <div className="clean-control">
                <div className="clean-control__label-row">
                  <span>Consumption Volume</span>
                  <strong>{volume} m³</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value, 10))}
                  className="clean-slider"
                />
              </div>

              <div className="clean-control-row">
                <div className="clean-btn-toggle">
                  <button
                    type="button"
                    className={`clean-toggle-btn${accountType === "residential" ? " is-active" : ""}`}
                    onClick={() => setAccountType("residential")}
                  >
                    Residential
                  </button>
                  <button
                    type="button"
                    className={`clean-toggle-btn${accountType === "commercial" ? " is-active" : ""}`}
                    onClick={() => setAccountType("commercial")}
                  >
                    Commercial
                  </button>
                </div>

                <label className="clean-checkbox">
                  <input
                    type="checkbox"
                    checked={isOverdue}
                    onChange={(e) => setIsOverdue(e.target.checked)}
                  />
                  <span>+10% Late Surcharge</span>
                </label>
              </div>
            </div>

            <div className="clean-sandbox__right">
              <div className="clean-receipt">
                <div className="clean-receipt__row">
                  <span>Minimum Base (0–10 m³):</span>
                  <code>₱{billCalc.tier1Amount.toFixed(2)}</code>
                </div>
                {billCalc.tier2Vol > 0 && (
                  <div className="clean-receipt__row">
                    <span>Tier 2 (11–20 m³):</span>
                    <code>₱{billCalc.tier2Amount.toFixed(2)}</code>
                  </div>
                )}
                {billCalc.tier3Vol > 0 && (
                  <div className="clean-receipt__row">
                    <span>Tier 3 (21–30 m³):</span>
                    <code>₱{billCalc.tier3Amount.toFixed(2)}</code>
                  </div>
                )}
                {billCalc.tier4Vol > 0 && (
                  <div className="clean-receipt__row">
                    <span>Tier 4 (31+ m³):</span>
                    <code>₱{billCalc.tier4Amount.toFixed(2)}</code>
                  </div>
                )}
                {isOverdue && (
                  <div className="clean-receipt__row clean-receipt__row--penalty">
                    <span>Late Surcharge:</span>
                    <code>+₱{billCalc.penalty.toFixed(2)}</code>
                  </div>
                )}
                <div className="clean-receipt__total">
                  <span>Total Payable:</span>
                  <strong>₱{billCalc.total.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anomaly Detection Tester */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Field Reading Flags</h2>
          </div>

          <div className="clean-anomaly-grid">
            <div className="clean-anomaly-buttons">
              {anomalyPresets.map((preset) => (
                <button
                  type="button"
                  key={preset.id}
                  className={`clean-anomaly-btn${selectedAnomaly.id === preset.id ? " is-active" : ""}`}
                  onClick={() => setSelectedAnomaly(preset)}
                >
                  <span className={`clean-dot clean-dot--${preset.flagType}`} />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>

            <div className="clean-anomaly-output">
              <div className="clean-anomaly-output__status">
                <span className={`clean-badge clean-badge--${selectedAnomaly.flagType}`}>
                  {selectedAnomaly.status}
                </span>
              </div>
              <div className="clean-anomaly-output__details">
                <div>
                  <span>Previous Reading</span>
                  <strong>{selectedAnomaly.previousReading} m³</strong>
                </div>
                <div>
                  <span>Current Upload</span>
                  <strong>{selectedAnomaly.currentReading} m³</strong>
                </div>
                <div>
                  <span>Delta Volume</span>
                  <strong>{selectedAnomaly.currentReading - selectedAnomaly.previousReading} m³</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code / Architecture */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Calculation Engine</h2>
          </div>

          <div className="clean-code-box">
            <div className="clean-code-box__header">
              <span>BillingEngine.ts</span>
              <button type="button" onClick={copyCode} className="clean-copy-btn">
                {codeCopied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="clean-code-box__pre">
              <code>{architectureSnippet}</code>
            </pre>
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className="clean-footer-nav">
          <a href="/#work" className="editorial-btn editorial-btn--ghost">
            <span>← Latest Work</span>
          </a>
          <a href="/works/cc-wedding" className="editorial-btn editorial-btn--primary">
            <span>Next: CC Wedding →</span>
          </a>
        </footer>

      </main>
      <Footer />
    </>
  );
}
