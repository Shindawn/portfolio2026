import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer, Navigation } from "./Sections";

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// PHILIPPINE STATUTORY COMPUTATION ENGINE (TRAIN LAW & 2025/2026 TABLES)
// =========================================================================

function computePhilippinePayroll(
  monthlySalary: number,
  lateMinutes: number,
  otHours: number,
  holidayMultiplier: number = 1.0,
  nightDiffHours: number = 0
) {
  const hourlyRate = monthlySalary / 22 / 8;
  const minuteRate = hourlyRate / 60;

  const lateDeduction = lateMinutes * minuteRate;
  // Overtime with holiday & night shift multipliers
  const baseOtRate = hourlyRate * 1.25 * holidayMultiplier;
  const otEarning = otHours * baseOtRate;
  const nightDiffEarning = nightDiffHours * (hourlyRate * 0.1);

  const grossPay = monthlySalary - lateDeduction + otEarning + nightDiffEarning;

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
    withholdingTax = 1875 + (taxableIncome - 33333) * 0.2;
  } else if (taxableIncome <= 166667) {
    withholdingTax = 8541.8 + (taxableIncome - 66667) * 0.25;
  } else if (taxableIncome <= 666667) {
    withholdingTax = 33541.8 + (taxableIncome - 166667) * 0.3;
  } else {
    withholdingTax = 183541.8 + (taxableIncome - 666667) * 0.35;
  }

  const totalDeductions = totalMandatory + withholdingTax + lateDeduction;
  const netTakeHome = grossPay - totalMandatory - withholdingTax;

  return {
    grossPay,
    lateDeduction,
    otEarning,
    nightDiffEarning,
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
  // Executes transactional reversal procedure in MSSQL with SERIALIZABLE isolation
  // Restores original DTR snapshot and writes immutable audit entry to att_dtr_status_history
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
  const [caseMode, setCaseMode] = useState<"executive" | "autopsy">("executive");

  // Fire Drill State Machine
  const [fireDrillStatus, setFireDrillStatus] = useState<"idle" | "triggered" | "reverted">("idle");
  const [drillLogs, setDrillLogs] = useState<string[]>([
    "16:58:12 [SYSTEM] Payroll Batch #2026-08B locked for final payout calculation.",
    "16:58:30 [ALERT] Dept. Head batch-approved 14 disputed overtime adjustments.",
    "16:58:45 [CRITICAL] Anomaly detected: Total variance exceeds ₱84,200. Cutoff in 01:15.",
  ]);

  // Sandbox 1: Philippine Statutory Salary Simulator
  const [salary, setSalary] = useState<number>(38000);
  const [lateMins, setLateMins] = useState<number>(25);
  const [otHours, setOtHours] = useState<number>(6);
  const [holidayRate, setHolidayRate] = useState<number>(1.0);
  const [nightHours, setNightHours] = useState<number>(0);

  // Sandbox 2: Interactive DTR State-Machine Simulator
  const [dtrState, setDtrState] = useState<{
    originalLate: number;
    currentLate: number;
    adjustmentStatus: "NONE" | "PENDING" | "APPROVED" | "CANCELLED";
    history: { action: string; time: string; note: string }[];
  }>({
    originalLate: 45,
    currentLate: 45,
    adjustmentStatus: "NONE",
    history: [],
  });

  const payroll = useMemo(() => {
    return computePhilippinePayroll(salary, lateMins, otHours, holidayRate, nightHours);
  }, [salary, lateMins, otHours, holidayRate, nightHours]);

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
      gsap.from(".case-mode-bar", { opacity: 0, y: 16, duration: 0.7, delay: 0.22, ease: "power3.out" });
      gsap.from(".clean-meta-strip", { opacity: 0, y: 20, duration: 0.8, delay: 0.28, ease: "power3.out" });

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

  const triggerRollbackHatch = () => {
    setFireDrillStatus("triggered");
    const newLogs = [
      ...drillLogs,
      "16:59:02 [ACTION] Operator initiated EMERGENCY ACID ROLLBACK HATCH.",
      "16:59:03 [SQL] BEGIN TRANSACTION (ISOLATION LEVEL SERIALIZABLE)...",
      "16:59:03 [SQL] EXEC dbo.usp_dtr_adjustment_cancel @AdjustmentID='B94F...', @ActedBy='sysadmin'",
      "16:59:04 [SQL] Restoring pre-adjustment snapshot for 14 employee records...",
      "16:59:04 [SQL] Writing audit hashes to att_dtr_status_history... DONE (0.012s).",
      "16:59:05 [SQL] COMMIT TRANSACTION. Table locks released.",
      "16:59:05 [SUCCESS] ✓ PAYROLL INTEGRITY RESTORED. Batch recalculated in 140ms.",
    ];
    setDrillLogs(newLogs);
    setFireDrillStatus("reverted");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(architectureSnippet);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  // State machine simulator helper
  const handleDtrAction = (action: "REQUEST" | "APPROVE" | "REVERT") => {
    const now = new Date().toLocaleTimeString();
    if (action === "REQUEST") {
      setDtrState((prev) => ({
        ...prev,
        adjustmentStatus: "PENDING",
        history: [{ action: "Requested Adjustment to 0 mins", time: now, note: "Biometric failed to scan" }, ...prev.history],
      }));
    } else if (action === "APPROVE") {
      setDtrState((prev) => ({
        ...prev,
        currentLate: 0,
        adjustmentStatus: "APPROVED",
        history: [{ action: "Supervisor Approved Adjustment", time: now, note: "Confirmed present on camera" }, ...prev.history],
      }));
    } else if (action === "REVERT") {
      setDtrState((prev) => ({
        ...prev,
        currentLate: prev.originalLate,
        adjustmentStatus: "CANCELLED",
        history: [{ action: "Reverted Approval to Original Snapshot", time: now, note: "Dispute reopened by HR" }, ...prev.history],
      }));
    }
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
            <span className="clean-header__tag">Enterprise SaaS · 2025—2026</span>
          </div>

          <h1 className="clean-header__title">
            LightEM Enterprise Payroll & HRIS
          </h1>
          <p className="clean-header__subtitle">
            ACID-compliant Philippine statutory payroll engine, biometric attendance reconciliation, and high-concurrency stored procedure architecture.
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
              <strong className="clean-meta-value">Lead Systems Architect & Full-Stack Engineer</strong>
            </div>
            <div>
              <span className="clean-meta-label">Stack</span>
              <strong className="clean-meta-value">Next.js 15 · TypeScript · MSSQL · Tailwind CSS · Stored Procedures</strong>
            </div>
            <div>
              <span className="clean-meta-label">Compliance</span>
              <strong className="clean-meta-value">TRAIN Law · 2025 SSS Tables · PhilHealth 5% · Pag-IBIG 2%</strong>
            </div>
          </div>
        </header>

        {/* BRUTAL AUTOPSY CONTAINER (Visible when Autopsy Mode is Active) */}
        {caseMode === "autopsy" && (
          <section className="autopsy-container">
            <span className="autopsy-stamp">INCIDENT & REFACTOR POST-MORTEM</span>
            <div className="clean-section__head">
              <h2 className="clean-section__title" style={{ color: "#ea580c" }}>
                Post-Mortem: Why We Ripped Out the ORM
              </h2>
              <p className="clean-section__subtitle">
                The sanitized enterprise pitch hides the database deadlocks, biometric packet storms, and tax ceiling bugs. Here is the engineering autopsy.
              </p>
            </div>

            <div className="autopsy-card-grid">
              <div className="autopsy-card">
                <span className="autopsy-card__tag">💀 DEADLOCK DISASTER #1</span>
                <h3 className="autopsy-card__title">ORM Table-Level Deadlocks During 8:00 AM Punch-In</h3>
                <p className="autopsy-card__content">
                  When 600 workers punched biometrics simultaneously, Prisma/ORM generated unindexed relational subqueries that locked the entire `att_dtr_logs` table for 14 seconds.
                </p>
                <div className="autopsy-card__fix">
                  <strong>Fix:</strong> Stripped out ORM queries in favor of raw MSSQL Stored Procedures using row-level hints (`ROWLOCK, READPAST`), reducing punch-in processing from 14s to 8ms.
                </div>
              </div>

              <div className="autopsy-card">
                <span className="autopsy-card__tag">💀 UDP PACKET STORM #2</span>
                <h3 className="autopsy-card__title">Biometric Device Re-transmit Floods</h3>
                <p className="autopsy-card__content">
                  Unstable factory Wi-Fi caused physical fingerprint terminals to re-send identical punches 5 times, multiplying computed overtime by 500% on 38 timecards.
                </p>
                <div className="autopsy-card__fix">
                  <strong>Fix:</strong> Implemented SHA-256 idempotency hashing on `(DeviceID + BiometricID + Timestamp)` to silently drop duplicate packets at the ingestion buffer.
                </div>
              </div>

              <div className="autopsy-card">
                <span className="autopsy-card__tag">💀 STATUTORY EDGE CASE #3</span>
                <h3 className="autopsy-card__title">2025/2026 SSS MSC Cap Jump</h3>
                <p className="autopsy-card__content">
                  When the Philippine government adjusted maximum salary credit from ₱30k to ₱35k with a 5% EE rate, hardcoded formula constants caused under-withholding on senior engineers.
                </p>
                <div className="autopsy-card__fix">
                  <strong>Fix:</strong> Built dynamic statutory bracket schema tables with effective-date versioning, allowing tax adjustments without code deployments.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Stats Grid */}
        <section className="clean-stats-grid">
          <div className="clean-stat">
            <span className="clean-stat__num">&lt; 140ms</span>
            <span className="clean-stat__label">Payroll Run (1,000+ staff)</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">100%</span>
            <span className="clean-stat__label">ACID Audit Compliance</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">0</span>
            <span className="clean-stat__label">Table Deadlocks</span>
          </div>
          <div className="clean-stat">
            <span className="clean-stat__num">1-Click</span>
            <span className="clean-stat__label">Dispute Rollback Hatch</span>
          </div>
        </section>

        {/* SET PIECE 1: The Friday 4:59 PM Payroll Fire Drill */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">The Friday 4:59 PM Payroll Fire Drill</h2>
            <p className="clean-section__subtitle">
              Interactive high-stress incident simulation. Test the emergency ACID rollback hatch to revert conflicting supervisor adjustments before the banking cutoff.
            </p>
          </div>

          <div className="fire-drill-terminal">
            <div className="fire-drill-header">
              <div>
                <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#f87171", fontWeight: 800 }}>
                  ● EMERGENCY DRILL SIMULATOR · CUTOFF IMMINENT
                </span>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, marginTop: "0.25rem" }}>
                  Disputed Overtime Anomaly on Batch #2026-08B
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div className="fire-drill-countdown">
                  <span>⏱ CUTOFF:</span>
                  <strong>16:59:48</strong>
                </div>

                <button
                  type="button"
                  className="fire-drill-hatch-btn"
                  onClick={triggerRollbackHatch}
                  disabled={fireDrillStatus === "reverted"}
                >
                  {fireDrillStatus === "reverted" ? "✓ Rollback Executed" : "🚨 Trigger Emergency Rollback Hatch"}
                </button>
              </div>
            </div>

            <div className="fire-drill-console">
              {drillLogs.map((log, i) => {
                const isAlert = log.includes("[ALERT]") || log.includes("[CRITICAL]");
                const isSuccess = log.includes("[SUCCESS]") || log.includes("DONE");
                return (
                  <div
                    key={i}
                    className={`fire-drill-log-entry${isAlert ? " is-alert" : ""}${isSuccess ? " is-success" : ""}`}
                  >
                    <span>{log}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SET PIECE 2: Philippine Statutory & Holiday Premium Simulator */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Philippine Statutory & Holiday Premium Simulator</h2>
            <p className="clean-section__subtitle">
              Live calculation engine implementing TRAIN Law tax brackets, 2025/2026 SSS mandatory salary credits, PhilHealth 5%, and Pag-IBIG.
            </p>
          </div>

          {/* Holiday Presets */}
          <div className="statutory-preset-bar">
            {[
              { label: "Regular Workday (100%)", mult: 1.0 },
              { label: "Rest Day Overtime (130%)", mult: 1.3 },
              { label: "Special Non-Working Holiday (130%)", mult: 1.3 },
              { label: "Regular Holiday (200%)", mult: 2.0 },
              { label: "Double Holiday (300%)", mult: 3.0 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                className={`statutory-preset-chip${holidayRate === preset.mult ? " is-active" : ""}`}
                onClick={() => setHolidayRate(preset.mult)}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="clean-tariff-sandbox">
            <div className="clean-tariff-controls">
              <div className="clean-field">
                <label className="clean-label" htmlFor="salary-range">
                  <span>Monthly Base Salary</span>
                  <strong>₱{salary.toLocaleString()}</strong>
                </label>
                <input
                  id="salary-range"
                  type="range"
                  min="15000"
                  max="150000"
                  step="1000"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="clean-range"
                />
              </div>

              <div className="clean-field">
                <label className="clean-label" htmlFor="late-mins">
                  <span>Late Deductions</span>
                  <strong>{lateMins} minutes</strong>
                </label>
                <input
                  id="late-mins"
                  type="range"
                  min="0"
                  max="240"
                  step="5"
                  value={lateMins}
                  onChange={(e) => setLateMins(Number(e.target.value))}
                  className="clean-range"
                />
              </div>

              <div className="clean-field">
                <label className="clean-label" htmlFor="ot-hours">
                  <span>Overtime Hours</span>
                  <strong>{otHours} hours ({holidayRate * 125}%)</strong>
                </label>
                <input
                  id="ot-hours"
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={otHours}
                  onChange={(e) => setOtHours(Number(e.target.value))}
                  className="clean-range"
                />
              </div>

              <div className="clean-field">
                <label className="clean-label" htmlFor="night-hours">
                  <span>Night Shift Differential</span>
                  <strong>{nightHours} hours (+10%)</strong>
                </label>
                <input
                  id="night-hours"
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={nightHours}
                  onChange={(e) => setNightHours(Number(e.target.value))}
                  className="clean-range"
                />
              </div>
            </div>

            <div className="clean-bill-receipt">
              <div className="clean-receipt-header">
                <h3>Payslip Breakdown</h3>
                <span className="clean-receipt-badge">TRAIN LAW 2026</span>
              </div>

              <div className="clean-receipt-rows">
                <div className="clean-receipt-row">
                  <span>Gross Pay</span>
                  <span>₱{payroll.grossPay.toFixed(2)}</span>
                </div>
                {payroll.lateDeduction > 0 && (
                  <div className="clean-receipt-row clean-receipt-row--penalty">
                    <span>Tardiness Deduction</span>
                    <span>-₱{payroll.lateDeduction.toFixed(2)}</span>
                  </div>
                )}
                {payroll.otEarning > 0 && (
                  <div className="clean-receipt-row">
                    <span>Overtime Premium</span>
                    <span>+₱{payroll.otEarning.toFixed(2)}</span>
                  </div>
                )}
                {payroll.nightDiffEarning > 0 && (
                  <div className="clean-receipt-row">
                    <span>Night Shift Diff</span>
                    <span>+₱{payroll.nightDiffEarning.toFixed(2)}</span>
                  </div>
                )}
                <div className="clean-receipt-divider" />
                <div className="clean-receipt-row">
                  <span>SSS EE Contribution (5%)</span>
                  <span>-₱{payroll.sssEe.toFixed(2)}</span>
                </div>
                <div className="clean-receipt-row">
                  <span>PhilHealth EE (2.5%)</span>
                  <span>-₱{payroll.philHealthEe.toFixed(2)}</span>
                </div>
                <div className="clean-receipt-row">
                  <span>Pag-IBIG HDMF EE</span>
                  <span>-₱{payroll.pagIbigEe.toFixed(2)}</span>
                </div>
                <div className="clean-receipt-row clean-receipt-row--penalty">
                  <span>BIR Withholding Tax</span>
                  <span>-₱{payroll.withholdingTax.toFixed(2)}</span>
                </div>
                <div className="clean-receipt-divider" />
                <div className="clean-receipt-total">
                  <span>Net Take-Home Pay</span>
                  <span>₱{payroll.netTakeHome.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SET PIECE 3: Interactive DTR State-Machine */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">Attendance DTR State-Machine Simulator</h2>
            <p className="clean-section__subtitle">
              Test how timecard adjustment requests, supervisor approvals, and audit trail rollbacks are committed to immutable database logs.
            </p>
          </div>

          <div style={{ border: "1px solid var(--line)", borderRadius: "16px", padding: "1.5rem", background: "var(--paper)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase" }}>CURRENT TIMECARD STATE</span>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, marginTop: "0.2rem" }}>
                  Late Penalty: <span style={{ color: dtrState.currentLate > 0 ? "#ef4444" : "var(--accent-bright)" }}>{dtrState.currentLate} mins</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  className="editorial-btn editorial-btn--ghost"
                  onClick={() => handleDtrAction("REQUEST")}
                  disabled={dtrState.adjustmentStatus === "PENDING" || dtrState.adjustmentStatus === "APPROVED"}
                >
                  1. Request Adjustment
                </button>
                <button
                  type="button"
                  className="editorial-btn editorial-btn--primary"
                  onClick={() => handleDtrAction("APPROVE")}
                  disabled={dtrState.adjustmentStatus !== "PENDING"}
                >
                  2. Supervisor Approve
                </button>
                <button
                  type="button"
                  className="editorial-btn editorial-btn--ghost"
                  style={{ color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" }}
                  onClick={() => handleDtrAction("REVERT")}
                  disabled={dtrState.adjustmentStatus !== "APPROVED"}
                >
                  3. ACID Revert Snapshot
                </button>
              </div>
            </div>

            {dtrState.history.length > 0 && (
              <div style={{ marginTop: "1.25rem", borderTop: "1px solid var(--line)", paddingTop: "1rem" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--muted)", marginBottom: "0.5rem" }}>
                  TRANSACTION AUDIT LOG (att_dtr_status_history):
                </div>
                {dtrState.history.map((h, i) => (
                  <div key={i} style={{ fontSize: "0.8rem", fontFamily: "monospace", color: "var(--ink)", padding: "0.25rem 0" }}>
                    • [{h.time}] {h.action} — <em>"{h.note}"</em>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Code Architecture */}
        <section className="clean-section">
          <div className="clean-section__head">
            <h2 className="clean-section__title">ACID Transaction Procedure Implementation</h2>
          </div>

          <div className="clean-code-box">
            <div className="clean-code-box__header">
              <span>dtr-adjustment.api.ts</span>
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
          <a href="/works/lgu-water" className="editorial-btn editorial-btn--ghost">
            <span>← Previous: LGU Water District</span>
          </a>
          <a href="/works/cc-wedding" className="editorial-btn editorial-btn--primary">
            <span>Next: CC Wedding Platform →</span>
          </a>
        </footer>

      </main>
      <Footer />
    </>
  );
}
