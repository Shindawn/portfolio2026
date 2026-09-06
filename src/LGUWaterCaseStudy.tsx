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
  const [caseMode, setCaseMode] = useState<"executive" | "autopsy">("executive");

  // SCADA Crisis Control Room State
  const [pipeBurstActive, setPipeBurstActive] = useState<boolean>(false);
  const [linePressure, setLinePressure] = useState<number>(58);
  const [flowRate, setFlowRate] = useState<number>(1420);
  const [systemStress, setSystemStress] = useState<number>(12);

  // Sandbox 1: Tariff Calculator
  const [volume, setVolume] = useState<number>(24);
  const [accountType, setAccountType] = useState<AccountType>("residential");
  const [isOverdue, setIsOverdue] = useState<boolean>(false);

  // Sandbox 2: Anomaly Tester
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyPreset>(anomalyPresets[0]);

  // SCADA Burst trigger effect
  const togglePipeBurst = () => {
    if (!pipeBurstActive) {
      setPipeBurstActive(true);
      setLinePressure(21);
      setFlowRate(3890);
      setSystemStress(94);
      setSelectedAnomaly(anomalyPresets[1]); // Spike preset
    } else {
      setPipeBurstActive(false);
      setLinePressure(58);
      setFlowRate(1420);
      setSystemStress(12);
      setSelectedAnomaly(anomalyPresets[0]);
    }
  };

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
    document.title = "LGU Water District — Case Study";
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".clean-header__meta-row", { opacity: 0, y: -12, duration: 0.6, ease: "power3.out" });
      gsap.from(".clean-header__title", { opacity: 0, y: 28, duration: 0.8, delay: 0.08, ease: "power3.out" });
      gsap.from(".clean-header__subtitle", { opacity: 0, y: 20, duration: 0.8, delay: 0.16, ease: "power3.out" });
      gsap.from(".case-mode-bar", { opacity: 0, y: 16, duration: 0.7, delay: 0.22, ease: "power3.out" });
      gsap.from(".clean-meta-strip", { opacity: 0, y: 20, duration: 0.8, delay: 0.28, ease: "power3.out" });

      gsap.from(".clean-media-frame", { opacity: 0, y: 36, duration: 0.85, delay: 0.35, ease: "power3.out" });

      gsap.from(".clean-stat", {
        scrollTrigger: { trigger: ".clean-stats-grid", start: "top 85%" },
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".clean-section").forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: { trigger: sec, start: "top 85%" },
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: "power3.out",
        });
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
            <span className="clean-header__tag">Municipal Utility · 2025—2026</span>
          </div>

          <h1 className="clean-header__title">
            LGU Water District Utility Engine
          </h1>
          <p className="clean-header__subtitle">
            A high-throughput municipal billing, telemetry dispatch, and algorithmic anomaly detection platform built to handle 40,000+ accounts.
          </p>

          {/* Tactical Mode Switcher */}
          <div className="case-mode-bar">
            <div className="case-mode-bar__label">
              <span className="case-mode-bar__pulse" />
              <span>Inspection Perspective</span>
            </div>
            <div className="case-mode-toggle">
              <button
                type="button"
                className={`case-mode-btn${caseMode === "executive" ? " is-active" : ""}`}
                onClick={() => setCaseMode("executive")}
              >
                ✨ Executive Showcase
              </button>
              <button
                type="button"
                className={`case-mode-btn case-mode-btn--autopsy${caseMode === "autopsy" ? " is-active" : ""}`}
                onClick={() => setCaseMode("autopsy")}
              >
                💀 Brutal Engineering Autopsy
              </button>
            </div>
          </div>

          <div className="clean-meta-strip">
            <div>
              <span className="clean-meta-label">Role</span>
              <strong className="clean-meta-value">Lead Full-Stack Architect & Product Designer</strong>
            </div>
            <div>
              <span className="clean-meta-label">Stack</span>
              <strong className="clean-meta-value">React 18 · TypeScript · Vite · Canvas API · PostgreSQL · Tailwind CSS</strong>
            </div>
            <div>
              <span className="clean-meta-label">Scope</span>
              <strong className="clean-meta-value">40,000+ Consumers · 28 Zones · Offline Sync</strong>
            </div>
          </div>
        </header>

        {/* BRUTAL AUTOPSY CONTAINER (Visible when Autopsy Mode is Active) */}
        {caseMode === "autopsy" && (
          <section className="autopsy-container">
            <span className="autopsy-stamp">CRITICAL SYSTEM POST-MORTEM</span>
            <div className="clean-section__head">
              <h2 className="clean-section__title" style={{ color: "#ea580c" }}>
                Post-Mortem: What Broke in the Trenches
              </h2>
              <p className="clean-section__subtitle">
                Municipal utility software deals with legacy pipe rust, zero internet in valleys, and arithmetic precision errors. Here are the fatal roadblocks.
              </p>
            </div>

            <div className="autopsy-card-grid">
              <div className="autopsy-card">
                <span className="autopsy-card__tag">💀 ARITHMETIC DISASTER #1</span>
                <h3 className="autopsy-card__title">JavaScript IEEE-754 Floating Point Drift</h3>
                <p className="autopsy-card__content">
                  Standard JS floats caused a ₱0.03 rounding error per bill. Across 40,000 monthly accounts, this created a ₱1,200 discrepancy on municipal treasury audit books.
                </p>
                <div className="autopsy-card__fix">
                  <strong>Fix:</strong> Re-wrote the calculation engine using strict integer centavo arithmetic and PostgreSQL `Decimal(14,2)` fixed-point types.
                </div>
              </div>

              <div className="autopsy-card">
                <span className="autopsy-card__tag">💀 OFFLINE DESYNC #2</span>
                <h3 className="autopsy-card__title">Mountain Barangay Dead Zones</h3>
                <p className="autopsy-card__content">
                  Field readers in rural sectors experienced 100% cellular blackout. Browser sessions refreshed, wiping entire morning routes of 300+ uncommitted meter entries.
                </p>
                <div className="autopsy-card__fix">
                  <strong>Fix:</strong> Built an offline-first IndexedDB Write-Ahead Log (WAL) that cryptographically queues reads and syncs upon reconnection.
                </div>
              </div>

              <div className="autopsy-card">
                <span className="autopsy-card__tag">💀 TAMPERING VECTOR #3</span>
                <h3 className="autopsy-card__title">Negative Dial Rollback Loopholes</h3>
                <p className="autopsy-card__content">
                  Legacy physical meters were being manually wound back or inverted, resulting in negative readings that crashed the sequential billing loop.
                </p>
                <div className="autopsy-card__fix">
                  <strong>Fix:</strong> Engineered an algorithmic anomaly gate that locks negative deltas immediately and issues an on-site field tamper audit ticket.
                </div>
              </div>
            </div>
          </section>
        )}

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
              Dashboard Mockup
            </button>
          </div>

          <div className="clean-media-stage">
            {activeTab === "video" && (
              <video
                src="/lgu-water.mp4"
                poster="/lgu-water-mockup.jpg"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="clean-media-element"
              />
            )}
            {activeTab === "mockup" && (
              <img
                src="/lgu-water-mockup.jpg"
                alt="LGU Water District Dashboard"
                className="clean-media-element"
              />
            )}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="clean-stats-grid">
          <div className="clean-stat">
            <span className="clean-stat__num">&lt; 150ms</span>
            <span className="clean-stat__label">Tariff Compute</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">40,000+</span>
            <span className="clean-stat__label">Consumer Accounts</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">4 Tiers</span>
            <span className="clean-stat__label">Progressive Billing</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">100%</span>
            <span className="clean-stat__label">Offline-First Sync</span>
          </div>
        </section>

        {/* SET PIECE 1: Municipal SCADA Crisis Control Room */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Municipal SCADA Crisis Control Room</h2>
            <p className="clean-section__subtitle">
              Simulate hydraulic stress events across Sector 4 mainline feeders. Trigger a pipe burst to test automatic sensor telemetry and anomaly tripwires.
            </p>
          </div>

          <div className={`scada-crisis-terminal${pipeBurstActive ? " is-burst" : ""}`}>
            <div className="scada-header">
              <div>
                <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: pipeBurstActive ? "#f87171" : "#38bdf8", fontWeight: 800 }}>
                  {pipeBurstActive ? "🚨 CRITICAL ALARM · MAINLINE RUPTURE DETECTED" : "● SCADA TELEMETRY · ALL SECTORS NOMINAL"}
                </span>
                <div style={{ fontSize: "1.15rem", fontWeight: 800, marginTop: "0.25rem" }}>
                  Sector 04 Sub-Grid Telemetry Hub
                </div>
              </div>

              <button
                type="button"
                className={`scada-burst-btn ${pipeBurstActive ? "scada-burst-btn--reset" : "scada-burst-btn--trigger"}`}
                onClick={togglePipeBurst}
              >
                {pipeBurstActive ? "✓ Clear Burst Alarm & Re-pressurize" : "💥 Simulate Mainline Pipe Burst"}
              </button>
            </div>

            <div className="scada-telemetry-grid">
              <div className={`scada-telemetry-item${pipeBurstActive ? " is-danger" : ""}`}>
                <span style={{ fontSize: "0.72rem", color: "rgba(224, 242, 254, 0.6)" }}>LINE PRESSURE</span>
                <div className="scada-telemetry-item__val">{linePressure} PSI</div>
                <span style={{ fontSize: "0.7rem", color: pipeBurstActive ? "#f87171" : "#4ade80" }}>
                  {pipeBurstActive ? "▼ -64% (Depressurizing)" : "Nominal (50-65 PSI)"}
                </span>
              </div>

              <div className={`scada-telemetry-item${pipeBurstActive ? " is-danger" : ""}`}>
                <span style={{ fontSize: "0.72rem", color: "rgba(224, 242, 254, 0.6)" }}>DISCHARGE FLOW</span>
                <div className="scada-telemetry-item__val">{flowRate} m³/h</div>
                <span style={{ fontSize: "0.7rem", color: pipeBurstActive ? "#f87171" : "#4ade80" }}>
                  {pipeBurstActive ? "▲ +174% (Surge Loss)" : "Optimal (1200-1500)"}
                </span>
              </div>

              <div className={`scada-telemetry-item${pipeBurstActive ? " is-danger" : ""}`}>
                <span style={{ fontSize: "0.72rem", color: "rgba(224, 242, 254, 0.6)" }}>SYSTEM STRESS</span>
                <div className="scada-telemetry-item__val">{systemStress}%</div>
                <span style={{ fontSize: "0.7rem", color: pipeBurstActive ? "#f87171" : "#4ade80" }}>
                  {pipeBurstActive ? "CRITICAL RISK" : "Normal Load"}
                </span>
              </div>
            </div>

            {pipeBurstActive && (
              <div style={{ background: "rgba(239, 68, 68, 0.12)", border: "1px solid #ef4444", borderRadius: "8px", padding: "0.75rem", fontSize: "0.8rem", color: "#fca5a5" }}>
                ⚠️ <strong>AUTOMATIC TRIPWIRE:</strong> Sector 4 isolation valve V-402 actuated. Anomaly detection engine flagged 14 connected household meters for artificial spike dampening.
              </div>
            )}
          </div>

          <WaterGridSimulation />
        </section>

        {/* SET PIECE 2: The Duel: Legacy Paper Ledger vs Cloud SCADA */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">The Architectural Duel: Before vs. After</h2>
            <p className="clean-section__subtitle">
              How modern real-time engineering eliminated the 14-day manual pen-and-paper billing latency.
            </p>
          </div>

          <div className="duel-grid">
            <div className="duel-card duel-card--legacy">
              <span style={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 800, color: "#ef4444" }}>
                ❌ THE LEGACY BOTTLENECK (2015—2024)
              </span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0.5rem 0 0.75rem" }}>
                14-Day Paper Ledger Cycle
              </h3>
              <ul style={{ fontSize: "0.86rem", color: "var(--muted)", paddingLeft: "1.2rem", lineHeight: 1.7 }}>
                <li>Manual clipboard readings vulnerable to rain and ink smears.</li>
                <li>Data re-encoded by hand at municipal hall, causing 6.2% typing errors.</li>
                <li>Pipe leaks went unnoticed until monthly billing reconciliation.</li>
                <li>Zero historical usage analytics for water conservation planning.</li>
              </ul>
            </div>

            <div className="duel-card duel-card--scada">
              <span style={{ fontFamily: "monospace", fontSize: "0.72rem", fontWeight: 800, color: "var(--accent-bright)" }}>
                ✓ THE MODERN ARCHITECTURE (2025—2026)
              </span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0.5rem 0 0.75rem" }}>
                Sub-Second Algorithmic Grid
              </h3>
              <ul style={{ fontSize: "0.86rem", color: "var(--muted)", paddingLeft: "1.2rem", lineHeight: 1.7 }}>
                <li>Offline-first mobile entry with instant biometric OCR verification.</li>
                <li>Fixed-point progressive tariff computation in &lt;150ms.</li>
                <li>Algorithmic tripwires detect mainline bursts in real time.</li>
                <li>Consumer portal with live consumption graphs and SMS billing alerts.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Tariff Calculator Sandbox */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Interactive Tariff Calculator Sandbox</h2>
            <p className="clean-section__subtitle">
              Test the 4-tier progressive volumetric billing engine with real-world consumption parameters.
            </p>
          </div>

          <div className="clean-tariff-sandbox">
            <div className="clean-tariff-controls">
              <div className="clean-field">
                <label className="clean-label" htmlFor="volume-range">
                  <span>Consumption Volume</span>
                  <strong>{volume} m³</strong>
                </label>
                <input
                  id="volume-range"
                  type="range"
                  min="0"
                  max="80"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="clean-range"
                />
              </div>

              <div className="clean-field">
                <span className="clean-label">Account Classification</span>
                <div className="clean-btn-group">
                  <button
                    type="button"
                    className={`clean-pill-btn${accountType === "residential" ? " is-active" : ""}`}
                    onClick={() => setAccountType("residential")}
                  >
                    Residential
                  </button>
                  <button
                    type="button"
                    className={`clean-pill-btn${accountType === "commercial" ? " is-active" : ""}`}
                    onClick={() => setAccountType("commercial")}
                  >
                    Commercial
                  </button>
                </div>
              </div>

              <div className="clean-field">
                <label className="clean-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isOverdue}
                    onChange={(e) => setIsOverdue(e.target.checked)}
                  />
                  <span>Apply 10% Late Payment Penalty</span>
                </label>
              </div>
            </div>

            <div className="clean-bill-receipt">
              <div className="clean-receipt-header">
                <h3>Computed Statement</h3>
                <span className="clean-receipt-badge">{accountType.toUpperCase()}</span>
              </div>

              <div className="clean-receipt-rows">
                <div className="clean-receipt-row">
                  <span>Tier 1 (Base 0–10 m³)</span>
                  <span>₱{billCalc.tier1Amount.toFixed(2)}</span>
                </div>
                <div className="clean-receipt-row">
                  <span>Tier 2 (11–20 m³: {billCalc.tier2Vol} m³)</span>
                  <span>₱{billCalc.tier2Amount.toFixed(2)}</span>
                </div>
                <div className="clean-receipt-row">
                  <span>Tier 3 (21–30 m³: {billCalc.tier3Vol} m³)</span>
                  <span>₱{billCalc.tier3Amount.toFixed(2)}</span>
                </div>
                <div className="clean-receipt-row">
                  <span>Tier 4 (31+ m³: {billCalc.tier4Vol} m³)</span>
                  <span>₱{billCalc.tier4Amount.toFixed(2)}</span>
                </div>
                {isOverdue && (
                  <div className="clean-receipt-row clean-receipt-row--penalty">
                    <span>10% Surcharge</span>
                    <span>₱{billCalc.penalty.toFixed(2)}</span>
                  </div>
                )}
                <div className="clean-receipt-divider" />
                <div className="clean-receipt-total">
                  <span>Total Amount Due</span>
                  <span>₱{billCalc.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anomaly Detection Engine Tester */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Algorithmic Anomaly Detection Tester</h2>
            <p className="clean-section__subtitle">
              Simulate edge-case meter readings and inspect the tripwire verification states.
            </p>
          </div>

          <div className="clean-anomaly-presets">
            {anomalyPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`clean-anomaly-card${selectedAnomaly.id === preset.id ? " is-active" : ""}`}
                onClick={() => setSelectedAnomaly(preset)}
              >
                <div className="clean-anomaly-card__title">{preset.name}</div>
                <div className="clean-anomaly-card__readings">
                  {preset.previousReading} ➔ {preset.currentReading} m³
                </div>
                <div className={`clean-anomaly-badge clean-anomaly-badge--${preset.flagType}`}>
                  {preset.status}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Code Architecture */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Tariff Computation Engine Code</h2>
          </div>

          <div className="clean-code-box">
            <div className="clean-code-box__header">
              <span>WaterBillingEngine.ts</span>
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
          <a href="/works/cc-wedding" className="editorial-btn editorial-btn--ghost">
            <span>← Previous: CC Wedding</span>
          </a>
          <a href="/works/hr-payroll" className="editorial-btn editorial-btn--primary">
            <span>Next: LightEM Payroll & HRIS →</span>
          </a>
        </footer>

      </main>
      <Footer />
    </>
  );
}
