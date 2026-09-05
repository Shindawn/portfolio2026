import { useState, useEffect, useRef, type KeyboardEvent } from "react";

export interface BookBadgeItem {
  id: string;
  name: string;
  shortName?: string;
  badgeImg: string;
  url: string;
  skillsCount?: number;
}

export interface BookBadgeSummary {
  badges?: string;
  skills?: string;
  dynamic?: boolean;
}

export interface BookPageContent {
  tag: string;
  title?: string;
  subtitle?: string;
  badgeSummary?: BookBadgeSummary;
  description?: string;
  stats?: { label: string; value: string }[];
  pills?: string[];
  quote?: string;
  image?: string;
  caption?: string;
  badges?: BookBadgeItem[];
}

export interface BookSpread {
  id: string;
  leftPage: BookPageContent;
  rightPage: BookPageContent;
}

export interface CertModalItem {
  title: string;
  issuer: string;
  category?: string;
  image?: string;
  badgeImg?: string;
  verifyUrl?: string;
}

const CERT_METADATA_MAP: Record<string, CertModalItem> = {
  "google": {
    title: "Google: Technical Support Fundamentals",
    issuer: "Google (Coursera)",
    category: "Cloud & IT Systems",
    badgeImg: "/certs/badges/google-coursera-badge.png",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/Q4AA46Z0D7I4",
  },
  "asean": {
    title: "ASEAN Foundation: AI Readiness & Literacy",
    issuer: "ASEAN Foundation & Microsoft",
    category: "Artificial Intelligence",
    image: "/certs/asean-ai-readiness.png",
    badgeImg: "/certs/badges/asean-foundation-badge.png",
  },
  "figma": {
    title: "Figma for Developers",
    issuer: "Frontend Masters",
    category: "UI/UX & Product Design",
    image: "/certs/frontend-masters-figma.png",
  },
  "dict ms tools": {
    title: "Productivity Tools with Microsoft 365",
    issuer: "Department of Information and Communications Technology (DICT)",
    category: "Cloud Productivity",
    image: "/certs/dict-ms-tools.png",
    badgeImg: "/certs/badges/dict-badge.png",
  },
  "ms tools": {
    title: "Productivity Tools with Microsoft 365",
    issuer: "Department of Information and Communications Technology (DICT)",
    category: "Cloud Productivity",
    image: "/certs/dict-ms-tools.png",
    badgeImg: "/certs/badges/dict-badge.png",
  },
  "dict devops": {
    title: "DevOps & Cloud Engineering",
    issuer: "DICT & DTI-CAR",
    category: "DevOps & Infrastructure",
    image: "/certs/dict-car-devops.png",
    badgeImg: "/certs/badges/dict-badge.png",
  },
  "dict car": {
    title: "DevOps & Cloud Engineering",
    issuer: "DICT & DTI-CAR",
    category: "DevOps & Infrastructure",
    image: "/certs/dict-car-devops.png",
    badgeImg: "/certs/badges/dict-badge.png",
  },
  "dti-car": {
    title: "DevOps & Cloud Engineering",
    issuer: "DICT & DTI-CAR",
    category: "DevOps & Infrastructure",
    image: "/certs/dict-car-devops.png",
    badgeImg: "/certs/badges/dict-badge.png",
  },
  "cisco cyber": {
    title: "Cisco Junior Cybersecurity Analyst",
    issuer: "Cisco Networking Academy",
    category: "Cybersecurity",
    image: "/certs/cisco-cybersecurity.jpg",
    badgeImg: "/certs/badges/cisco-badge.png",
    verifyUrl: "https://www.credly.com/badges/d0df2177-dda6-45bd-a825-99b28483e872/public_url",
  },
  "cisco": {
    title: "Cisco Junior Cybersecurity Analyst",
    issuer: "Cisco Networking Academy",
    category: "Cybersecurity",
    image: "/certs/cisco-cybersecurity.jpg",
    badgeImg: "/certs/badges/cisco-badge.png",
    verifyUrl: "https://www.credly.com/badges/d0df2177-dda6-45bd-a825-99b28483e872/public_url",
  },
  "oracle": {
    title: "Oracle Cloud AI Foundations 2025",
    issuer: "Oracle University",
    category: "Cloud AI Foundations",
    image: "/certs/oracle-cloud-ai.jpg",
    badgeImg: "/certs/badges/oracle-badge.png",
    verifyUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=84CF78EC86445F84F83A7A554B724E21FB07D74E6411CEFB48A6E412BE55BC7E",
  },
  "dti-albay coursera": {
    title: "DTI-Albay Coursera Scholarship Program",
    issuer: "Department of Trade and Industry & Coursera",
    category: "Verified Grant",
    badgeImg: "/certs/badges/google-coursera-badge.png",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/Q4AA46Z0D7I4",
  },
  "datacamp": {
    title: "Large Language Models (LLMs) Concepts",
    issuer: "DataCamp",
    category: "Generative AI",
    badgeImg: "/certs/badges/datacamp-llm-badge.png",
    verifyUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/7fb144e834b8b7a624cbdac1517dd6131ebc3220",
  },
  "datacamp llms": {
    title: "Large Language Models (LLMs) Concepts",
    issuer: "DataCamp",
    category: "Generative AI",
    badgeImg: "/certs/badges/datacamp-llm-badge.png",
    verifyUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/7fb144e834b8b7a624cbdac1517dd6131ebc3220",
  },
  "github education": {
    title: "GitHub Developer Student Pack",
    issuer: "GitHub Education",
    category: "Developer Ecosystem",
    verifyUrl: "https://education.github.com",
  },
  "hackerrank": {
    title: "HackerRank SQL (Advanced) 5★",
    issuer: "HackerRank",
    category: "Databases & Algorithms",
    badgeImg: "/certs/badges/hackerrank-sql-badge.png",
    verifyUrl: "https://www.hackerrank.com/certificates/69cfd4dd5b46",
  },
  "hackerrank sql 5★": {
    title: "HackerRank SQL (Advanced) 5★",
    issuer: "HackerRank",
    category: "Databases & Algorithms",
    badgeImg: "/certs/badges/hackerrank-sql-badge.png",
    verifyUrl: "https://www.hackerrank.com/certificates/69cfd4dd5b46",
  },
  "microsoft learn": {
    title: "Microsoft Learn Cloud & DevOps Modules",
    issuer: "Microsoft Learn",
    category: "Cloud Engineering",
    badgeImg: "/certs/badges/microsoft-learn.png",
    verifyUrl: "https://learn.microsoft.com/en-us/users/lecgdawnshinee-6332/achievements/7k98s4gz",
  },
  "ibm ai": {
    title: "IBM SkillsBuild: Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild (Credly)",
    category: "Artificial Intelligence",
    badgeImg: "/certs/badges/ibm-ai-fundamentals.png",
    verifyUrl: "https://www.credly.com/badges/534366e6-3fe5-4e62-abc7-72fb15611785/public_url",
  },
  "cyber threat management": {
    title: "Cisco: Cyber Threat Management",
    issuer: "Cisco Networking Academy (Credly)",
    category: "Cybersecurity",
    badgeImg: "/certs/badges/cisco-threat-management.png",
    verifyUrl: "https://www.credly.com/badges/38cc93ce-fbce-457e-a2db-7490aa6a8d12/public_url",
  },
  "networking basics": {
    title: "Cisco: Networking Basics",
    issuer: "Cisco Networking Academy (Credly)",
    category: "Computer Networks",
    badgeImg: "/certs/badges/cisco-networking-basics.png",
    verifyUrl: "https://www.credly.com/badges/70efa984-ef48-40df-9585-c8c15f87b1f8/public_url",
  },
};

function getCertModalInfo(key: string, badgeItem?: BookBadgeItem): CertModalItem {
  const norm = key.toLowerCase().trim();
  if (CERT_METADATA_MAP[norm]) {
    const data = CERT_METADATA_MAP[norm];
    if (badgeItem) {
      return {
        ...data,
        badgeImg: badgeItem.badgeImg || data.badgeImg,
        verifyUrl: badgeItem.url.startsWith("http") ? badgeItem.url : data.verifyUrl,
        image: badgeItem.url.startsWith("/certs/") ? badgeItem.url : data.image,
      };
    }
    return data;
  }
  for (const k of Object.keys(CERT_METADATA_MAP)) {
    if (norm.includes(k) || k.includes(norm)) {
      const data = CERT_METADATA_MAP[k];
      return badgeItem
        ? {
            ...data,
            badgeImg: badgeItem.badgeImg || data.badgeImg,
            verifyUrl: badgeItem.url.startsWith("http") ? badgeItem.url : data.verifyUrl,
            image: badgeItem.url.startsWith("/certs/") ? badgeItem.url : data.image,
          }
        : data;
    }
  }
  if (badgeItem) {
    return {
      title: badgeItem.name,
      issuer: "Verified Credential",
      category: "Accreditation",
      badgeImg: badgeItem.badgeImg,
      verifyUrl: badgeItem.url.startsWith("http") ? badgeItem.url : undefined,
      image: badgeItem.url.startsWith("/certs/") ? badgeItem.url : undefined,
    };
  }
  return {
    title: key,
    issuer: "Verified Credential",
    category: "Accreditation",
    image: undefined,
  };
}

const ALL_BADGES: BookBadgeItem[] = [
  {
    id: "oracle-cloud-ai",
    name: "Oracle Cloud AI Foundations 2025",
    shortName: "Oracle AI",
    badgeImg: "/certs/badges/oracle-badge.png",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=84CF78EC86445F84F83A7A554B724E21FB07D74E6411CEFB48A6E412BE55BC7E",
    skillsCount: 6,
  },
  {
    id: "google-coursera-support",
    name: "Google: Technical Support Fundamentals (Coursera)",
    shortName: "Google Tech",
    badgeImg: "/certs/badges/google-coursera-badge.png",
    url: "https://www.coursera.org/account/accomplishments/verify/Q4AA46Z0D7I4",
    skillsCount: 7,
  },
  {
    id: "ibm-ai-fundamentals",
    name: "IBM SkillsBuild: Artificial Intelligence Fundamentals (Credly)",
    shortName: "IBM AI",
    badgeImg: "/certs/badges/ibm-ai-fundamentals.png",
    url: "https://www.credly.com/badges/534366e6-3fe5-4e62-abc7-72fb15611785/public_url",
    skillsCount: 6,
  },
  {
    id: "cisco-threat-management",
    name: "Cisco: Cyber Threat Management (Credly)",
    shortName: "Threat Mgmt",
    badgeImg: "/certs/badges/cisco-threat-management.png",
    url: "https://www.credly.com/badges/38cc93ce-fbce-457e-a2db-7490aa6a8d12/public_url",
    skillsCount: 7,
  },
  {
    id: "cisco-cybersecurity",
    name: "Cisco Junior Cybersecurity Analyst",
    shortName: "Cisco Cyber",
    badgeImg: "/certs/badges/cisco-badge.png",
    url: "/certs/cisco-cybersecurity.jpg",
    skillsCount: 6,
  },
  {
    id: "cisco-intro-cyber",
    name: "Cisco Introduction to Cybersecurity (Credly)",
    shortName: "Security",
    badgeImg: "/certs/badges/cisco-intro-cyber.png",
    url: "https://www.credly.com/badges/d0df2177-dda6-45bd-a825-99b28483e872/public_url",
    skillsCount: 5,
  },
  {
    id: "cisco-networking-basics",
    name: "Cisco Networking Basics (Credly)",
    shortName: "Networking",
    badgeImg: "/certs/badges/cisco-networking-basics.png",
    url: "https://www.credly.com/badges/70efa984-ef48-40df-9585-c8c15f87b1f8/public_url",
    skillsCount: 6,
  },
  {
    id: "datacamp-llm",
    name: "DataCamp: Large Language Models (LLMs) Concepts",
    shortName: "DataCamp LLMs",
    badgeImg: "/certs/badges/datacamp-llm-badge.png",
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/7fb144e834b8b7a624cbdac1517dd6131ebc3220",
    skillsCount: 5,
  },
  {
    id: "datacamp-python",
    name: "DataCamp: Introduction to Python",
    shortName: "Python",
    badgeImg: "/certs/badges/datacamp-llm-badge.png",
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/5abbb908ff646f2f8c87e7edd31db67fb8ad5731",
    skillsCount: 5,
  },
  {
    id: "datacamp-git",
    name: "DataCamp: Introduction to Git",
    shortName: "Git",
    badgeImg: "/certs/badges/datacamp-llm-badge.png",
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/71563862d53f5c3733bd867e7598760a74bad99c",
    skillsCount: 4,
  },
  {
    id: "datacamp-r",
    name: "DataCamp: Introduction to R",
    shortName: "R Lang",
    badgeImg: "/certs/badges/datacamp-llm-badge.png",
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/f74da122c50bb715af38e632d34967ed90ba0cb0",
    skillsCount: 4,
  },
  {
    id: "datacamp-shell",
    name: "DataCamp: Introduction to Shell",
    shortName: "Shell",
    badgeImg: "/certs/badges/datacamp-llm-badge.png",
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/331df5547d466a8ce3040a1817b252cf92c800f9",
    skillsCount: 4,
  },
  {
    id: "hackerrank-sql-basic",
    name: "HackerRank SQL Skill Certifications (5★ Gold)",
    shortName: "SQL 5★",
    badgeImg: "/certs/badges/hackerrank-sql-badge.png",
    url: "https://www.hackerrank.com/certificates/69cfd4dd5b46",
    skillsCount: 5,
  },
  {
    id: "dict-car-devops",
    name: "DICT CAR Cloud and DevOps Basics",
    shortName: "DICT DevOps",
    badgeImg: "/certs/badges/dict-badge.png",
    url: "/certs/dict-car-devops.png",
    skillsCount: 5,
  },
  {
    id: "microsoft-learn",
    name: "Microsoft Learn Achievements & Cloud Tracks",
    shortName: "MS Learn",
    badgeImg: "/certs/badges/microsoft-learn.png",
    url: "https://learn.microsoft.com/en-us/users/lecgdawnshinee-6332/achievements/7k98s4gz?ref=https%3A%2F%2Fwww.linkedin.com%2F",
    skillsCount: 5,
  },
];

const spreads: BookSpread[] = [
  {
    id: "spread-1",
    leftPage: {
      tag: "Vol. 01 • Academic Roots",
      quote:
        "“True engineering elegance is forged at the intersection of rigorous theory, architectural discipline, and relentless real-world execution.”",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=85",
      caption: "Collegiate computing & systems laboratory research.",
    },
    rightPage: {
      tag: "Chapter 01 • University Degree",
      title: "Bachelor of Science in Information Technology",
      subtitle: "Catanduanes State University (2022–2026)",
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
      tag: "Chapter 02 • Awards & Honors",
      title: "Scholastic Honors & Certs",
      subtitle: "Multi-Year Dean’s List Distinction",
      description:
        "Awarded continuous Dean’s Honor Roll recognition throughout 2022–2026, complemented by verified industry credentials across Cloud, Security, AI, and Systems Engineering.",
      stats: [
        { label: "Honors", value: "Dean’s Lister (2022–2026)" },
        { label: "Accreditations", value: "15+ Verified Credentials" },
      ],
      pills: [
        "Google",
        "ASEAN",
        "Figma",
        "DICT MS Tools",
        "DICT DevOps",
      ],
    },
    rightPage: {
      tag: "Chapter 02 • Verified Badges",
      title: "Accredited Badges & Certs",
      badgeSummary: {
        dynamic: true,
      },
      badges: ALL_BADGES,
    },
  },
  {
    id: "spread-3",
    leftPage: {
      tag: "Vol. 02 • Merit & Grants",
      quote:
        "“Opportunity unlocks when dedication meets academic consistency — fueling research, innovation, and community leadership.”",
      image:
        "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=700&q=85",
      caption: "Tertiary scholarship & institutional research grant.",
    },
    rightPage: {
      tag: "Chapter 03 • Merit Grants",
      title: "Scholarships & Affiliations",
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
  onOpenCert,
}: {
  page: BookPageContent;
  pageNumber: number;
  onOpenCert: (cert: CertModalItem) => void;
}) {
  // Real-time dynamic calculation of verified badges and accredited skills
  const badgesList = page.badges || (page.badgeSummary ? ALL_BADGES : []);
  const liveBadgeCount = badgesList.length;
  const liveSkillsCount = badgesList.reduce(
    (total, b) => total + (b.skillsCount || 5),
    0
  );

  const displayBadges =
    page.badgeSummary?.badges || `${liveBadgeCount} Badges`;
  const displaySkills =
    page.badgeSummary?.skills || `${liveSkillsCount} Skills`;

  return (
    <div className="book3d-page__inner">
      <div className="book3d-page__header">
        <span className="book3d-page__tag">{page.tag}</span>
        <span className="book3d-page__number">{pageNumber}</span>
      </div>

      {page.title && (
        <div className="book3d-page__main-content">
          <h4 className="book3d-page__title">{page.title}</h4>
          
          {page.badgeSummary ? (
            <div className="book3d-badge-summary-bar">
              <span className="book3d-badge-summary-item book3d-badge-summary-item--badges">
                <span className="book3d-badge-summary-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="8" r="6" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </span>
                <span className="book3d-badge-summary-val">{displayBadges}</span>
              </span>
              <span className="book3d-badge-summary-sep" aria-hidden="true">•</span>
              <span className="book3d-badge-summary-item book3d-badge-summary-item--skills">
                <span className="book3d-badge-summary-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
                <span className="book3d-badge-summary-val">{displaySkills}</span>
              </span>
            </div>
          ) : (
            page.subtitle && (
              <p className="book3d-page__subtitle">{page.subtitle}</p>
            )
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
              {page.pills.map((pill, i) => {
                const certInfo = getCertModalInfo(pill);
                return (
                  <button
                    key={i}
                    type="button"
                    className="book3d-page__pill book3d-page__pill--clickable"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCert(certInfo);
                    }}
                    title={`View certificate for ${pill}`}
                  >
                    {pill} ↗
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* All Verified Badges in One Page (Cute Responsive Floating Grid) */}
      {page.badges && (
        <div className="book3d-badges-showcase">
          <div className="book3d-badges-grid-cute">
            {page.badges.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                className={`book3d-badge-cute-btn book3d-badge-cute-btn--pos-${idx % 4}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCert(getCertModalInfo(b.shortName || b.name, b));
                }}
                title={`View ${b.name}`}
                aria-label={`View certificate for ${b.name}`}
              >
                <div className="book3d-badge-cute-img-wrap">
                  <img
                    src={b.badgeImg}
                    alt={`${b.name} Badge`}
                    className="book3d-badge-cute-img"
                  />
                </div>
                <span className="book3d-badge-cute-tooltip">
                  {b.shortName || b.name} ↗
                </span>
              </button>
            ))}
          </div>
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

export default function Book3D() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isTurning, setIsTurning] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<CertModalItem | null>(null);

  const bookRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (isTurning) return;
    if (currentStep <= spreads.length) {
      setIsTurning(true);
      setCurrentStep((prev) => prev + 1);
      setTimeout(() => setIsTurning(false), 600);
    } else {
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
    if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  // Keyboard and body scroll lock for cert modal
  useEffect(() => {
    if (selectedCert) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleCertEsc = (e: globalThis.KeyboardEvent) => {
        if (e.key === "Escape") {
          setSelectedCert(null);
        }
      };

      window.addEventListener("keydown", handleCertEsc);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleCertEsc);
      };
    }
  }, [selectedCert]);

  useEffect(() => {
    if (isMaximized) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleGlobalEsc = (e: globalThis.KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMaximized(false);
        }
      };

      window.addEventListener("keydown", handleGlobalEsc);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleGlobalEsc);
      };
    }
  }, [isMaximized, currentStep, isTurning]);

  useEffect(() => {
    const handleGlobalKey = (e: globalThis.KeyboardEvent) => {
      if (!isMaximized && !selectedCert && bookRef.current && bookRef.current.contains(document.activeElement)) {
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

  const renderBookStage = (maximizedMode = false) => {
    return (
      <div
        className={`book3d-stage ${maximizedMode ? "book3d-stage--maximized" : ""}`}
      >
        {/* CASE 1: FRONT COVER */}
        {currentStep === 0 && (
          <div
            className="book3d-cover book3d-cover--front"
            onClick={handleNext}
            title="Click to open the book"
          >
            <div className="book3d-spine-edge" aria-hidden="true" />

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

            <div className="book3d-page-edges" aria-hidden="true">
              <span /><span /><span /><span />
            </div>
          </div>
        )}

        {/* CASE 2: OPEN 2-PAGE SPREAD */}
        {isOpen && activeSpread && (
          <div
            className={`book3d-spread ${maximizedMode ? "book3d-spread--maximized" : ""}`}
            role="group"
            aria-label={`Spread ${currentStep} of ${spreads.length}`}
          >
            <div
              className={`book3d-page book3d-page--left ${maximizedMode ? "book3d-page--maximized" : ""}`}
              onClick={handlePrev}
              title="Click left page to turn back"
            >
              <PageInner
                page={activeSpread.leftPage}
                pageNumber={currentStep * 2 - 1}
                onOpenCert={setSelectedCert}
              />
              <div
                className="book3d-page__spine-gutter book3d-page__spine-gutter--left"
                aria-hidden="true"
              />
            </div>

            <div className="book3d-center-binding" aria-hidden="true" />

            <div
              className={`book3d-page book3d-page--right ${maximizedMode ? "book3d-page--right--turning" : ""} ${
                maximizedMode ? "book3d-page--maximized" : ""
              }`}
              onClick={handleNext}
              title="Click right page to turn next"
            >
              <PageInner
                page={activeSpread.rightPage}
                pageNumber={currentStep * 2}
                onOpenCert={setSelectedCert}
              />
              <div
                className="book3d-page__spine-gutter book3d-page__spine-gutter--right"
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        {/* CASE 3: BACK COVER */}
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
        <div
          className={`book3d-shadow ${isTurning ? "book3d-shadow--turning" : ""}`}
          aria-hidden="true"
        />

        {renderBookStage(false)}
      </div>

      {/* Maximized Overlay */}
      {isMaximized && (
        <div
          className="book3d-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Maximized Journey Book"
          onClick={() => setIsMaximized(false)}
        >
          <div className="book3d-modal-backdrop" aria-hidden="true" />

          <div
            className={`book3d-maximized-container ${
              isOpen ? "book3d-maximized-container--open" : ""
            } ${isBackCover ? "book3d-maximized-container--back" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
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

            <div className="book3d-floating-book-shell">
              {renderBookStage(true)}

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

      {/* Floating Certificate Lightbox Modal with Minimal Blur */}
      {selectedCert && (
        <div
          className="cert-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
          onClick={() => setSelectedCert(null)}
        >
          <div className="cert-modal-backdrop" aria-hidden="true" />
          <div
            className="cert-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-modal-header">
              <div className="cert-modal-badge-group">
                {selectedCert.category && (
                  <span className="cert-modal-category">{selectedCert.category}</span>
                )}
                <span className="cert-modal-verified-pill">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Verified Credential
                </span>
              </div>
              <div className="cert-modal-actions">
                {selectedCert.verifyUrl && (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-modal-btn cert-modal-btn--verify"
                    title="Open external verification in new tab"
                  >
                    <span>Verify ↗</span>
                  </a>
                )}
                <button
                  type="button"
                  className="cert-modal-btn"
                  onClick={() => setSelectedCert(null)}
                  aria-label="Close certificate modal"
                  title="Close (Esc)"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="cert-modal-display-wrap">
              <div className="cert-modal-body">
                {selectedCert.image ? (
                  <div className="cert-modal-image-shell">
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      className="cert-modal-image"
                    />
                  </div>
                ) : (
                  <div className="cert-modal-placeholder-card">
                    {selectedCert.badgeImg && (
                      <img
                        src={selectedCert.badgeImg}
                        alt={selectedCert.title}
                        style={{ width: "90px", height: "90px", objectFit: "contain", marginBottom: "1rem" }}
                      />
                    )}
                    <span className="cert-placeholder-org">{selectedCert.issuer}</span>
                    <h3 className="cert-placeholder-title">{selectedCert.title}</h3>
                    {selectedCert.verifyUrl && (
                      <a
                        href={selectedCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-placeholder-verify-link"
                      >
                        Verify on Issuer Portal ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="cert-modal-meta">
              <div className="cert-modal-meta__main">
                <h4 className="cert-modal-meta__title">{selectedCert.title}</h4>
                <span className="cert-modal-meta__issuer">{selectedCert.issuer}</span>
              </div>
              <span className="cert-modal-esc">Press ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
