import { useState, useEffect, useRef, type KeyboardEvent } from "react";

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
  certList?: { category: string; items: string[] }[];
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
      quote: "“In engineering and design, true craft is born at the intersection of mathematical rigor and aesthetic intuition.”",
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
        { label: "Accreditations", value: "8+ Industry Certifications" },
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
      tag: "Industry Certifications",
      certList: [
        {
          category: "Backend & Cloud",
          items: [
            "Web Development (Laravel)",
            "Oracle Cloud AI Associate",
            "GitHub Foundations",
          ],
        },
        {
          category: "Security",
          items: [
            "Junior Cybersecurity Analyst Career Path (CISCO)",
          ],
        },
        {
          category: "AI & Product",
          items: [
            "Prompt Engineering (IBM)",
            "GenAI (Google)",
            "UX Design (IBM)",
            "Technical Support (Google)",
          ],
        },
      ],
    },
  },
  {
    id: "spread-3",
    leftPage: {
      tag: "Chapter 03 • Merit Grants",
      quote: "“Opportunity unlocks when dedication meets academic consistency — fueling research, innovation, and community leadership.”",
      image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&w=700&q=85",
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
}: {
  page: BookPageContent;
  pageNumber: number;
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
                <span key={i} className="book3d-page__pill">
                  {pill}
                </span>
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
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="book3d-cert-item">
                    <span className="book3d-cert-dot" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
  // State: 0 = Closed (Front Cover), 1..spreads.length = Open Spreads, spreads.length + 1 = Closed (Back Cover)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isTurning, setIsTurning] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const bookRef = useRef<HTMLDivElement>(null);

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
    if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  // Lock body scroll and listen for ESC key when maximized
  useEffect(() => {
    if (isMaximized) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleGlobalEsc = (e: globalThis.KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMaximized(false);
        } else if (e.key === "ArrowRight") {
          handleNext();
        } else if (e.key === "ArrowLeft") {
          handlePrev();
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
      if (!isMaximized && bookRef.current && bookRef.current.contains(document.activeElement)) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [currentStep, isTurning, isMaximized]);

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
          MAXIMIZED ENLARGED FLOATING BOOK OVERLAY ("Floating Ganon" Effect)
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
              {/* The Enlarged 3D Book Stage */}
              {renderBookStage(true)}

              {/* Atmospheric Floor Levitation Shadow ("Floating Ganon" Physics) */}
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
    </>
  );
}
