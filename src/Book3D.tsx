import { useState, useEffect, useRef, type KeyboardEvent } from "react";

export interface CertCredential {
  id: string;
  name: string;
  shortName?: string;
  issuer: string;
  category: string;
  issueDate?: string;
  credentialId?: string;
  image?: string;
  skills?: string[];
  recipient?: string;
  description?: string;
  verifyUrl?: string;
}

export const CERTIFICATIONS: CertCredential[] = [
  {
    id: "oracle-cloud-ai",
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    shortName: "Oracle Cloud AI Associate",
    issuer: "Oracle University",
    category: "Backend & Cloud",
    issueDate: "May 03, 2026",
    credentialId: "327802132OCI25AICFA",
    image: "/certs/oracle-cloud-ai.jpg",
    recipient: "Lescy Gonzales Caadlawon",
    skills: ["Oracle Cloud Infrastructure", "AI & Machine Learning Concepts", "GenAI Architecture", "OCI AI Services"],
    description:
      "Official certificate of recognition by Oracle Corporation acknowledging foundational mastery of OCI AI services, machine learning infrastructure, and generative AI deployment architectures.",
  },
  {
    id: "cisco-cybersecurity",
    name: "Junior Cybersecurity Analyst Career Path",
    shortName: "Junior Cybersecurity Analyst (CISCO)",
    issuer: "Cisco Networking Academy",
    category: "Security",
    issueDate: "Feb 27, 2026",
    image: "/certs/cisco-cybersecurity.jpg",
    recipient: "Lescy G. Caadlawon",
    skills: ["Network Security Controls", "Vulnerability Assessment", "Threat Mitigation", "Incident Response"],
    description:
      "Student level credential from Cisco Networking Academy verifying proficiency in network security controls, system threat mitigation, incident management, and security risk assessment tools.",
  },
  {
    id: "github-foundations",
    name: "GitHub Foundations Credential",
    shortName: "GitHub Foundations",
    issuer: "GitHub / Microsoft",
    category: "Backend & Cloud",
    issueDate: "2025 – 2026",
    recipient: "Lescy G. Caadlawon",
    skills: ["Git Version Control", "GitHub Actions & Workflows", "Branch Governance", "Repository Security"],
    description:
      "Core proficiency in distributed version control, CI/CD automated build workflows, issue management, and collaborative software development lifecycle on GitHub.",
  },
  {
    id: "laravel-web-dev",
    name: "Web Development (Laravel & PHP)",
    shortName: "Web Development (Laravel)",
    issuer: "Laravel Ecosystem",
    category: "Backend & Cloud",
    issueDate: "2025",
    recipient: "Lescy G. Caadlawon",
    skills: ["PHP 8.x", "Laravel MVC Architecture", "Eloquent ORM", "RESTful APIs & Auth"],
    description:
      "Applied full-stack backend development involving modern MVC structure, relational database schema design, token authentication, and robust REST APIs.",
  },
  {
    id: "ibm-prompt-eng",
    name: "Prompt Engineering for Everyone",
    shortName: "Prompt Engineering (IBM)",
    issuer: "IBM SkillsBuild",
    category: "AI & Product",
    issueDate: "2025 – 2026",
    recipient: "Lescy G. Caadlawon",
    skills: ["Generative AI Prompting", "Few-Shot & Zero-Shot Methods", "Chain-of-Thought", "AI Guardrails"],
    description:
      "Specialized training in architecting effective LLM prompts, reasoning pipelines, temperature tuning, and generative AI application integration.",
  },
  {
    id: "google-genai",
    name: "Introduction to Generative AI",
    shortName: "GenAI (Google)",
    issuer: "Google Cloud",
    category: "AI & Product",
    issueDate: "2025 – 2026",
    recipient: "Lescy G. Caadlawon",
    skills: ["Large Language Models", "Responsible AI Principles", "Transformer Models", "Vertex AI"],
    description:
      "Foundational accreditation covering generative model architectures, ethical AI design, deep learning fundamentals, and enterprise Google Cloud AI tooling.",
  },
  {
    id: "ibm-ux-design",
    name: "Enterprise UX Design Fundamentals",
    shortName: "UX Design (IBM)",
    issuer: "IBM",
    category: "AI & Product",
    issueDate: "2025",
    recipient: "Lescy G. Caadlawon",
    skills: ["User Journey Mapping", "Wireframing & Prototyping", "Design Thinking", "Accessibility & WCAG"],
    description:
      "Comprehensive UX design principles focused on human-computer interaction, heuristic evaluation, rapid prototyping, and user-centered design methodologies.",
  },
  {
    id: "google-tech-support",
    name: "Google IT Technical Support Professional",
    shortName: "Technical Support (Google)",
    issuer: "Google Career Certificates",
    category: "AI & Product",
    issueDate: "2024 – 2025",
    recipient: "Lescy G. Caadlawon",
    skills: ["System Diagnostics", "Networking Protocols (TCP/IP, DNS)", "Troubleshooting", "Customer Support"],
    description:
      "Rigorous technical support training covering operating system internals, computer networking, hardware diagnostics, and IT systems administration.",
  },
  {
    id: "datacamp-data-eng",
    name: "Data Engineering & Analytics Track",
    shortName: "Data Engineering (DataCamp)",
    issuer: "DataCamp",
    category: "Specializations & Advanced Studies",
    issueDate: "2026",
    recipient: "Lescy G. Caadlawon",
    skills: ["SQL Pipelines", "Python Analytics", "Data Cleaning & ETL", "Data Warehousing"],
    description:
      "Advanced curriculum in data transformation pipelines, relational schemas, exploratory data analysis, and automated ETL workflows.",
  },
  {
    id: "gcp-cloud-specialist",
    name: "Cloud Architecture & Services Specialization",
    shortName: "Cloud Architecture Specialization",
    issuer: "Cloud Training Program",
    category: "Specializations & Advanced Studies",
    issueDate: "2026",
    recipient: "Lescy G. Caadlawon",
    skills: ["Cloud Storage", "Serverless Functions", "IAM & Security", "Container Deployments"],
    description:
      "Hands-on architectural training covering cloud provisioning, microservice containerization, IAM security boundaries, and high availability.",
  },
  {
    id: "devops-workshop",
    name: "Modern DevOps & CI/CD Deployment Workshop",
    shortName: "DevOps & Containerization",
    issuer: "Developer Workshop",
    category: "Specializations & Advanced Studies",
    issueDate: "2025 – 2026",
    recipient: "Lescy G. Caadlawon",
    skills: ["Docker Containers", "CI/CD Workflows", "Automated Testing", "Environment Config"],
    description:
      "Practical workshops in containerized deployment workflows, pipeline automation, and production-ready staging environments.",
  },
  {
    id: "tech-guild-leadership",
    name: "IT Guild Leadership & Collegiate Workshop Facilitation",
    shortName: "Tech Guild Specialization",
    issuer: "CatSU Tech Guild",
    category: "Specializations & Advanced Studies",
    issueDate: "2024 – 2026",
    recipient: "Lescy G. Caadlawon",
    skills: ["Technical Mentorship", "Workshop Facilitation", "Community Leadership", "Hackathon Organization"],
    description:
      "Collegiate technology leadership organizing developer bootcamps, code review sessions, and collaborative hackathons.",
  },
];

// Helper to find a certification by item name or ID
function findCert(identifier: string): CertCredential | undefined {
  const clean = identifier.toLowerCase().trim();
  return (
    CERTIFICATIONS.find((c) => c.id.toLowerCase() === clean) ||
    CERTIFICATIONS.find((c) => c.name.toLowerCase().includes(clean)) ||
    CERTIFICATIONS.find((c) => c.shortName && c.shortName.toLowerCase().includes(clean)) ||
    CERTIFICATIONS.find((c) => clean.includes(c.id.toLowerCase()))
  );
}

export interface BookPageContent {
  tag: string;
  title?: string;
  subtitle?: string;
  description?: string;
  stats?: { label: string; value: string }[];
  pills?: string[];
  quote?: string;
  image?: string;
  caption?: string;
  certList?: {
    category: string;
    items: {
      name: string;
      certId?: string;
      badge?: string;
    }[];
  }[];
  interactiveHint?: string;
}

export interface BookSpread {
  id: string;
  leftPage: BookPageContent;
  rightPage: BookPageContent;
}

const spreads: BookSpread[] = [
  {
    id: "spread-1",
    leftPage: {
      tag: "Vol. 01 • Academic Roots",
      quote:
        "“In engineering and design, true craft is born at the intersection of mathematical rigor and aesthetic intuition.”",
      image: "/catsu-campus.jpg",
      caption: "Catanduanes State University Main Campus.",
    },
    rightPage: {
      tag: "Chapter 01 • Degree",
      title: "Catanduanes State University",
      subtitle: "Bachelor of Science in Information Technology",
      description:
        "A rigorous 4-year curriculum spanning software architecture, distributed databases, algorithmic complexity, and human-computer interfaces. Consistently maintained top academic honors.",
      stats: [
        { label: "Standing", value: "1.4 GWA (Cum Laude)" },
        { label: "Timeline", value: "Aug 2022 – June 2026" },
      ],
    },
  },
  {
    id: "spread-2",
    leftPage: {
      tag: "Chapter 02 • Awards & Accreditations",
      title: "Scholastic Honors & Certs",
      subtitle: "Multi-Year Dean’s List Distinction",
      description:
        "Awarded continuous Dean’s Honor Roll recognition throughout 2022–2026, complemented by verified industry credentials across Cloud, Security, Backend, and AI systems.",
      stats: [
        { label: "Honors", value: "Dean’s Lister (2022–2026)" },
        { label: "Accreditations", value: "12+ Credentials & Certs" },
      ],
      pills: [
        "Oracle Cloud AI",
        "GitHub Foundations",
        "CISCO Cyber",
        "IBM AI & UX",
        "Google GenAI",
        "Laravel Web Dev",
      ],
    },
    rightPage: {
      tag: "Industry Certifications • Part 01",
      interactiveHint: "Click any certification to view certificate image",
      certList: [
        {
          category: "Backend & Cloud",
          items: [
            { name: "Oracle Cloud AI Associate", certId: "oracle-cloud-ai", badge: "Image Available" },
            { name: "Junior Cybersecurity Analyst (CISCO)", certId: "cisco-cybersecurity", badge: "Image Available" },
            { name: "GitHub Foundations", certId: "github-foundations" },
            { name: "Web Development (Laravel & PHP)", certId: "laravel-web-dev" },
          ],
        },
        {
          category: "Security & Infrastructure",
          items: [
            { name: "Junior Cybersecurity Analyst Career Path (CISCO)", certId: "cisco-cybersecurity", badge: "Verified" },
          ],
        },
      ],
    },
  },
  {
    id: "spread-3",
    leftPage: {
      tag: "Chapter 03 • Certifications (Part 02)",
      title: "AI, Product & UX",
      subtitle: "Verified Technical Credentials",
      interactiveHint: "Click any certification to view certificate image",
      certList: [
        {
          category: "AI & Intelligence",
          items: [
            { name: "Prompt Engineering for Everyone (IBM)", certId: "ibm-prompt-eng" },
            { name: "Introduction to Generative AI (Google)", certId: "google-genai" },
          ],
        },
        {
          category: "Product, UX & Systems",
          items: [
            { name: "Enterprise UX Design Fundamentals (IBM)", certId: "ibm-ux-design" },
            { name: "Google IT Technical Support Professional", certId: "google-tech-support" },
          ],
        },
      ],
    },
    rightPage: {
      tag: "Specializations & Advanced Studies",
      title: "Continuing Studies",
      subtitle: "Courses, Tracks & Workshops",
      description:
        "Ongoing professional development, developer tracks, and community technical mentorship.",
      interactiveHint: "Click any item to view credential details",
      certList: [
        {
          category: "Data & Cloud Infrastructure",
          items: [
            { name: "Data Engineering & Analytics (DataCamp)", certId: "datacamp-data-eng" },
            { name: "Cloud Architecture Specialization", certId: "gcp-cloud-specialist" },
          ],
        },
        {
          category: "DevOps & Guild Leadership",
          items: [
            { name: "Modern DevOps & Containerization Workshop", certId: "devops-workshop" },
            { name: "IT Guild Leadership & Workshop Facilitation", certId: "tech-guild-leadership" },
          ],
        },
      ],
    },
  },
  {
    id: "spread-4",
    leftPage: {
      tag: "Chapter 04 • Merit Grants",
      quote:
        "“Opportunity unlocks when dedication meets academic consistency — fueling research, innovation, and community leadership.”",
      image:
        "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=700&q=85",
      caption: "Tertiary scholarship & institutional research grant.",
    },
    rightPage: {
      tag: "Scholarships & Affiliations",
      title: "Grants & Tech Leadership",
      subtitle: "Merit Scholar & IT Guild Officer",
      description:
        "Recipient of competitive tertiary academic scholarship grants covering full tuition and research initiatives. Active student leader facilitating collegiate coding workshops and hackathons.",
      stats: [
        { label: "Grant", value: "100% Tertiary Merit Scholar" },
        { label: "Leadership", value: "Tech Guild & IT Society" },
      ],
      pills: [
        "DTI-Albay Coursera",
        "Google",
        "DataCamp",
        "GitHub Education",
        "DTI-CAR",
        "ASEAN",
      ],
    },
  },
];

function PageInner({
  page,
  pageNumber,
  onCertClick,
}: {
  page: BookPageContent;
  pageNumber: number;
  onCertClick: (certIdOrName: string) => void;
}) {
  return (
    <div className="book3d-page__inner">
      <div className="book3d-page__header">
        <span className="book3d-page__tag">{page.tag}</span>
        <span className="book3d-page__number">{pageNumber}</span>
      </div>

      {page.title && (
        <div className="book3d-page__main-content">
          <h4 className="book3d-page__title">{page.title}</h4>
          {page.subtitle && (
            <p className="book3d-page__subtitle">{page.subtitle}</p>
          )}
          {page.description && (
            <p className="book3d-page__desc">{page.description}</p>
          )}

          {page.stats && (
            <div className="book3d-page__stats">
              {page.stats.map((st, i) => (
                <div key={i} className="book3d-page__stat-item">
                  <span className="book3d-page__stat-label">{st.label}</span>
                  <strong className="book3d-page__stat-value">{st.value}</strong>
                </div>
              ))}
            </div>
          )}

          {page.pills && (
            <div className="book3d-page__pills">
              {page.pills.map((pill, i) => (
                <button
                  key={i}
                  type="button"
                  className="book3d-page__pill book3d-page__pill--clickable"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCertClick(pill);
                  }}
                  title={`View details for ${pill}`}
                >
                  {pill}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {page.certList && (
        <div className="book3d-page__certs">
          {page.certList.map((group, idx) => (
            <div key={idx} className="book3d-cert-group">
              <span className="book3d-cert-group__category">{group.category}</span>
              <ul className="book3d-cert-group__list">
                {group.items.map((item, itemIdx) => {
                  const cert = findCert(item.certId || item.name);
                  const hasImage = Boolean(cert?.image);

                  return (
                    <li key={itemIdx}>
                      <button
                        type="button"
                        className={`book3d-cert-item-btn ${hasImage ? "book3d-cert-item-btn--has-img" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onCertClick(item.certId || item.name);
                        }}
                        title={`Click to view certificate: ${item.name}`}
                      >
                        <span className="book3d-cert-dot" aria-hidden="true" />
                        <span className="book3d-cert-title">{item.name}</span>
                        {hasImage ? (
                          <span className="book3d-cert-img-badge" title="Official Certificate Image Available">
                            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <span>Image</span>
                          </span>
                        ) : (
                          <span className="book3d-cert-view-cue" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {page.interactiveHint && (
            <div className="book3d-cert-hint">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>{page.interactiveHint}</span>
            </div>
          )}
        </div>
      )}

      {page.quote && (
        <blockquote className="book3d-page__quote">
          {page.quote}
        </blockquote>
      )}

      {page.image && (
        <div className="book3d-page__image-wrap">
          <img
            src={page.image}
            alt={page.caption || "Page visual"}
            className="book3d-page__image"
          />
          {page.caption && (
            <span className="book3d-page__caption">{page.caption}</span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Interactive Certificate Lightbox Modal
 * Displays certificate images (e.g. Cisco, Oracle) or structured credential cards with full navigation
 */
function CertificateViewerModal({
  cert,
  onClose,
  onSelectCert,
}: {
  cert: CertCredential;
  onClose: () => void;
  onSelectCert: (cert: CertCredential) => void;
}) {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const currentIndex = CERTIFICATIONS.findIndex((c) => c.id === cert.id);

  const handleNextCert = () => {
    const nextIdx = (currentIndex + 1) % CERTIFICATIONS.length;
    onSelectCert(CERTIFICATIONS[nextIdx]);
    setIsZoomed(false);
  };

  const handlePrevCert = () => {
    const prevIdx = (currentIndex - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length;
    onSelectCert(CERTIFICATIONS[prevIdx]);
    setIsZoomed(false);
  };

  useEffect(() => {
    const handleModalKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNextCert();
      } else if (e.key === "ArrowLeft") {
        handlePrevCert();
      }
    };
    window.addEventListener("keydown", handleModalKey);
    return () => window.removeEventListener("keydown", handleModalKey);
  }, [currentIndex]);

  return (
    <div
      className="cert-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${cert.name}`}
      onClick={onClose}
    >
      <div className="cert-modal-backdrop" aria-hidden="true" />

      <div
        className={`cert-modal-card ${isZoomed ? "cert-modal-card--zoomed" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar header */}
        <header className="cert-modal-header">
          <div className="cert-modal-badge-group">
            <span className="cert-modal-category">{cert.category}</span>
            {cert.image && (
              <span className="cert-modal-verified-pill">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Official Certificate
              </span>
            )}
          </div>

          <div className="cert-modal-actions">
            {cert.image && (
              <button
                type="button"
                className="cert-modal-btn cert-modal-btn--zoom"
                onClick={() => setIsZoomed(!isZoomed)}
                title={isZoomed ? "Zoom out" : "Zoom in"}
                aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                  {isZoomed ? (
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  ) : (
                    <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35M11 8v6M8 11h6" />
                  )}
                </svg>
              </button>
            )}

            <button
              type="button"
              className="cert-modal-btn cert-modal-btn--close"
              onClick={onClose}
              title="Close viewer (Esc)"
              aria-label="Close viewer (Esc)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span className="cert-modal-esc">ESC</span>
            </button>
          </div>
        </header>

        {/* Certificate Display Area */}
        <div className="cert-modal-display-wrap">
          {/* Navigation arrow left */}
          <button
            type="button"
            className="cert-modal-nav-btn cert-modal-nav-btn--prev"
            onClick={handlePrevCert}
            title="Previous Certificate (Left Arrow)"
            aria-label="Previous Certificate"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Certificate Main Visual */}
          <div className="cert-modal-body">
            {cert.image ? (
              <div
                className={`cert-modal-image-shell ${isZoomed ? "cert-modal-image-shell--zoomed" : ""}`}
                onClick={() => setIsZoomed(!isZoomed)}
                title="Click to toggle zoom"
              >
                <img
                  src={cert.image}
                  alt={`${cert.name} Certificate`}
                  className="cert-modal-image"
                />
              </div>
            ) : (
              <div className="cert-modal-placeholder-card">
                <div className="cert-placeholder-seal">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </div>
                <span className="cert-placeholder-org">{cert.issuer}</span>
                <h3 className="cert-placeholder-title">{cert.name}</h3>
                <p className="cert-placeholder-recipient">
                  Awarded to <strong>{cert.recipient || "Lescy G. Caadlawon"}</strong>
                </p>
                <div className="cert-placeholder-badge-notice">
                  <span className="cert-placeholder-dot" />
                  <span>Certificate Image upload in progress — Verified Credential</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation arrow right */}
          <button
            type="button"
            className="cert-modal-nav-btn cert-modal-nav-btn--next"
            onClick={handleNextCert}
            title="Next Certificate (Right Arrow)"
            aria-label="Next Certificate"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Certificate Metadata Footer */}
        <footer className="cert-modal-meta">
          <div className="cert-modal-meta__main">
            <div className="cert-modal-meta__head">
              <h3 className="cert-modal-meta__title">{cert.name}</h3>
              <span className="cert-modal-meta__issuer">
                {cert.issuer} {cert.issueDate ? `• Issued ${cert.issueDate}` : ""}
              </span>
            </div>

            {cert.description && (
              <p className="cert-modal-meta__desc">{cert.description}</p>
            )}

            {cert.skills && cert.skills.length > 0 && (
              <div className="cert-modal-skills">
                <span className="cert-modal-skills__label">Verified Skills:</span>
                <div className="cert-modal-skills__pills">
                  {cert.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="cert-modal-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {cert.credentialId && (
            <div className="cert-modal-meta__id-badge">
              <span className="cert-modal-id-label">Credential ID</span>
              <code className="cert-modal-id-val">{cert.credentialId}</code>
            </div>
          )}
        </footer>

        {/* Quick Certificate Switcher Strip */}
        <div className="cert-modal-strip">
          <div className="cert-modal-strip__inner">
            {CERTIFICATIONS.map((c, idx) => {
              const isSelected = c.id === cert.id;
              const hasImg = Boolean(c.image);

              return (
                <button
                  key={c.id}
                  type="button"
                  className={`cert-modal-thumb-btn ${isSelected ? "cert-modal-thumb-btn--active" : ""}`}
                  onClick={() => {
                    onSelectCert(c);
                    setIsZoomed(false);
                  }}
                  title={c.name}
                >
                  <span className="cert-thumb-index">{idx + 1}</span>
                  <span className="cert-thumb-label">{c.shortName || c.name}</span>
                  {hasImg && <span className="cert-thumb-img-dot" title="Has image" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Book3D() {
  // State: 0 = Closed (Front Cover), 1..spreads.length = Open Spreads, spreads.length + 1 = Closed (Back Cover)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isTurning, setIsTurning] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<CertCredential | null>(null);

  const bookRef = useRef<HTMLDivElement>(null);

  const handleOpenCert = (identifier: string) => {
    const cert = findCert(identifier);
    if (cert) {
      setSelectedCert(cert);
    } else {
      // Fallback for custom entries
      setSelectedCert({
        id: identifier.toLowerCase().replace(/\s+/g, "-"),
        name: identifier,
        issuer: "Accredited Organization",
        category: "Industry Credential",
        recipient: "Lescy G. Caadlawon",
        description: "Official credential details being indexed.",
      });
    }
  };

  const handleNext = () => {
    if (isTurning) return;
    if (currentStep <= spreads.length) {
      setIsTurning(true);
      setCurrentStep((prev) => prev + 1);
      setTimeout(() => setIsTurning(false), 600);
    } else {
      // Loop back to cover
      setIsTurning(true);
      setCurrentStep(0);
      setTimeout(() => setIsTurning(false), 600);
    }
  };

  const handlePrev = () => {
    if (isTurning) return;
    if (currentStep > 0) {
      setIsTurning(true);
      setCurrentStep((prev) => prev - 1);
      setTimeout(() => setIsTurning(false), 600);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (selectedCert) return; // Don't handle book flips when cert modal is open

    if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  // Lock body scroll and listen for ESC key when maximized or when cert modal is open
  useEffect(() => {
    if (isMaximized || selectedCert) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleGlobalEsc = (e: globalThis.KeyboardEvent) => {
        if (e.key === "Escape") {
          if (selectedCert) {
            setSelectedCert(null);
          } else if (isMaximized) {
            setIsMaximized(false);
          }
        }
      };

      window.addEventListener("keydown", handleGlobalEsc);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleGlobalEsc);
      };
    }
  }, [isMaximized, selectedCert, currentStep, isTurning]);

  useEffect(() => {
    const handleGlobalKey = (e: globalThis.KeyboardEvent) => {
      if (selectedCert) return;
      if (!isMaximized && bookRef.current && bookRef.current.contains(document.activeElement)) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [currentStep, isTurning, isMaximized, selectedCert]);

  const isOpen = currentStep >= 1 && currentStep <= spreads.length;
  const isBackCover = currentStep > spreads.length;
  const activeSpread = isOpen ? spreads[currentStep - 1] : spreads[0];

  // Helper to render the book stage (reused in both standard and maximized views)
  const renderBookStage = (maximizedMode = false) => {
    return (
      <div
        className={`book3d-stage ${maximizedMode ? "book3d-stage--maximized" : ""}`}
      >
        {/* CASE 1: FRONT COVER (Step 0) */}
        {currentStep === 0 && (
          <div
            className="book3d-cover book3d-cover--front"
            onClick={handleNext}
            title="Click to open the book"
          >
            {/* Book Spine Texture */}
            <div className="book3d-spine-edge" aria-hidden="true" />

            {/* Front Cover Artwork */}
            <div className="book3d-cover__content">
              <div className="book3d-cover__header-row">
                <h3 className="book3d-cover__title">
                  My Journey <span>education &amp; honors</span>
                </h3>
                {!maximizedMode && (
                  <button
                    type="button"
                    className="book3d-cover__max-shortcut"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMaximized(true);
                    }}
                    title="Maximize Book"
                    aria-label="Maximize Book"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="book3d-cover__art-wrap">
                <img
                  src="/academic-cover-portrait.jpg"
                  alt="Lescy Graduation Portrait"
                  className="book3d-cover__art"
                />
              </div>
            </div>

            {/* Layered 3D Page Edge Stack (Right Edge) */}
            <div className="book3d-page-edges" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
          </div>
        )}

        {/* CASE 2: OPEN 2-PAGE SPREAD (Steps 1..N) */}
        {isOpen && activeSpread && (
          <div
            className={`book3d-spread ${maximizedMode ? "book3d-spread--maximized" : ""}`}
            role="group"
            aria-label={`Spread ${currentStep} of ${spreads.length}`}
          >
            {/* Left Page (Click to go to previous spread) */}
            <div
              className={`book3d-page book3d-page--left ${maximizedMode ? "book3d-page--maximized" : ""}`}
              onClick={handlePrev}
              title="Click left page to turn back"
            >
              <PageInner
                page={activeSpread.leftPage}
                pageNumber={currentStep * 2 - 1}
                onCertClick={handleOpenCert}
              />
              <div
                className="book3d-page__spine-gutter book3d-page__spine-gutter--left"
                aria-hidden="true"
              />
            </div>

            {/* Book Center Binding Crease */}
            <div className="book3d-center-binding" aria-hidden="true" />

            {/* Right Page (Click to turn to next spread) */}
            <div
              className={`book3d-page book3d-page--right ${maximizedMode ? "book3d-page--maximized" : ""}`}
              onClick={handleNext}
              title="Click right page to turn next"
            >
              <PageInner
                page={activeSpread.rightPage}
                pageNumber={currentStep * 2}
                onCertClick={handleOpenCert}
              />
              <div
                className="book3d-page__spine-gutter book3d-page__spine-gutter--right"
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        {/* CASE 3: BACK COVER (Step N+1) */}
        {isBackCover && (
          <div
            className="book3d-cover book3d-cover--back"
            onClick={handleNext}
            title="Click to restart from cover"
          >
            <div
              className="book3d-spine-edge book3d-spine-edge--back"
              aria-hidden="true"
            />
            <div className="book3d-cover__content book3d-cover__content--back">
              <div className="book3d-cover__seal">🏛️</div>
              <h3 className="book3d-cover__title book3d-cover__title--back">
                The Academic Chronicles
              </h3>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Standard Section Book Container */}
      <div
        ref={bookRef}
        className={`book3d-wrapper ${isOpen ? "book3d-wrapper--open" : ""} ${
          isBackCover ? "book3d-wrapper--back" : ""
        }`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label="Interactive 3D Flipping Book of Education and Honors"
      >
        {/* 3D Realistic Shadow on Floor */}
        <div
          className={`book3d-shadow ${isTurning ? "book3d-shadow--turning" : ""}`}
          aria-hidden="true"
        />

        {/* Main 3D Book Stage */}
        {renderBookStage(false)}
      </div>

      {/* =========================================================================
          MAXIMIZED ENLARGED FLOATING BOOK OVERLAY
          ========================================================================= */}
      {isMaximized && (
        <div
          className="book3d-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Maximized Journey Book"
          onClick={() => setIsMaximized(false)}
        >
          {/* Atmospheric Backdrop Blur */}
          <div className="book3d-modal-backdrop" aria-hidden="true" />

          {/* Floating Stage Container with 3D Depth & Levitation */}
          <div
            className={`book3d-maximized-container ${
              isOpen ? "book3d-maximized-container--open" : ""
            } ${isBackCover ? "book3d-maximized-container--back" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Header with Minimize / Close Button */}
            <div className="book3d-maximized-header">
              <button
                type="button"
                className="book3d-modal-close-btn"
                onClick={() => setIsMaximized(false)}
                aria-label="Minimize Book (Esc)"
                title="Minimize Book (Esc)"
              >
                <span className="book3d-modal-close-btn__text">Minimize</span>
                <span className="book3d-modal-close-btn__icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
                  </svg>
                </span>
                <kbd className="book3d-esc-key">ESC</kbd>
              </button>
            </div>

            {/* The Levitating Enlarged Floating Book Wrapper */}
            <div className="book3d-floating-book-shell">
              {renderBookStage(true)}

              {/* Atmospheric Floor Levitation Shadow */}
              <div
                className={`book3d-modal-shadow ${
                  isOpen ? "book3d-modal-shadow--open" : ""
                }`}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE CERTIFICATE IMAGE LIGHTBOX MODAL
          ========================================================================= */}
      {selectedCert && (
        <CertificateViewerModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
          onSelectCert={(c) => setSelectedCert(c)}
        />
      )}
    </>
  );
}
