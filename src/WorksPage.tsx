import { useEffect } from "react";
import { Footer, Navigation } from "./Sections";
import TapeRibbons from "./TapeRibbons";
import { requestResumeAccess } from "./ResumeGateModal";

interface PipelineProject {
  id: string;
  title: string;
  category: string;
  role: string;
  timeline: string;
  progress: number;
  status: string;
  description: string;
  stack: string[];
  highlights: string[];
}

const pipelineProjects: PipelineProject[] = [
  {
    id: "water-district",
    title: "LGU Water District Management & Billing Enterprise",
    category: "Full-Stack Enterprise System",
    role: "Lead Systems Architect & Developer",
    timeline: "2024 — Present",
    progress: 92,
    status: "Drafting Architecture Case Study & ERDs",
    description:
      "A comprehensive municipal-grade billing and operations engine serving thousands of active consumer accounts. Automates tiered water rate calculations, arrears compounding, real-time meter audits, and cashier reconciliation.",
    stack: ["Laravel", "React", "MySQL", "Tailwind CSS", "Cloudflare", "REST APIs"],
    highlights: [
      "Sub-second billing calculation across 10,000+ subscriber records",
      "Field meter reader reconciliation with automated discrepancy flagging",
      "Complete fiscal audit trail and compliance reporting for LGU administrators",
    ],
  },
  {
    id: "payroll-hris",
    title: "Kurakog Lending & Payroll HRIS Platform",
    category: "Financial & Human Capital Suite",
    role: "Full-Stack Software Engineer",
    timeline: "2024 — 2025",
    progress: 88,
    status: "Finalizing Security & Performance Benchmarks",
    description:
      "Consolidated financial and HR platform handling loan amortizations, payroll disbursement routines, government contribution schedules, and automated biometric timecard synchronizations.",
    stack: ["PHP", "PostgreSQL", "React", "TypeScript", "Docker", "JWT Auth"],
    highlights: [
      "Streamlined bi-monthly payroll disbursement from 3 days to under 15 minutes",
      "Precision rounding algorithms ensuring zero discrepancy in lending ledgers",
      "Role-based access security for sensitive personnel salary datasets",
    ],
  },
  {
    id: "portfolio-3d",
    title: "High-Craft 3D Spatial Portfolio & Interactive Web Experience",
    category: "Creative Engineering & WebGL",
    role: "Creative Technologist & UI Engineer",
    timeline: "2026",
    progress: 96,
    status: "Active Production Deployment",
    description:
      "A tactile digital portfolio built with custom Web Audio keyboard sound synthesis, realistic 3D flipping academic books, interactive node-link network orbits, and dynamic tape ribbon physics.",
    stack: ["React", "TypeScript", "GSAP", "Three.js / Canvas", "Vite", "Web Audio API"],
    highlights: [
      "Zero external audio asset loading — 100% procedural Web Audio synthesizer",
      "60fps responsive 3D card and book physics powered by matrix transforms",
      "Accessible high-contrast theme system with customized dark & light modes",
    ],
  },
  {
    id: "academic-portal",
    title: "Collegiate Academic & Community Portal Systems",
    category: "Education & Productivity",
    role: "Web Developer & UI/UX Designer",
    timeline: "2023 — 2024",
    progress: 82,
    status: "Compiling UI/UX Figma Deliverables",
    description:
      "Campus information and student records portal designed to replace manual paper enrollments and grade verifications with accessible, mobile-first dashboards.",
    stack: ["Next.js", "Supabase", "TypeScript", "Figma", "Tailwind CSS"],
    highlights: [
      "Designed and delivered complete atomic design component library in Figma",
      "Self-service student portal lowering registrar counter inquiries by over 60%",
      "WCAG AA accessible contrast and typography scaling for campus devices",
    ],
  },
];

export default function WorksPage() {
  useEffect(() => {
    // Scroll to top upon navigation
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Works & Projects (Updating) — Lescy G. Caadlawon";
  }, []);

  return (
    <>
      <Navigation />
      <main className="works-page" id="main-content">

      {/* Hero Notice Section */}
      <section className="works-hero shell" aria-labelledby="works-page-title">
        <div className="works-hero__badge-row">
          <div className="works-hero__status-badge">
            <span className="works-hero__status-indicator" />
            <span>STATUS: ACTIVE REVISION & STAGING</span>
          </div>
          <span className="works-hero__edition-pill">PORTFOLIO v2026.3</span>
        </div>

        <div className="works-hero__header-grid">
          <h1 id="works-page-title" className="works-hero__title">
            ( Works )
          </h1>
          <div className="works-hero__desc-col">
            <p className="works-hero__lead">
              <strong>Heads up:</strong> This page is still currently being updated.
            </p>
            <p className="works-hero__subtext">
              I’m compiling deep-dive case studies, interactive project sandboxes, and production
              metrics for the systems I’ve engineered. In the meantime, explore the live caution
              tape marquee and preview the incoming release pipeline below.
            </p>
          </div>
        </div>
      </section>

      {/* Tape Ribbons Feature - Replicating the user's reference image */}
      <section className="works-tape-section" aria-label="Works status ribbon installation">
        <div className="works-tape-section__header shell">
          <span className="works-tape-section__eyebrow">( Production Tapes )</span>
          <span className="works-tape-section__hint">Drag / Hover tapes to inspect marquee</span>
        </div>

        {/* The 5-layer animated tape ribbons */}
        <TapeRibbons />
      </section>

      {/* Pipeline Preview Section */}
      <section className="works-pipeline shell" aria-labelledby="pipeline-heading">
        <header className="works-pipeline__header">
          <div>
            <span className="works-pipeline__eyebrow">( In The Pipeline )</span>
            <h2 id="pipeline-heading" className="works-pipeline__title">
              What’s Being Documented
            </h2>
          </div>
          <p className="works-pipeline__meta-note">
            Here are the core production applications undergoing documentation and write-up review:
          </p>
        </header>

        <div className="works-pipeline__grid">
          {pipelineProjects.map((project) => (
            <article className="pipeline-card" key={project.id}>
              <div className="pipeline-card__top">
                <span className="pipeline-card__cat">{project.category}</span>
                <span className="pipeline-card__timeline">{project.timeline}</span>
              </div>

              <h3 className="pipeline-card__title">{project.title}</h3>

              <div className="pipeline-card__role-bar">
                <span className="pipeline-card__role-label">Role:</span>
                <span className="pipeline-card__role-val">{project.role}</span>
              </div>

              <p className="pipeline-card__desc">{project.description}</p>

              {/* Progress Bar */}
              <div className="pipeline-progress" aria-label={`Documentation progress: ${project.progress}%`}>
                <div className="pipeline-progress__label-row">
                  <span className="pipeline-progress__status">
                    <span className="pipeline-progress__dot" />
                    {project.status}
                  </span>
                  <strong className="pipeline-progress__percent">{project.progress}%</strong>
                </div>
                <div className="pipeline-progress__track">
                  <div
                    className="pipeline-progress__fill"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Highlights */}
              <div className="pipeline-card__highlights">
                <p className="pipeline-card__highlights-title">Engineering Highlights:</p>
                <ul className="pipeline-card__highlights-list">
                  {project.highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Stack Tags */}
              <div className="pipeline-card__stack">
                {project.stack.map((tech) => (
                  <span className="pipeline-card__tag" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Action / Fallback Banner */}
      <section className="works-cta shell" aria-label="Explore other sections">
        <div className="works-cta__inner">
          <div className="works-cta__content">
            <span className="works-cta__badge">NEED IMMEDIATE DETAILS?</span>
            <h3 className="works-cta__heading">Want to review verified code or verify credentials?</h3>
            <p className="works-cta__text">
              While the official case studies are receiving their finishing coats of polish, you can inspect my
              comprehensive technical CV or review live code repositories directly on GitHub.
            </p>
          </div>
          <div className="works-cta__buttons">
            <button
              type="button"
              className="button button--works-primary"
              onClick={() => requestResumeAccess("download")}
            >
              <span>Download CV / Resume ↗</span>
            </button>
            <a
              href="https://github.com/Shindawn"
              target="_blank"
              rel="noreferrer"
              className="button button--works-secondary"
            >
              <span>GitHub Repositories ↗</span>
            </a>
            <a href="/about" className="button button--works-subtle">
              <span>Meet Lescy (About) →</span>
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);
}
