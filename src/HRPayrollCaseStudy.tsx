import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer, Navigation } from "./Sections";

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// PHILIPPINE STATUTORY COMPUTATION ENGINE (TRAIN LAW & 2025/2026 TABLES)
// =========================================================================

function computePhilippinePayroll(monthlySalary: number, lateMinutes: number, otHours: number) {
  const hourlyRate = (monthlySalary / 22) / 8;
  const minuteRate = hourlyRate / 60;

  const lateDeduction = lateMinutes * minuteRate;
  const otEarning = otHours * hourlyRate * 1.25;

  const grossPay = monthlySalary - lateDeduction + otEarning;

  // 1. SSS EE Contribution (2025/2026 5% EE capped at MSC 35,000 max EE = 1,750)
  const cappedSssMsc = Math.min(35000, Math.max(5000, monthlySalary));
  const sssEe = Math.min(1750, cappedSssMsc * 0.05);
  const sssEr = Math.min(3325, cappedSssMsc * 0.095);

  // 2. PhilHealth EE (5% shared 50/50 -> 2.5% EE, floor 10k, ceiling 100k)
  const cappedPhMsc = Math.min(100000, Math.max(10000, monthlySalary));
  const philHealthEe = (cappedPhMsc * 0.05) / 2;
  const philHealthEr = philHealthEe;

  // 3. Pag-IBIG HDMF EE (2% max 200 mandatory regular)
  const pagIbigEe = Math.min(200, monthlySalary * 0.02);
  const pagIbigEr = pagIbigEe;

  const totalMandatory = sssEe + philHealthEe + pagIbigEe;

  // 4. Taxable Income & BIR Withholding Tax (TRAIN Law Monthly Table)
  const taxableIncome = Math.max(0, grossPay - totalMandatory);
  let withholdingTax = 0;

  if (taxableIncome <= 20833) {
    withholdingTax = 0;
  } else if (taxableIncome <= 33333) {
    withholdingTax = (taxableIncome - 20833) * 0.15;
  } else if (taxableIncome <= 66667) {
    withholdingTax = 1875 + (taxableIncome - 33333) * 0.20;
  } else if (taxableIncome <= 166667) {
    withholdingTax = 8541.80 + (taxableIncome - 66667) * 0.25;
  } else if (taxableIncome <= 666667) {
    withholdingTax = 33541.80 + (taxableIncome - 166667) * 0.30;
  } else {
    withholdingTax = 183541.80 + (taxableIncome - 666667) * 0.35;
  }

  const totalDeductions = totalMandatory + withholdingTax + lateDeduction;
  const netTakeHome = grossPay - totalMandatory - withholdingTax;

  return {
    grossPay,
    lateDeduction,
    otEarning,
    hourlyRate,
    sssEe,
    sssEr,
    philHealthEe,
    philHealthEr,
    pagIbigEe,
    pagIbigEr,
    totalMandatory,
    taxableIncome,
    withholdingTax,
    totalDeductions,
    netTakeHome,
  };
}

const architectureSnippet = `// Strict Stored Procedure Data Access & ACID Auditing
// Module path: src/modules/attendance/dtr-adjustment/dtr-adjustment.api.ts
import "server-only";
import { executeQuery, sql } from "@/lib/db";

export async function revertApprovedDtrAdjustment(adjustmentId: string, remarks: string, username: string) {
  // Executes transactional reversal procedure in MSSQL
  // Restores original DTR snapshot and writes to att_dtr_status_history
  return executeQuery({
    procedure: "dbo.usp_dtr_adjustment_cancel",
    params: {
      AdjustmentID: { type: sql.UniqueIdentifier, value: adjustmentId },
      Remarks: { type: sql.NVarChar(500), value: remarks },
      ActedBy: { type: sql.NVarChar(100), value: username },
    },
  });
}`;

export default function HRPayrollCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  // Sandbox 1: Philippine Statutory Salary Simulator
  const [salary, setSalary] = useState<number>(38000);
  const [lateMins, setLateMins] = useState<number>(25);
  const [otHours, setOtHours] = useState<number>(6);

  // Sandbox 2: Interactive DTR State-Machine Simulator
  const [dtrState, setDtrState] = useState<{
    originalLate: number;
    currentLate: number;
    adjustmentStatus: "NONE" | "PENDING" | "APPROVED" | "CANCELLED";
    history: { action: string; time: string; note: string }[];
  }>({
    originalLate: 0,
    currentLate: 0,
    adjustmentStatus: "NONE",
    history: [],
  });

  const payroll = useMemo(() => {
    return computePhilippinePayroll(salary, lateMins, otHours);
  }, [salary, lateMins, otHours]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "LightEM Enterprise Payroll & HRIS — Case Study";
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".clean-header__meta-row", { opacity: 0, y: -12, duration: 0.6, ease: "power3.out" });
      gsap.from(".clean-header__title", { opacity: 0, y: 28, duration: 0.8, delay: 0.08, ease: "power3.out" });
      gsap.from(".clean-header__subtitle", { opacity: 0, y: 20, duration: 0.8, delay: 0.16, ease: "power3.out" });
      gsap.from(".clean-meta-strip", { opacity: 0, y: 20, duration: 0.8, delay: 0.24, ease: "power3.out" });

      gsap.from(".clean-stats-grid", {
        scrollTrigger: { trigger: ".clean-stats-grid", start: "top 85%" },
        opacity: 0,
        y: 24,
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

  // State Machine Actions
  const handleCreateAdjustment = () => {
    setDtrState((prev) => ({
      ...prev,
      adjustmentStatus: "PENDING",
      history: [
        { action: "FILED", time: "Just now", note: "Correction requested: 0 min → 40 min late" },
        ...prev.history,
      ],
    }));
  };

  const handleApproveAdjustment = () => {
    setDtrState((prev) => ({
      ...prev,
      currentLate: 40,
      adjustmentStatus: "APPROVED",
      history: [
        { action: "APPROVED", time: "Just now", note: "Live DTR updated: late set to 40 min" },
        ...prev.history,
      ],
    }));
  };

  const handleRevertAdjustment = () => {
    setDtrState((prev) => ({
      ...prev,
      currentLate: prev.originalLate,
      adjustmentStatus: "CANCELLED",
      history: [
        { action: "REVERTED", time: "Just now", note: "Restored DTR value back to 0 min & marked CANCELLED" },
        ...prev.history,
      ],
    }));
  };

  const handleResetSimulator = () => {
    setDtrState({
      originalLate: 0,
      currentLate: 0,
      adjustmentStatus: "NONE",
      history: [],
    });
  };

  const formatPhp = (val: number) =>
    "PHP " +
    val.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

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
            <span className="clean-header__tag">Enterprise Payroll & HRIS • 2025–Present</span>
          </div>

          <h1 className="clean-header__title">
            LightEM Enterprise Payroll & HRIS
          </h1>
          <p className="clean-header__subtitle">
            Enterprise-grade Human Resource Information System and Automated Payroll Engine with real-time biometric DTR calculations, overnight shift rules, Philippine statutory compliance (BIR, SSS, PhilHealth, Pag-IBIG), and multi-bank disbursement.
          </p>

          <div className="clean-meta-strip">
            <div>
              <span className="clean-meta-label">Role</span>
              <strong className="clean-meta-value">Lead Full-Stack Systems Architect</strong>
            </div>
            <div>
              <span className="clean-meta-label">Stack</span>
              <strong className="clean-meta-value">Next.js 16 • React 19 • TypeScript • MSSQL Server • Crystal Reports</strong>
            </div>
            <div>
              <span className="clean-meta-label">Status</span>
              <strong className="clean-meta-value">Enterprise Production</strong>
            </div>
          </div>
        </header>

        {/* Key Metrics */}
        <section className="clean-stats-grid">
          <div className="clean-stat">
            <span className="clean-stat__num">&lt; 4 hrs</span>
            <span className="clean-stat__label">Payroll Run (from 5 days)</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">100%</span>
            <span className="clean-stat__label">Statutory Compliance</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">0.00%</span>
            <span className="clean-stat__label">DTR Calculation Discrepancies</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">Multi-Entity</span>
            <span className="clean-stat__label">Company & Branch Mesh</span>
          </div>
        </section>

        {/* Interactive Sandbox 1: Statutory Tax & Net Salary Calculator */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Interactive Philippine Statutory & Take-Home Salary Simulator</h2>
            <p className="clean-section__subtitle">
              Test real-time calculation of SSS (2025/2026 table with MSC caps), PhilHealth (5% shared 50/50), Pag-IBIG (HDMF), and BIR TRAIN Law withholding tax tiers.
            </p>
          </div>

          <div className="clean-sandbox">
            <div className="clean-sandbox__left">
              <div className="clean-control">
                <div className="clean-control__label-row">
                  <span>Monthly Basic Salary</span>
                  <strong>{formatPhp(salary)}</strong>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="120000"
                  step="1000"
                  value={salary}
                  onChange={(e) => setSalary(parseInt(e.target.value, 10))}
                  className="clean-slider"
                />
              </div>

              <div className="clean-control">
                <div className="clean-control__label-row">
                  <span>Late / Tardiness (Minutes)</span>
                  <strong>{lateMins} mins ({formatPhp(payroll.lateDeduction)})</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="5"
                  value={lateMins}
                  onChange={(e) => setLateMins(parseInt(e.target.value, 10))}
                  className="clean-slider"
                />
              </div>

              <div className="clean-control">
                <div className="clean-control__label-row">
                  <span>Regular Overtime (Hours)</span>
                  <strong>{otHours} hrs (+{formatPhp(payroll.otEarning)})</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={otHours}
                  onChange={(e) => setOtHours(parseInt(e.target.value, 10))}
                  className="clean-slider"
                />
              </div>

              <div style={{ marginTop: "16px", padding: "12px", background: "rgba(37, 99, 235, 0.06)", borderRadius: "8px", fontSize: "12px", color: "var(--text-muted)" }}>
                💡 <strong>Hourly Rate:</strong> {formatPhp(payroll.hourlyRate)}/hr • <strong>Gross Pay:</strong> {formatPhp(payroll.grossPay)}
              </div>
            </div>

            <div className="clean-sandbox__right">
              <div className="clean-breakdown">
                <div className="clean-breakdown__row">
                  <span>SSS Contribution (EE)</span>
                  <strong>{formatPhp(payroll.sssEe)}</strong>
                </div>
                <div className="clean-breakdown__row">
                  <span>PhilHealth Contribution (EE)</span>
                  <strong>{formatPhp(payroll.philHealthEe)}</strong>
                </div>
                <div className="clean-breakdown__row">
                  <span>Pag-IBIG / HDMF (EE)</span>
                  <strong>{formatPhp(payroll.pagIbigEe)}</strong>
                </div>
                <div className="clean-breakdown__row">
                  <span>Taxable Income Base</span>
                  <strong>{formatPhp(payroll.taxableIncome)}</strong>
                </div>
                <div className="clean-breakdown__row" style={{ color: "#e11d48" }}>
                  <span>BIR TRAIN Withholding Tax</span>
                  <strong>{formatPhp(payroll.withholdingTax)}</strong>
                </div>
                <div className="clean-breakdown__divider" />
                <div className="clean-breakdown__total">
                  <span>Net Take-Home Salary</span>
                  <strong style={{ color: "#10b981", fontSize: "20px" }}>{formatPhp(payroll.netTakeHome)}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Sandbox 2: DTR Adjustment & Reversal Simulator */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Audit-Trailed DTR Adjustment & Non-Destructive Rollback</h2>
            <p className="clean-section__subtitle">
              Simulate the multi-stage approval workflow and non-destructive reversal procedure engineered to satisfy strict SQL Server check constraints without data loss.
            </p>
          </div>

          <div className="clean-sandbox">
            <div className="clean-sandbox__left">
              <div style={{ padding: "16px", background: "var(--card-bg, rgba(255,255,255,0.05))", borderRadius: "10px", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>Live Daily Time Record</span>
                  <span style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, background: dtrState.adjustmentStatus === "APPROVED" ? "rgba(16, 185, 129, 0.15)" : "rgba(37, 99, 235, 0.15)", color: dtrState.adjustmentStatus === "APPROVED" ? "#10b981" : "#3b82f6" }}>
                    Status: {dtrState.adjustmentStatus === "NONE" ? "REGULAR DTR" : dtrState.adjustmentStatus}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ padding: "10px", background: "rgba(0,0,0,0.15)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>Work Date</span>
                    <strong style={{ fontSize: "13px" }}>2026-06-09</strong>
                  </div>
                  <div style={{ padding: "10px", background: "rgba(0,0,0,0.15)", borderRadius: "8px" }}>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>Current Recorded Late</span>
                    <strong style={{ fontSize: "14px", color: dtrState.currentLate > 0 ? "#f59e0b" : "inherit" }}>
                      {dtrState.currentLate} mins
                    </strong>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {dtrState.adjustmentStatus === "NONE" && (
                    <button type="button" className="button button--hero-primary" onClick={handleCreateAdjustment} style={{ padding: "8px 16px", fontSize: "12px" }}>
                      + Request Correction (Set Late to 40m)
                    </button>
                  )}

                  {dtrState.adjustmentStatus === "PENDING" && (
                    <>
                      <button type="button" className="button button--hero-primary" onClick={handleApproveAdjustment} style={{ padding: "8px 16px", fontSize: "12px", background: "#10b981", borderColor: "#059669" }}>
                        ✓ Approve Adjustment
                      </button>
                    </>
                  )}

                  {dtrState.adjustmentStatus === "APPROVED" && (
                    <button type="button" className="button button--hero-primary" onClick={handleRevertAdjustment} style={{ padding: "8px 16px", fontSize: "12px", background: "#e11d48", borderColor: "#be123c" }}>
                      ↩ Revert Approved Adjustment
                    </button>
                  )}

                  {dtrState.adjustmentStatus !== "NONE" && (
                    <button type="button" className="button button--hero-secondary" onClick={handleResetSimulator} style={{ padding: "8px 14px", fontSize: "12px" }}>
                      Reset Demo
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="clean-sandbox__right">
              <div className="clean-breakdown">
                <span style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px", display: "block" }}>
                  Audit History Log (dbo.att_dtr_status_history)
                </span>
                {dtrState.history.length === 0 ? (
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "8px 0" }}>
                    No adjustment events recorded yet. Click the action button on the left to simulate.
                  </p>
                ) : (
                  dtrState.history.map((h, i) => (
                    <div key={i} style={{ padding: "8px 10px", background: "rgba(0,0,0,0.15)", borderRadius: "6px", marginBottom: "6px", fontSize: "11.5px" }}>
                      <strong style={{ color: "#3b82f6" }}>[{h.action}]</strong> <span style={{ color: "var(--text-muted)" }}>• {h.time}</span>
                      <p style={{ margin: "2px 0 0" }}>{h.note}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Architecture & Code Snippet */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Server Component Isolation & Stored Procedure Architecture</h2>
            <p className="clean-section__subtitle">
              Strict isolation using <code>import "server-only"</code> prevents client bundle leaks while executing atomic Transact-SQL procedures.
            </p>
          </div>

          <div className="clean-code-block">
            <div className="clean-code-block__header">
              <span>src/modules/attendance/dtr-adjustment/dtr-adjustment.api.ts</span>
              <button type="button" onClick={copyCode} className="clean-code-block__copy">
                {codeCopied ? "Copied!" : "Copy Snippet"}
              </button>
            </div>
            <pre>
              <code>{architectureSnippet}</code>
            </pre>
          </div>
        </section>

        {/* Core Architecture Matrix */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Enterprise Architectural Pillars</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            <div style={{ padding: "20px", background: "var(--card-bg, rgba(255,255,255,0.03))", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "15px", marginBottom: "8px", color: "#3b82f6" }}>1. Zero-Discrepancy DTR Engine</h3>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--text-muted)" }}>
                Processes raw biometric timestamps with overnight cross-day split logic, automated break deductions, and minute-level tardiness tracking.
              </p>
            </div>

            <div style={{ padding: "20px", background: "var(--card-bg, rgba(255,255,255,0.03))", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "15px", marginBottom: "8px", color: "#10b981" }}>2. Philippine Statutory Matrix</h3>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--text-muted)" }}>
                Automated gross-to-net computation adhering to BIR TRAIN Law withholding brackets, SSS MSC tiers, PhilHealth, and HDMF MP2 savings.
              </p>
            </div>

            <div style={{ padding: "20px", background: "var(--card-bg, rgba(255,255,255,0.03))", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <h3 style={{ fontSize: "15px", marginBottom: "8px", color: "#f59e0b" }}>3. Bank & Crystal Reports Engine</h3>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--text-muted)" }}>
                Direct generation of bank hash transmittals (BDO, BPI, Metrobank) and official government reports via dedicated Crystal Reports (.rpt) service.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <nav className="clean-footer-nav" aria-label="Case Study Navigation">
          <a href="/works/lgu-water" className="clean-nav-btn">
            <span>← Previous Project</span>
            <strong>LGU Water District System</strong>
          </a>
          <a href="/works/cc-wedding" className="clean-nav-btn" style={{ textAlign: "right" }}>
            <span>Next Project →</span>
            <strong>CC Wedding Experience</strong>
          </a>
        </nav>
      </main>
      <Footer />
    </>
  );
}
