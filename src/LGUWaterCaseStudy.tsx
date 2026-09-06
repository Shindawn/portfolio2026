import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer, Navigation } from "./Sections";

gsap.registerPlugin(ScrollTrigger);

const workflowNodes = [
  { step: "01", label: "Customer", desc: "Master resident profile" },
  { step: "02", label: "Service Application", desc: "New line request" },
  { step: "03", label: "Approval", desc: "Municipal validation" },
  { step: "04", label: "Service Account", desc: "Active connection ID" },
  { step: "05", label: "Meter Assignment", desc: "Hardware serial link" },
  { step: "06", label: "Meter Reading", desc: "Mobile field capture" },
  { step: "07", label: "Billing", desc: "Tiered volumetric tariff" },
  { step: "08", label: "Payment", desc: "Cashier / online receipt" },
  { step: "09", label: "Transaction History", desc: "Auditable ledger" },
];

const ecosystemClusters = [
  {
    category: "Customer & Service Operations",
    tag: "CONSUMER LIFECYCLE",
    modules: [
      { name: "Customer Master Management", scope: "Single identity source" },
      { name: "Service Applications", scope: "Document intake & status" },
      { name: "Service Accounts", scope: "Account number & rate class" },
      { name: "Meter Management", scope: "Serial registry & maintenance" },
    ],
  },
  {
    category: "Billing Operations",
    tag: "FINANCIAL PIPELINE",
    modules: [
      { name: "Mobile Meter Reading", scope: "Field sync & anomaly gate" },
      { name: "Progressive Tariff Engine", scope: "4-tier volumetric compute" },
      { name: "Billing Statements", scope: "Batch generation & SMS alerts" },
      { name: "Cashier Payments & Receipts", scope: "Collection reconciliation" },
      { name: "Ledger & Transactions", scope: "Account balance history" },
    ],
  },
  {
    category: "Administration",
    tag: "GOVERNANCE & AUDIT",
    modules: [
      { name: "Executive Reports", scope: "NRW & revenue analytics" },
      { name: "Employee Management", scope: "Role-based authorization" },
      { name: "System Administration", scope: "Tariff schedules & zone map" },
    ],
  },
];

const mobileJourneyStages = [
  { num: "01", title: "Assigned Accounts", desc: "Field reader syncs designated district zone and street routes for offline entry." },
  { num: "02", title: "Select Customer", desc: "Instant search by account number, meter serial, or physical landmark." },
  { num: "03", title: "View Previous Reading", desc: "Contextual baseline display showing previous month's volume and consumption trend." },
  { num: "04", title: "Enter Current Reading", desc: "Large numeric keypad designed for rapid single-handed thumb input." },
  { num: "05", title: "Validate Consumption", desc: "Automated tripwire checks for negative deltas, stuck dials, or anomalous spikes (+300%)." },
  { num: "06", title: "Submit Reading", desc: "Instant visual feedback with photo attachment option for disputed dials." },
  { num: "07", title: "Recorded for Billing", desc: "Synchronized with central database and queued directly for tariff computation." },
];

const technicalChallenges = [
  {
    id: "01",
    title: "Duplicate Customer Records",
    problem: "When residents apply for an additional water connection or transfer locations, legacy systems create duplicate customer entries, splitting transaction histories.",
    solution: "Maintain customers as immutable master records and link every service application, account, and meter as related transactions under one central profile.",
  },
  {
    id: "02",
    title: "Multiple Interconnected Modules",
    problem: "Changes in customer status, tariff tables, or meter replacements ripple across billing, collections, and field dispatch.",
    solution: "Design modular workflows strictly bounded by database relational foreign keys and event-driven state updates across the operational lifecycle.",
  },
  {
    id: "03",
    title: "Different User Responsibilities",
    problem: "Cashiers, water maintenance engineers, meter readers, and municipal administrators require wildly different operational interfaces.",
    solution: "Separate high-speed daily employee operational actions (readings, cashier payments) from administrative configuration (tariffs, zone routes, audit logs).",
  },
  {
    id: "04",
    title: "Web & Mobile Coordination",
    problem: "Field meter readers operate in dead-zones with spotty cellular reception while billing clerks generate statements in real time.",
    solution: "Treat mobile meter reading as an integrated write-ahead cache within the same billing ecosystem rather than a standalone disconnected tool.",
  },
];

export default function LGUWaterCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "LGU Water Billing System — GovTech Case Study";
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".g-hero__left", {
        opacity: 0,
        x: -24,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".g-hero-composition", {
        opacity: 0,
        y: 32,
        duration: 1.0,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".g-animate-section").forEach((sec) => {
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
      <main ref={pageRef} className="lgu-govtech" id="main-content">
        
        {/* =========================================================================
            01. HERO SECTION — ASYMMETRIC PRODUCT HERO
           ========================================================================= */}
        <section className="g-hero">
          <div className="g-container">
            <div className="g-hero-grid">
              
              {/* Left Column: Title & Metadata */}
              <div className="g-hero__left">
                <div className="g-kicker">
                  <span className="g-kicker__dot" />
                  <span>GovTech · Municipal Enterprise Platform</span>
                </div>

                <h1 className="g-heading-lg">
                  LGU Water Billing System
                </h1>

                <p className="g-lead">
                  A connected web and mobile platform for managing customers, service accounts, meter readings, billing, payments, and water utility operations.
                </p>

                <div className="g-hero-meta-grid">
                  <div className="g-hero-meta-item">
                    <span>Role</span>
                    <strong>Frontend Developer / UI Designer</strong>
                  </div>
                  <div className="g-hero-meta-item">
                    <span>Platform</span>
                    <strong>Web + Mobile (Responsive)</strong>
                  </div>
                  <div className="g-hero-meta-item">
                    <span>Industry</span>
                    <strong>Government / Water Utility</strong>
                  </div>
                  <div className="g-hero-meta-item">
                    <span>Project Type</span>
                    <strong>Enterprise Information System</strong>
                  </div>
                </div>
              </div>

              {/* Right Column: Layered Product Composition */}
              <div className="g-hero-composition">
                <div className="g-hero-comp-label">
                  <span>● Web Management System + Mobile Field Application</span>
                </div>

                {/* Primary Desktop Frame */}
                <div className="g-hero-desktop-frame">
                  <video
                    src="/lguwater.mp4"
                    poster="/lgu-water-district-mockup.png"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>

                {/* Floating Mobile Meter Reader Screen */}
                <div className="g-hero-mobile-float">
                  <img
                    src="/lgu-water-district-mockup.png"
                    alt="LGU Water Mobile Meter Reader"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            02. SECTION 02 — HOW THE SYSTEM WORKS
           ========================================================================= */}
        <section className="g-section g-animate-section">
          <div className="g-container">
            <div>
              <div className="g-kicker">
                <span className="g-kicker__dot" />
                <span>OPERATIONAL WORKFLOW</span>
              </div>
              <h2 className="g-heading-md">How the System Works</h2>
              <p className="g-lead">
                An interconnected horizontal lifecycle connecting resident applications to recurring field collections and municipal audits.
              </p>
            </div>

            {/* Horizontal Process Track */}
            <div className="g-workflow-scroll-wrap">
              <div className="g-workflow-track">
                {workflowNodes.map((node, i) => (
                  <div key={node.step} style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 }}>
                    <div className="g-workflow-node">
                      <span className="g-workflow-node__num">{node.step}</span>
                      <strong className="g-workflow-node__label">{node.label}</strong>
                      <span style={{ fontSize: "0.76rem", color: "var(--muted)" }}>{node.desc}</span>
                    </div>
                    {i < workflowNodes.length - 1 && (
                      <span className="g-workflow-arrow">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Model Callout */}
            <div className="g-master-record-callout">
              <div>
                <span style={{ fontFamily: "var(--g-mono)", fontSize: "0.78rem", fontWeight: 800, color: "var(--g-blue)", textTransform: "uppercase" }}>
                  DATA ARCHITECTURE DECISION
                </span>
                <h3 style={{ fontSize: "1.45rem", fontWeight: 800, margin: "0.5rem 0 0.75rem", color: "var(--ink)" }}>
                  One Customer Record connected to Multiple Transactions
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.65 }}>
                  The system was designed around a connected transaction model where the customer remains the master record while service applications, accounts, readings, bills, and payments are treated as related operational transactions.
                </p>
              </div>

              {/* Mini Relationship Diagram */}
              <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "12px", padding: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <div style={{ padding: "0.6rem 1rem", borderRadius: "8px", background: "rgba(2, 132, 199, 0.12)", border: "1px solid var(--g-blue)", fontWeight: 800, fontSize: "0.86rem", color: "var(--ink)" }}>
                    👤 MASTER: Customer Record [Cust_ID: 10482]
                  </div>
                  <div style={{ paddingLeft: "1.5rem", borderLeft: "2px dashed var(--g-blue)", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div style={{ fontSize: "0.78rem", fontFamily: "var(--g-mono)", color: "var(--muted)" }}>├─ 📑 Transaction: Service Application (Zone 04)</div>
                    <div style={{ fontSize: "0.78rem", fontFamily: "var(--g-mono)", color: "var(--muted)" }}>├─ 💧 Active Account: Residential [Acct_No: 2026-084]</div>
                    <div style={{ fontSize: "0.78rem", fontFamily: "var(--g-mono)", color: "var(--muted)" }}>├─ ⏱ Hardware: Meter SN #WTR-99482</div>
                    <div style={{ fontSize: "0.78rem", fontFamily: "var(--g-mono)", color: "var(--muted)" }}>└─ 💳 Ledger: Monthly Bills & Cashier Receipts</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            03. SECTION 03 — THE OPERATIONAL CHALLENGE (FULL-WIDTH DARK CONTRAST)
           ========================================================================= */}
        <section className="g-section g-section--dark g-animate-section">
          <div className="g-container">
            <div style={{ maxWidth: "850px" }}>
              <div className="g-kicker" style={{ color: "var(--g-blue-light)" }}>
                <span className="g-kicker__dot" />
                <span>OPERATIONAL CONTEXT</span>
              </div>
              <h2 className="g-heading-lg">
                Water billing is more than generating a monthly bill.
              </h2>
              <p className="g-lead">
                A municipal utility functions as a continuous web of interrelated field data, regulatory tariff structures, legal connections, and fiscal audits.
              </p>
            </div>

            {/* Scattered Connected Process Labels */}
            <div className="g-scatter-labels">
              {[
                "customer records",
                "service applications",
                "service connections",
                "meter assignments",
                "field readings",
                "consumption",
                "billing",
                "payment transactions",
                "employee actions",
                "audit history",
              ].map((label) => (
                <div key={label} className="g-scatter-chip">
                  ● {label}
                </div>
              ))}
            </div>

            {/* Three Core Challenges */}
            <div className="g-challenge-pillars">
              <div className="g-challenge-pillar">
                <span className="g-challenge-pillar__num">CHALLENGE 01</span>
                <h3>Avoiding Duplicated Customer Information</h3>
                <p>Preventing fragmented resident files when households add meters, change tenancy, or modify service account classifications.</p>
              </div>

              <div className="g-challenge-pillar">
                <span className="g-challenge-pillar__num">CHALLENGE 02</span>
                <h3>Connecting Field Operations with Office Billing</h3>
                <p>Bridging physical meter reading routes across rural terrain with the centralized municipal cashier and statement printing engine.</p>
              </div>

              <div className="g-challenge-pillar">
                <span className="g-challenge-pillar__num">CHALLENGE 03</span>
                <h3>Making Complex Database Relationships Understandable</h3>
                <p>Enabling utility clerks to intuitively navigate nested one-to-many data relationships without needing SQL knowledge.</p>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            04. SECTION 04 — SYSTEM ECOSYSTEM
           ========================================================================= */}
        <section className="g-section g-animate-section">
          <div className="g-container">
            <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 3rem" }}>
              <div className="g-kicker">
                <span className="g-kicker__dot" />
                <span>ARCHITECTURE & MODULES</span>
              </div>
              <h2 className="g-heading-md">System Ecosystem</h2>
              <p className="g-lead">
                A unified architecture coordinating 11 operational modules into 3 distinct functional zones orbiting the core billing engine.
              </p>
            </div>

            <div className="g-ecosystem-grid">
              {ecosystemClusters.map((cluster) => (
                <div key={cluster.category} className="g-ecosystem-cluster">
                  <div>
                    <span className="g-cluster-tag">{cluster.tag}</span>
                    <h3 style={{ fontSize: "1.35rem", fontWeight: 800, margin: "0.4rem 0", color: "var(--ink)" }}>
                      {cluster.category}
                    </h3>
                  </div>

                  <div className="g-module-list">
                    {cluster.modules.map((mod) => (
                      <div key={mod.name} className="g-module-item">
                        <div>
                          <strong style={{ display: "block", fontSize: "0.88rem" }}>{mod.name}</strong>
                          <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{mod.scope}</span>
                        </div>
                        <span style={{ color: "var(--g-blue)", fontSize: "0.8rem", fontWeight: 800 }}>⚡</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            05. SECTION 05 — TWO SIDES OF ONE SYSTEM
           ========================================================================= */}
        <section className="g-section g-section--alt g-animate-section">
          <div className="g-container--wide">
            <div style={{ maxWidth: "800px", marginBottom: "3rem" }}>
              <div className="g-kicker">
                <span className="g-kicker__dot" />
                <span>DUAL PLATFORM DEPLOYMENT</span>
              </div>
              <h2 className="g-heading-md">Two Sides of One System</h2>
              <p className="g-lead">
                Purpose-built interfaces engineered for the high-density desktop workflows of office administrators and the tactile, single-handed ergonomics of mobile field readers.
              </p>
            </div>

            <div className="g-split-system">
              
              {/* LEFT: Office Operations Web Application */}
              <div className="g-system-pane">
                <div>
                  <span className="g-cluster-tag">ADMINISTRATIVE WEB PLATFORM</span>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "0.4rem 0 0.8rem", color: "var(--ink)" }}>
                    Office Operations — Web Application
                  </h3>
                  <p style={{ fontSize: "0.94rem", color: "var(--muted)", lineHeight: 1.65 }}>
                    Engineered for municipal clerks and managers to orchestrate consumer master records, approve new line applications, configure 4-tier progressive tariffs, record cashier payments, and generate monthly fiscal reports.
                  </p>
                </div>

                <div className="g-pane-screen">
                  <img
                    src="/lgu-water-district-mockup.png"
                    alt="LGU Water Office Web Management System"
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.84rem", color: "var(--muted)" }}>
                  <div>✓ Application Processing</div>
                  <div>✓ Meter Serial Assignment</div>
                  <div>✓ Cashier Payment Reconciliation</div>
                  <div>✓ Account Ledger & Audit</div>
                </div>
              </div>

              {/* RIGHT: Field Operations Mobile Meter Reader */}
              <div className="g-system-pane">
                <div>
                  <span className="g-cluster-tag">FIELD MOBILE APPLICATION</span>
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 800, margin: "0.4rem 0 0.8rem", color: "var(--ink)" }}>
                    Field Operations — Mobile Meter Reader
                  </h3>
                  <p style={{ fontSize: "0.94rem", color: "var(--muted)", lineHeight: 1.65 }}>
                    Built for field personnel walking municipal zones to locate consumer meters, review previous volume baselines, input monthly dials with validation tripwires, and synchronize verified readings directly into the billing queue.
                  </p>
                </div>

                <div className="g-pane-screen">
                  <img
                    src="/lgu-water-district-mockup.png"
                    alt="LGU Water Mobile Field App"
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.84rem", color: "var(--muted)" }}>
                  <div>✓ Route / Zone Navigation</div>
                  <div>✓ Consumption Baseline Check</div>
                  <div>✓ Anomaly Spike Validation</div>
                  <div>✓ Offline Sync Protocol</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            06. SECTION 06 — MOBILE METER READER JOURNEY
           ========================================================================= */}
        <section className="g-section g-animate-section">
          <div className="g-container">
            <div style={{ maxWidth: "800px", marginBottom: "3rem" }}>
              <div className="g-kicker">
                <span className="g-kicker__dot" />
                <span>MOBILE-FIRST FIELD WORKFLOW</span>
              </div>
              <h2 className="g-heading-md">Mobile Meter Reader Journey</h2>
              <p className="g-lead">
                A 7-stage linear field routine designed for high-speed meter recording under harsh outdoor lighting and intermittent cellular connectivity.
              </p>
            </div>

            <div className="g-mobile-journey-grid">
              {mobileJourneyStages.map((st) => (
                <div key={st.num} className="g-mobile-journey-step">
                  <span className="g-mobile-journey-step__num">{st.num}</span>
                  <strong style={{ fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.3 }}>{st.title}</strong>
                  <span style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.5 }}>{st.desc}</span>
                </div>
              ))}
            </div>

            {/* UX Field Considerations Callout */}
            <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "16px", padding: "2rem", marginTop: "2rem" }}>
              <strong style={{ fontFamily: "var(--g-mono)", fontSize: "0.82rem", color: "var(--g-blue)", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
                DESIGNED FOR FIELD USE — CORE UX CONSIDERATIONS
              </strong>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", fontSize: "0.88rem", color: "var(--ink)" }}>
                <div>● Large 48px tap targets for thumb reach</div>
                <div>● Minimal input: 1 numeric dial field</div>
                <div>● High-contrast resident info & landmarks</div>
                <div>● Clear previous vs current reading delta</div>
                <div>● Real-time client validation before submit</div>
                <div>● Obvious sync / queued status indicators</div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            07. SECTION 07 — BUSINESS LOGIC AS UX
           ========================================================================= */}
        <section className="g-section g-animate-section">
          <div className="g-container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <div className="g-kicker">
                <span className="g-kicker__dot" />
                <span>RELATIONAL DATA ARCHITECTURE</span>
              </div>
              <h2 className="g-heading-md">Designing around the actual transaction model</h2>
            </div>

            {/* Technical Pipeline Sequence */}
            <div className="g-pipeline-strip">
              <span className="g-pipeline-item">CUSTOMER</span>
              <span className="g-pipeline-arrow">↓</span>
              <span className="g-pipeline-item">SERVICE APPLICATION</span>
              <span className="g-pipeline-arrow">↓</span>
              <span className="g-pipeline-item">SERVICE ACCOUNT</span>
              <span className="g-pipeline-arrow">↓</span>
              <span className="g-pipeline-item">METER</span>
              <span className="g-pipeline-arrow">↓</span>
              <span className="g-pipeline-item">METER READING</span>
              <span className="g-pipeline-arrow">↓</span>
              <span className="g-pipeline-item">BILL</span>
              <span className="g-pipeline-arrow">↓</span>
              <span className="g-pipeline-item">PAYMENT</span>
            </div>

            <div style={{ maxWidth: "820px", margin: "0 auto", fontSize: "1.05rem", color: "var(--muted)", lineHeight: 1.75 }}>
              <p style={{ marginBottom: "1.25rem" }}>
                A major design consideration was ensuring that a new service application does not unnecessarily recreate customer information. The customer functions as the permanent master record.
              </p>
              <p style={{ marginBottom: "1.25rem" }}>
                Applications are transactional entities related to that customer. Once approved, applications instantiate service accounts, which subsequently bind physical meters, monthly readings, progressive tariff calculations, and payment receipts into an auditable relational chain.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            08. SECTION 08 — EMPLOYEE WORKFLOW
           ========================================================================= */}
        <section className="g-section g-section--alt g-animate-section">
          <div className="g-container">
            <div>
              <div className="g-kicker">
                <span className="g-kicker__dot" />
                <span>OPERATIONAL INTERFACE</span>
              </div>
              <h2 className="g-heading-md">Employee Workflow</h2>
              <p className="g-lead">
                The employee experience focuses on daily operations, while system configuration remains separated under administrative controls.
              </p>
            </div>

            <div className="g-annotated-dashboard">
              <img
                src="/lgu-water-district-mockup.png"
                alt="Annotated LGU Water Dashboard Workflow"
              />
            </div>

            <div className="g-annotation-tags">
              <div className="g-annotation-tag">
                <strong>01 · Pending Applications</strong>
                <span>Instant intake queue showing applicant credentials and inspection status.</span>
              </div>
              <div className="g-annotation-tag">
                <strong>02 · Active Accounts & Zones</strong>
                <span>Live status of 40,000+ consumer connections across 28 barangay sectors.</span>
              </div>
              <div className="g-annotation-tag">
                <strong>03 · Meter-Reading Activity</strong>
                <span>Real-time completion telemetry from mobile field readers.</span>
              </div>
              <div className="g-annotation-tag">
                <strong>04 · Bills & Payments Ledger</strong>
                <span>One-click cashier receipting with automated late surcharge computation.</span>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            09. SECTION 09 — DESIGNING DENSE DATA
           ========================================================================= */}
        <section className="g-section g-animate-section">
          <div className="g-container">
            <div style={{ maxWidth: "800px", marginBottom: "3rem" }}>
              <div className="g-kicker">
                <span className="g-kicker__dot" />
                <span>INFORMATION ARCHITECTURE</span>
              </div>
              <h2 className="g-heading-md">Designing Dense Data</h2>
              <p className="g-lead">
                How the interface handles thousands of operational records with rapid scanability, keyboard accessibility, and zero visual ambiguity.
              </p>
            </div>

            <div className="g-dense-principles">
              <div className="g-dense-principle">
                <strong>Scanability</strong>
                <span>Tabular layouts with fixed-width numeric columns and strict visual hierarchy.</span>
              </div>
              <div className="g-dense-principle">
                <strong>Consistent Statuses</strong>
                <span>Color-coded semantic badges (Pending, Active, Flagged, Disconnected, Overdue).</span>
              </div>
              <div className="g-dense-principle">
                <strong>Clear Primary Actions</strong>
                <span>High-contrast affordances for frequent tasks like reading entry and receipt printing.</span>
              </div>
              <div className="g-dense-principle">
                <strong>Relationship Visibility</strong>
                <span>Breadcrumbs and linked customer IDs revealing related parent records instantly.</span>
              </div>
              <div className="g-dense-principle">
                <strong>Reduced Duplication</strong>
                <span>Unified profile tabs consolidating applications, meters, and bills on one screen.</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. SECTION 10 — KEY TECHNICAL / PRODUCT CHALLENGES
           ========================================================================= */}
        <section className="g-section g-section--alt g-animate-section">
          <div className="g-container">
            <div>
              <div className="g-kicker">
                <span className="g-kicker__dot" />
                <span>ENGINEERING DECISIONS</span>
              </div>
              <h2 className="g-heading-md">Key Technical & Product Challenges</h2>
              <p className="g-lead">
                Resolving operational friction through architectural discipline and intentional frontend ergonomics.
              </p>
            </div>

            <div className="g-challenges-seq">
              {technicalChallenges.map((item) => (
                <div key={item.id} className="g-challenge-row">
                  <div className="g-challenge-row__left">
                    <span>CHALLENGE {item.id}</span>
                    <strong>{item.title}</strong>
                    <p style={{ fontSize: "0.88rem", color: "var(--muted)", margin: "0.25rem 0 0" }}>
                      {item.problem}
                    </p>
                  </div>
                  <div className="g-challenge-row__right">
                    <strong style={{ display: "block", color: "var(--ink)", marginBottom: "0.3rem" }}>
                      Engineered Solution:
                    </strong>
                    {item.solution}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            11. SECTION 11 — FINAL SYSTEM SHOWCASE
           ========================================================================= */}
        <section className="g-section g-animate-section">
          <div className="g-container--wide">
            <div style={{ maxWidth: "800px", margin: "0 auto 3.5rem", textAlign: "center" }}>
              <div className="g-kicker">
                <span className="g-kicker__dot" />
                <span>COMPLETE PRODUCT SUITE</span>
              </div>
              <h2 className="g-heading-md">Final System Showcase</h2>
              <p className="g-lead">
                An end-to-end municipal platform unifying web administration, mobile field capture, progressive tariff calculation, and transaction ledgers.
              </p>
            </div>

            <div className="g-gallery-mosaic">
              <div className="g-gallery-frame">
                <img
                  src="/lgu-water-district-mockup.png"
                  alt="LGU Water Management Platform"
                />
              </div>
              <div className="g-gallery-frame">
                <img
                  src="/lgu-water-district-mockup.png"
                  alt="LGU Water Mobile Meter Reader Suite"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL SECTION — PROJECT TAKEAWAYS
           ========================================================================= */}
        <section className="g-section">
          <div className="g-container--narrow">
            <div style={{ textAlign: "center" }}>
              <div className="g-kicker">
                <span className="g-kicker__dot" />
                <span>PROFESSIONAL GROWTH</span>
              </div>
              <h2 className="g-heading-lg" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}>
                What this project taught me
              </h2>
            </div>

            <div className="g-takeaways-list">
              <div className="g-takeaway-item">Designing interfaces around relational data</div>
              <div className="g-takeaway-item">Translating operational workflows into UI</div>
              <div className="g-takeaway-item">Building interconnected CRUD systems</div>
              <div className="g-takeaway-item">Understanding master records vs transactions</div>
              <div className="g-takeaway-item">Designing for both office and field users</div>
              <div className="g-takeaway-item">Collaborating on enterprise-scale functionality</div>
            </div>

            <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto", fontSize: "1.1rem", color: "var(--ink)", fontWeight: 500, lineHeight: 1.7 }}>
              <p>
                “The project strengthened my understanding of how frontend decisions, database relationships, and real-world business processes need to work together in an operational system.”
              </p>
            </div>

            {/* Subtle Navigation */}
            <footer className="g-footer-nav">
              <a href="/works/cc-wedding" className="editorial-btn editorial-btn--ghost">
                <span>← Previous: CC Wedding</span>
              </a>
              <a href="/works/hr-payroll" className="editorial-btn editorial-btn--primary">
                <span>Next Case Study: LightEM Payroll →</span>
              </a>
            </footer>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
