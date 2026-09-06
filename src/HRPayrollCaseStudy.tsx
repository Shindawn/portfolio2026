import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer, Navigation } from "./Sections";

gsap.registerPlugin(ScrollTrigger);

const roleMatrixData = [
  {
    role: "System Administrator",
    responsibility: "User accounts, global permissions, system configuration, audit log supervision",
    access: "Full System & Database Configuration",
    scope: "Super Admin",
  },
  {
    role: "HR Administrator",
    responsibility: "Employee profiles, employment records, onboarding, leave administration, HR documentation",
    access: "Workforce Records, Leave & Contracts",
    scope: "Departmental",
  },
  {
    role: "Payroll Officer",
    responsibility: "Payroll periods, salary inputs, allowances, deductions, statutory withholdings, payroll processing",
    access: "Financial Compensation & Disbursement",
    scope: "Payroll Engine",
  },
  {
    role: "Manager / Supervisor",
    responsibility: "Direct team attendance monitoring, overtime reviews, leave request approvals",
    access: "Assigned Team / Department Data",
    scope: "Managerial",
  },
  {
    role: "Employee",
    responsibility: "Personal profile review, daily attendance logs, leave applications, digital payslip inspection",
    access: "Self-Service Portal Only",
    scope: "Individual",
  },
];

const lifecycleSteps = [
  { step: "01", name: "Employee Creation", desc: "Profile instantiation" },
  { step: "02", name: "Onboarding", desc: "Credentials & statutory tax IDs" },
  { step: "03", name: "Employment Assignment", desc: "Department, rank & rate grade" },
  { step: "04", name: "Attendance & DTR", desc: "Biometric timestamp capture" },
  { step: "05", name: "Leave Management", desc: "Paid time-off reconciliation" },
  { step: "06", name: "Compensation", desc: "Recurring allowances & adjustments" },
  { step: "07", name: "Payroll Computation", desc: "Gross-to-net calculation engine" },
  { step: "08", name: "Employee Records", desc: "Historical payroll ledgers" },
  { step: "09", name: "Status Changes", desc: "Promotions, transfers & offboarding" },
];

const payrollSteps = [
  { num: "01", title: "Select Payroll Period", desc: "Define bi-monthly cutoff dates and target payment release cycle." },
  { num: "02", title: "Retrieve Eligible Employees", desc: "Query active employment records filtering out inactive staff." },
  { num: "03", title: "Load Compensation Information", desc: "Pull verified monthly base salary grades and hourly conversion tables." },
  { num: "04", title: "Add Applicable Allowances", desc: "Calculate recurring de minimis, transport, and holiday premiums." },
  { num: "05", title: "Apply Deductions", desc: "Compute tardiness, undertime penalties, and company loan amortizations." },
  { num: "06", title: "Review Payroll Breakdown", desc: "Inspect preliminary gross-to-net ledger across all departments." },
  { num: "07", title: "Validate Records", desc: "Automated integrity checks ensuring zero negative take-home anomalies." },
  { num: "08", title: "Finalize Payroll", desc: "Commit ACID transactional batch locks and generate treasury payout files." },
  { num: "09", title: "Generate Payslips & Reports", desc: "Issue encrypted employee payslips and export bank disbursement CSVs." },
];

const challengesData = [
  {
    num: "01",
    title: "Connecting HR Information to Payroll Processes",
    problem: "In traditional legacy systems, HR employee files and payroll computation exist in disconnected spreadsheets, requiring error-prone manual re-entry every cutoff.",
    solution: "Designed a centralized relational schema where the payroll engine dynamically references live employee master records, salary grades, and biometric DTR logs without duplication.",
  },
  {
    num: "02",
    title: "Managing Large Amounts of Employee Data",
    problem: "Displaying personal IDs, contracts, biometric logs, tax tables, leave balances, and salary history in one monolithic screen overwhelmed administrative staff.",
    solution: "Architected a contextual tabbed profile layout allowing HR clerks to drill down into specific record modules with sticky contextual headers and instant search.",
  },
  {
    num: "03",
    title: "Handling Different System Responsibilities",
    problem: "Exposing salary numbers to department managers or allowing HR clerks to modify payroll formulas risks compliance violations and confidentiality leaks.",
    solution: "Engineered strict Role-Based Access Control (RBAC) separating operational daily entry, team approvals, payroll computation, and global system configuration into isolated views.",
  },
  {
    num: "04",
    title: "Preventing Accidental Payroll Changes",
    problem: "Modifying biometric attendance logs or salary rates during an active payroll computation run can invalidate the entire batch disbursement.",
    solution: "Implemented transactional database snapshot locks (`SERIALIZABLE` isolation) with mandatory supervisor remarks and automated audit trails (`att_dtr_status_history`).",
  },
];

export default function HRPayrollCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "HRIS & Payroll Management System — Enterprise Case Study";
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".e-hero__left", {
        opacity: 0,
        x: -24,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".e-hero-dashboard-stack", {
        opacity: 0,
        y: 32,
        duration: 1.0,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".e-animate-section").forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: {
            trigger: sec,
            start: "top 82%",
          },
          opacity: 0,
          y: 36,
          duration: 0.9,
          ease: "power3.out",
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navigation />
      <main ref={pageRef} className="hris-enterprise" id="main-content">
        
        {/* =========================================================================
            01. HERO — ENTERPRISE SYSTEM OVERVIEW
           ========================================================================= */}
        <section className="e-hero">
          <div className="e-container">
            
            {/* Confidentiality Notice */}
            <div className="e-confidential-banner">
              <span>🔒</span>
              <span>
                <strong>Confidential Corporate Client:</strong> Certain information, names, records, and interface content shown in this case study have been modified or replaced with sample data to protect client confidentiality.
              </span>
            </div>

            <div className="e-hero-grid">
              
              {/* Left: Eyebrow, Title & Metadata */}
              <div className="e-hero__left">
                <div className="e-eyebrow">
                  <span className="e-eyebrow__pulse" />
                  <span>CORPORATE HR TECHNOLOGY</span>
                </div>

                <h1 className="e-heading-lg">
                  HRIS & Payroll Management System
                </h1>

                <p className="e-lead">
                  An integrated platform designed to centralize employee records, HR operations, payroll processing, attendance, leave, and workforce administration.
                </p>

                <div className="e-hero-meta-grid">
                  <div className="e-hero-meta-item">
                    <span>Client</span>
                    <strong>Confidential Corporate Client</strong>
                  </div>
                  <div className="e-hero-meta-item">
                    <span>Platform</span>
                    <strong>Web Application (Enterprise SaaS)</strong>
                  </div>
                  <div className="e-hero-meta-item">
                    <span>Project Type</span>
                    <strong>Enterprise HRIS & Payroll Engine</strong>
                  </div>
                  <div className="e-hero-meta-item">
                    <span>Role</span>
                    <strong>Lead Frontend Architect & UI/UX Designer</strong>
                  </div>
                </div>
              </div>

              {/* Right: Layered Enterprise Dashboard Composition */}
              <div className="e-hero-dashboard-stack">
                <div className="e-dashboard-window">
                  <div className="e-window-header">
                    <div className="e-window-dots">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span>ENTERPRISE WORKFORCE HUB · PERIOD #2026-08B</span>
                    <span style={{ color: "#34d399", fontWeight: 700 }}>● PRODUCTION</span>
                  </div>

                  <div className="e-window-stats">
                    <div className="e-window-stat-box">
                      <span>ACTIVE HEADCOUNT</span>
                      <strong>1,248</strong>
                    </div>
                    <div className="e-window-stat-box">
                      <span>GROSS PAYROLL</span>
                      <strong>₱38.4M</strong>
                    </div>
                    <div className="e-window-stat-box">
                      <span>COMPLIANCE STATUS</span>
                      <strong style={{ color: "#34d399" }}>100% ACID</strong>
                    </div>
                  </div>

                  {/* High Density Table Excerpt */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "1rem", fontSize: "0.82rem", fontFamily: "var(--e-mono)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>
                      <span>EMPLOYEE NAME</span>
                      <span>DEPT</span>
                      <span>GROSS</span>
                      <span>NET PAY</span>
                      <span>STATUS</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "0.35rem 0" }}>
                      <span>S. Alcantara (SR-409)</span>
                      <span style={{ color: "#94a3b8" }}>ENG</span>
                      <span>₱85,000.00</span>
                      <span style={{ color: "#34d399" }}>₱68,412.50</span>
                      <span style={{ color: "#38bdf8" }}>[APPROVED]</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "0.35rem 0" }}>
                      <span>M. Valderrama (HR-102)</span>
                      <span style={{ color: "#94a3b8" }}>OPS</span>
                      <span>₱62,000.00</span>
                      <span style={{ color: "#34d399" }}>₱51,280.00</span>
                      <span style={{ color: "#38bdf8" }}>[APPROVED]</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            02. SECTION 02 — THE BUSINESS CHALLENGE
           ========================================================================= */}
        <section className="e-section e-animate-section">
          <div className="e-container">
            <div style={{ maxWidth: "820px" }}>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>SYSTEM DEPENDENCIES</span>
              </div>
              <h2 className="e-heading-lg">
                Payroll does not exist in isolation.
              </h2>
              <p className="e-lead">
                Payroll accuracy depends on continuous data feeds from multiple operational HR processes. The platform needed to centralize these records while ensuring strict authorization guards.
              </p>
            </div>

            {/* Dependency Diagram */}
            <div className="e-dependency-cluster">
              <div className="e-dep-tags-grid">
                {[
                  "Employee Information",
                  "Employment Status",
                  "Salary Rates",
                  "Attendance Logs",
                  "Overtime Premiums",
                  "Leave Adjustments",
                  "Allowances",
                  "Deductions",
                  "Government Contributions",
                  "Withholding Tax",
                  "Payroll Period",
                  "Payslip Generation",
                ].map((tag) => (
                  <div key={tag} className="e-dep-chip">
                    ➔ {tag}
                  </div>
                ))}
              </div>

              <div className="e-dep-hub">
                <span>CONVERGES AT</span>
                <strong>PAYROLL ENGINE</strong>
                <p style={{ fontSize: "0.82rem", opacity: 0.8, marginTop: "0.5rem" }}>
                  Automated Gross-to-Net Computation in &lt;140ms
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            03. SECTION 03 — WHO USES THE SYSTEM? (ROLE MATRIX)
           ========================================================================= */}
        <section className="e-section e-section--alt e-animate-section">
          <div className="e-container">
            <div>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>ENTERPRISE GOVERNANCE</span>
              </div>
              <h2 className="e-heading-md">Who Uses the System?</h2>
              <p className="e-lead">
                A formal role-based access matrix mapping user responsibilities, operational boundaries, and system permissions.
              </p>
            </div>

            <div className="e-matrix-wrap">
              <table className="e-matrix-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Primary Responsibility</th>
                    <th>System Access</th>
                    <th>Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {roleMatrixData.map((row) => (
                    <tr key={row.role}>
                      <td>
                        <span className="e-role-badge">{row.role}</span>
                      </td>
                      <td style={{ color: "var(--ink)", fontWeight: 500 }}>{row.responsibility}</td>
                      <td style={{ color: "var(--muted)", fontFamily: "var(--e-mono)", fontSize: "0.84rem" }}>{row.access}</td>
                      <td>
                        <strong style={{ fontSize: "0.84rem", color: "var(--e-indigo)" }}>{row.scope}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* =========================================================================
            04. SECTION 04 — THE EMPLOYEE LIFECYCLE
           ========================================================================= */}
        <section className="e-section e-animate-section">
          <div className="e-container">
            <div>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>WORKFORCE LIFECYCLE</span>
              </div>
              <h2 className="e-heading-md">The Employee Lifecycle</h2>
              <p className="e-lead">
                The employee profile acts as the central reference point throughout onboarding, active attendance, salary progression, and historical audits.
              </p>
            </div>

            {/* Horizontal Lifecycle Bar */}
            <div className="e-lifecycle-track">
              {lifecycleSteps.map((step) => (
                <div key={step.step} className="e-lifecycle-node">
                  <span className="e-lifecycle-node__num">{step.step}</span>
                  <strong style={{ fontSize: "0.88rem", color: "var(--ink)" }}>{step.name}</strong>
                  <span style={{ fontSize: "0.74rem", color: "var(--muted)" }}>{step.desc}</span>
                </div>
              ))}
            </div>

            {/* Annotated Profile View */}
            <div style={{ border: "1px solid var(--line)", borderRadius: "18px", padding: "2.25rem", background: "var(--paper)", boxShadow: "0 12px 36px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--line)", paddingBottom: "1.5rem" }}>
                <div>
                  <span style={{ fontFamily: "var(--e-mono)", fontSize: "0.75rem", color: "var(--e-indigo)", fontWeight: 700 }}>
                    EMP ID: #CORP-2026-084 · ACTIVE STATUS
                  </span>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "0.3rem 0 0.2rem", color: "var(--ink)" }}>
                    Danilo M. Santos
                  </h3>
                  <span style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
                    Senior Systems Engineer · Infrastructure & DevOps Department
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <span style={{ padding: "0.35rem 0.8rem", borderRadius: "6px", background: "rgba(5, 150, 105, 0.1)", color: "var(--e-emerald)", fontWeight: 700, fontSize: "0.78rem" }}>
                    ● REGULAR EMPLOYMENT
                  </span>
                  <span style={{ padding: "0.35rem 0.8rem", borderRadius: "6px", background: "rgba(79, 70, 229, 0.1)", color: "var(--e-indigo)", fontWeight: 700, fontSize: "0.78rem" }}>
                    SALARY GRADE: SG-18
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginTop: "1.5rem", fontSize: "0.88rem" }}>
                <div>
                  <span style={{ color: "var(--muted)", display: "block", fontSize: "0.76rem" }}>MONTHLY BASE SALARY</span>
                  <strong style={{ color: "var(--ink)", fontFamily: "var(--e-mono)", fontSize: "1.1rem" }}>₱92,500.00</strong>
                </div>
                <div>
                  <span style={{ color: "var(--muted)", display: "block", fontSize: "0.76rem" }}>STATUTORY TAX CODE</span>
                  <strong style={{ color: "var(--ink)", fontFamily: "var(--e-mono)" }}>TRAIN LAW (M-0)</strong>
                </div>
                <div>
                  <span style={{ color: "var(--muted)", display: "block", fontSize: "0.76rem" }}>LEAVE CREDIT BALANCE</span>
                  <strong style={{ color: "var(--ink)", fontFamily: "var(--e-mono)" }}>14.5 VL / 12.0 SL</strong>
                </div>
                <div>
                  <span style={{ color: "var(--muted)", display: "block", fontSize: "0.76rem" }}>BIOMETRIC TERMINAL ID</span>
                  <strong style={{ color: "var(--ink)", fontFamily: "var(--e-mono)" }}>DEV-BIO-04 (HQ FLOOR 3)</strong>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            05. SECTION 05 — ORGANIZING COMPLEX EMPLOYEE DATA
           ========================================================================= */}
        <section className="e-section e-section--alt e-animate-section">
          <div className="e-container">
            <div style={{ maxWidth: "800px" }}>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>INFORMATION ARCHITECTURE</span>
              </div>
              <h2 className="e-heading-md">Organizing Complex Employee Data</h2>
              <p className="e-lead">
                Employee records can quickly become overwhelming when presented as one monolithic form. The interface organizes information into contextual sections so users access records without noise.
              </p>
            </div>

            {/* Tabbed Profile UI Simulation */}
            <div className="e-profile-tab-mock">
              <div className="e-profile-tabs-header">
                <button type="button" className="e-profile-tab-btn is-active">Overview</button>
                <button type="button" className="e-profile-tab-btn">Personal Information</button>
                <button type="button" className="e-profile-tab-btn">Employment</button>
                <button type="button" className="e-profile-tab-btn">Attendance</button>
                <button type="button" className="e-profile-tab-btn">Leave</button>
                <button type="button" className="e-profile-tab-btn">Compensation</button>
                <button type="button" className="e-profile-tab-btn">Payroll</button>
                <button type="button" className="e-profile-tab-btn">Documents</button>
              </div>

              <div className="e-profile-tab-body">
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 1rem", color: "var(--ink)" }}>
                    Employment Contract & Role Parameters
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem", color: "var(--muted)" }}>
                    <div><strong>Department:</strong> Corporate Engineering</div>
                    <div><strong>Designation:</strong> Lead Cloud Infrastructure Architect</div>
                    <div><strong>Date Hired:</strong> January 15, 2022 (4 years tenure)</div>
                    <div><strong>Shift Schedule:</strong> Flexible Core (09:00 - 18:00)</div>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 1rem", color: "var(--ink)" }}>
                    Statutory & Tax Configurations
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.9rem", color: "var(--muted)" }}>
                    <div><strong>SSS Number:</strong> 34-8891023-4</div>
                    <div><strong>PhilHealth PIN:</strong> 19-029384910-2</div>
                    <div><strong>Pag-IBIG MID:</strong> 1210-9948-2831</div>
                    <div><strong>TIN Number:</strong> 482-190-281-000</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            06. SECTION 06 — FROM ATTENDANCE TO PAYROLL
           ========================================================================= */}
        <section className="e-section e-animate-section">
          <div className="e-container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3rem" }}>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>INTEGRATED WORKFLOW</span>
              </div>
              <h2 className="e-heading-md">From Attendance to Payroll</h2>
              <p className="e-lead">
                Demonstrating how daily biometric timekeeping transitions seamlessly through overtime auditing, leave deduction, and automated payroll finalization.
              </p>
            </div>

            <div className="e-equation-strip">
              <span className="e-equation-block">Attendance / Timekeeping</span>
              <span className="e-equation-op">↓</span>
              <span className="e-equation-block">Working Days & Hours</span>
              <span className="e-equation-op">↓</span>
              <span className="e-equation-block">Overtime & Premiums</span>
              <span className="e-equation-op">↓</span>
              <span className="e-equation-block">Leave Adjustments</span>
              <span className="e-equation-op">↓</span>
              <span className="e-equation-block">Payroll Inputs</span>
              <span className="e-equation-op">↓</span>
              <span className="e-equation-block">Payroll Computation</span>
              <span className="e-equation-op">↓</span>
              <span className="e-equation-block">Review & Approval</span>
              <span className="e-equation-op">↓</span>
              <span className="e-equation-block e-equation-block--net">Finalized Payslip</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            07. SECTION 07 — INSIDE THE PAYROLL PROCESS
           ========================================================================= */}
        <section className="e-section e-section--alt e-animate-section">
          <div className="e-container">
            <div>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>EXECUTION PIPELINE</span>
              </div>
              <h2 className="e-heading-md">Inside the Payroll Process</h2>
              <p className="e-lead">
                A 9-step structured pipeline ensuring absolute mathematical integrity and statutory compliance prior to bank disbursement.
              </p>
            </div>

            <div className="e-process-timeline-grid">
              
              {/* Left: Step-by-Step Vertical Process Timeline */}
              <div className="e-timeline-col">
                {payrollSteps.map((s) => (
                  <div key={s.num} className="e-timeline-step-card">
                    <span className="e-timeline-step-num">{s.num}</span>
                    <div>
                      <strong style={{ fontSize: "0.95rem", color: "var(--ink)", display: "block" }}>{s.title}</strong>
                      <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Real System Calculation Summary */}
              <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "18px", padding: "2.25rem", boxShadow: "0 16px 45px rgba(0,0,0,0.05)" }}>
                <span style={{ fontFamily: "var(--e-mono)", fontSize: "0.75rem", fontWeight: 800, color: "var(--e-indigo)", textTransform: "uppercase" }}>
                  PAYROLL COMPUTATION LEDGER SUMMARY
                </span>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 800, margin: "0.5rem 0 1.25rem", color: "var(--ink)" }}>
                  Semi-Monthly Batch Payout Breakdown
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.92rem", color: "var(--ink)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Total Eligible Headcount:</span>
                    <strong style={{ fontFamily: "var(--e-mono)" }}>1,248 Staff</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Gross Base Salaries:</span>
                    <strong style={{ fontFamily: "var(--e-mono)" }}>₱34,200,000.00</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Total Overtime & Holiday Pay:</span>
                    <strong style={{ fontFamily: "var(--e-mono)", color: "var(--e-emerald)" }}>+₱4,280,000.00</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Statutory SSS / PH / HDMF Withholdings:</span>
                    <strong style={{ fontFamily: "var(--e-mono)", color: "#ef4444" }}>-₱3,180,000.00</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>BIR Withholding Income Tax:</span>
                    <strong style={{ fontFamily: "var(--e-mono)", color: "#ef4444" }}>-₱4,820,000.00</strong>
                  </div>
                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: "0.85rem", display: "flex", justifyContent: "space-between", fontSize: "1.1rem" }}>
                    <strong>Net Bank Disbursement:</strong>
                    <strong style={{ fontFamily: "var(--e-mono)", color: "var(--e-emerald)" }}>₱30,480,000.00</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            08. SECTION 08 — UNDERSTANDING THE PAYROLL BREAKDOWN
           ========================================================================= */}
        <section className="e-section e-animate-section">
          <div className="e-container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>MATHEMATICAL SPECIFICATION</span>
              </div>
              <h2 className="e-heading-md">Understanding the Payroll Breakdown</h2>
            </div>

            {/* Payroll Equation Visualization */}
            <div className="e-equation-strip">
              <span className="e-equation-block">Basic Salary</span>
              <span className="e-equation-op">+</span>
              <span className="e-equation-block">Allowances</span>
              <span className="e-equation-op">+</span>
              <span className="e-equation-block">Overtime Pay</span>
              <span className="e-equation-op">−</span>
              <span className="e-equation-block">Deductions</span>
              <span className="e-equation-op">−</span>
              <span className="e-equation-block">Govt Contributions (SSS/PH/HDMF)</span>
              <span className="e-equation-op">−</span>
              <span className="e-equation-block">Withholding Tax</span>
              <span className="e-equation-op">=</span>
              <span className="e-equation-block e-equation-block--net">Net Take-Home Pay</span>
            </div>

            <div style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--muted)", maxWidth: "680px", margin: "0 auto" }}>
              ℹ️ <em>Payroll logic shown in this case study reflects only functionality implemented within the actual enterprise system according to statutory TRAIN law regulations and client parameters.</em>
            </div>
          </div>
        </section>

        {/* =========================================================================
            09. SECTION 09 — MANAGING SENSITIVE INFORMATION (RBAC)
           ========================================================================= */}
        <section className="e-section e-section--alt e-animate-section">
          <div className="e-container">
            <div style={{ maxWidth: "800px" }}>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>PRIVACY & SECURITY</span>
              </div>
              <h2 className="e-heading-lg">
                Not every user should see every record.
              </h2>
              <p className="e-lead">
                Employee compensation and personal files require strictly controlled visibility. Workflows were partitioned by role to prevent unauthorized data exposure.
              </p>
            </div>

            {/* Layered RBAC Rows */}
            <div className="e-rbac-layers">
              <div className="e-rbac-layer-row">
                <span className="e-role-badge">Employee</span>
                <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                  Personal attendance timestamps, leave balances, individual digital payslips.
                </span>
              </div>
              <div className="e-rbac-layer-row">
                <span className="e-role-badge">Manager / Supervisor</span>
                <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                  Assigned team roster, shift scheduling, overtime approvals, leave request queues.
                </span>
              </div>
              <div className="e-rbac-layer-row">
                <span className="e-role-badge">HR Administrator</span>
                <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                  Full employee lifecycle records, contracts, onboarding files, company policies.
                </span>
              </div>
              <div className="e-rbac-layer-row">
                <span className="e-role-badge">Payroll Officer</span>
                <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                  Salary compensation rates, tax exemptions, deductions, gross-to-net computation.
                </span>
              </div>
              <div className="e-rbac-layer-row">
                <span className="e-role-badge">System Administrator</span>
                <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                  Global user provisioning, database configuration, security audit trail monitoring.
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            10. SECTION 10 — DESIGNING FOR HIGH-DENSITY WORKFLOWS
           ========================================================================= */}
        <section className="e-section e-animate-section">
          <div className="e-container">
            <div>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>ENTERPRISE UX PRINCIPLES</span>
              </div>
              <h2 className="e-heading-md">Designing for High-Density Workflows</h2>
              <p className="e-lead">
                Four core design standards guiding the construction of complex tabular layouts, multi-field filters, and rapid keyboard entry.
              </p>
            </div>

            <div className="e-dense-ux-grid">
              <div className="e-dense-ux-card">
                <strong>Scanability</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
                  Important financial values, status badges, and employee IDs remain immediately legible within tables containing 50+ columns.
                </p>
              </div>

              <div className="e-dense-ux-card">
                <strong>Consistency</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
                  Action buttons, date filters, pagination controls, and modal confirmations behave identically across all 12 platform modules.
                </p>
              </div>

              <div className="e-dense-ux-card">
                <strong>Validation</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
                  Business-critical forms enforce real-time input masking, preventing missing TINs, invalid hourly rates, or negative pay calculations.
                </p>
              </div>

              <div className="e-dense-ux-card">
                <strong>Context</strong>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", margin: 0 }}>
                  Persistent breadcrumbs and sticky headers ensure operators always understand which department and payroll period they are working in.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            11. SECTION 11 — REPORTING & OUTPUTS
           ========================================================================= */}
        <section className="e-section e-section--alt e-animate-section">
          <div className="e-container">
            <div style={{ maxWidth: "800px", marginBottom: "3rem" }}>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>AUDIT & EXPORTS</span>
              </div>
              <h2 className="e-heading-md">Reporting & Regulatory Outputs</h2>
              <p className="e-lead">
                Automating the generation of compliant fiscal reports, banking payroll files, and individual employee payslips.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
              <div style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1.75rem", background: "var(--paper)" }}>
                <strong style={{ fontSize: "1.1rem", color: "var(--ink)", display: "block", marginBottom: "0.4rem" }}>
                  📊 Payroll Master Summaries
                </strong>
                <span style={{ fontSize: "0.86rem", color: "var(--muted)" }}>
                  Department-by-department payroll cost distribution with variance analysis compared to prior cutoffs.
                </span>
              </div>

              <div style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1.75rem", background: "var(--paper)" }}>
                <strong style={{ fontSize: "1.1rem", color: "var(--ink)", display: "block", marginBottom: "0.4rem" }}>
                  🏦 Bank Disbursement CSVs
                </strong>
                <span style={{ fontSize: "0.86rem", color: "var(--muted)" }}>
                  Automated generation of encrypted batch disbursement files formatted for major commercial banks.
                </span>
              </div>

              <div style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1.75rem", background: "var(--paper)" }}>
                <strong style={{ fontSize: "1.1rem", color: "var(--ink)", display: "block", marginBottom: "0.4rem" }}>
                  📑 Statutory Contribution Schedules
                </strong>
                <span style={{ fontSize: "0.86rem", color: "var(--muted)" }}>
                  Formatted schedules for SSS R-3, PhilHealth RF-1, and Pag-IBIG monthly contribution remittance.
                </span>
              </div>

              <div style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1.75rem", background: "var(--paper)" }}>
                <strong style={{ fontSize: "1.1rem", color: "var(--ink)", display: "block", marginBottom: "0.4rem" }}>
                  ✉️ Digital Encrypted Payslips
                </strong>
                <span style={{ fontSize: "0.86rem", color: "var(--muted)" }}>
                  Password-protected itemized payslips automatically distributed to employee self-service portals.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            12. SECTION 12 — PRODUCT CHALLENGES
           ========================================================================= */}
        <section className="e-section e-animate-section">
          <div className="e-container">
            <div>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>TECHNICAL & PRODUCT RESOLUTIONS</span>
              </div>
              <h2 className="e-heading-md">Product Challenges & Solutions</h2>
              <p className="e-lead">
                Solving enterprise friction through relational rigor and defensive frontend architecture.
              </p>
            </div>

            <div className="e-challenges-stack">
              {challengesData.map((c) => (
                <div key={c.num} className="e-challenge-box">
                  <div className="e-challenge-box__left">
                    <span style={{ fontFamily: "var(--e-mono)", fontSize: "0.74rem", fontWeight: 800, color: "var(--e-indigo)", textTransform: "uppercase" }}>
                      CHALLENGE {c.num}
                    </span>
                    <strong style={{ fontSize: "1.2rem", color: "var(--ink)" }}>{c.title}</strong>
                    <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0.4rem 0 0", lineHeight: 1.6 }}>
                      {c.problem}
                    </p>
                  </div>
                  <div className="e-challenge-box__right">
                    <strong style={{ display: "block", color: "var(--ink)", marginBottom: "0.4rem" }}>
                      Engineered Solution:
                    </strong>
                    {c.solution}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            13. SECTION 13 — FINAL PRODUCT SHOWCASE
           ========================================================================= */}
        <section className="e-section e-section--alt e-animate-section">
          <div className="e-container--wide">
            <div style={{ maxWidth: "800px", margin: "0 auto 3.5rem", textAlign: "center" }}>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>COMPLETE ENTERPRISE SUITE</span>
              </div>
              <h2 className="e-heading-md">Final Product Showcase</h2>
              <p className="e-lead">
                A unified B2B platform spanning workforce directory, automated attendance synchronization, compensation modeling, and statutory reporting.
              </p>
            </div>

            {/* Mosaic Exhibition */}
            <div className="e-showcase-mosaic">
              <div className="e-mosaic-large" style={{ padding: "2rem", background: "var(--e-slate-900)", color: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
                  <span style={{ fontFamily: "var(--e-mono)", fontSize: "0.78rem", color: "#818cf8", fontWeight: 700 }}>
                    ENTERPRISE PAYROLL PROCESSING SUITE
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>CONFIDENTIAL CORPORATE CLIENT</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase" }}>MODULE</span>
                    <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "0.2rem" }}>Payroll Master Table</strong>
                    <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>50-column audited calculation engine</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase" }}>MODULE</span>
                    <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "0.2rem" }}>Biometric DTR Engine</strong>
                    <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>Real-time terminal log reconciliation</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase" }}>MODULE</span>
                    <strong style={{ display: "block", fontSize: "1.1rem", marginTop: "0.2rem" }}>Statutory Compliance</strong>
                    <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>TRAIN law & 2026 SSS tables</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            FINAL — WHAT I TOOK FROM THE PROJECT
           ========================================================================= */}
        <section className="e-section">
          <div className="e-container--narrow">
            <div style={{ textAlign: "center" }}>
              <div className="e-eyebrow">
                <span className="e-eyebrow__pulse" />
                <span>PROFESSIONAL GROWTH</span>
              </div>
              <h2 className="e-heading-lg" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}>
                Building for business-critical workflows
              </h2>
            </div>

            <div style={{ fontSize: "1.08rem", color: "var(--muted)", lineHeight: 1.75, margin: "2rem 0", textAlign: "center" }}>
              <p>
                Working on the HRIS and payroll platform strengthened my understanding of enterprise application design, where interface decisions are closely connected to business rules, permissions, data relationships, and real operational processes.
              </p>
            </div>

            <div className="e-takeaways-tags">
              <span className="e-takeaway-tag">Enterprise UX</span>
              <span className="e-takeaway-tag">Complex Administrative Workflows</span>
              <span className="e-takeaway-tag">Role-Based Interfaces</span>
              <span className="e-takeaway-tag">Relational Data</span>
              <span className="e-takeaway-tag">Payroll Process Design</span>
              <span className="e-takeaway-tag">Client-Driven Development</span>
              <span className="e-takeaway-tag">Form & Table Usability</span>
              <span className="e-takeaway-tag">System Consistency</span>
            </div>

            <div style={{ textAlign: "center", fontSize: "0.84rem", color: "var(--muted)", borderTop: "1px solid var(--line)", paddingTop: "2rem" }}>
              <strong>Confidential Corporate Client</strong> · <em>Certain information shown has been modified for portfolio presentation.</em>
            </div>

            {/* Subtle Navigation */}
            <footer className="e-footer-nav">
              <a href="/works/lgu-water" className="editorial-btn editorial-btn--ghost">
                <span>← Previous: LGU Water District</span>
              </a>
              <a href="/works/cc-wedding" className="editorial-btn editorial-btn--primary">
                <span>Next Case Study: CC Wedding →</span>
              </a>
            </footer>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
