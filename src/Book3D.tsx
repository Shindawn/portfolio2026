import { useState, useEffect, useRef, type KeyboardEvent } from "react";

export interface BookSpread {
  id: string;
  leftPage: {
    tag: string;
    quote?: string;
    title?: string;
    image?: string;
    caption?: string;
    text?: string;
  };
  rightPage: {
    tag: string;
    title: string;
    subtitle?: string;
    description: string;
    stats?: { label: string; value: string }[];
    pills?: string[];
    image?: string;
  };
}

const spreads: BookSpread[] = [
  {
    id: "spread-1",
    leftPage: {
      tag: "Vol. 01 • Academic Roots",
      quote: "“In engineering and design, true craft is born at the intersection of mathematical rigor and aesthetic intuition.”",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=85",
      caption: "University campus & late-night code lab.",
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
      tag: "Chapter 02 • Distinction",
      quote: "“Scholastic excellence is not a single achievement, but a disciplined habit of shipping clarity every single day.”",
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=700&q=85",
      caption: "Consecutive Academic Honor Roll recognition.",
    },
    rightPage: {
      tag: "Awards & Accreditations",
      title: "Scholastic Honors & Certs",
      subtitle: "Multi-Year Dean’s List Distinction",
      description:
        "Awarded continuous Dean’s Honor Roll recognition throughout 2022–2026, complemented by hands-on industry credentials in Full-Stack Web Development, RESTful API Design, and Cloud Foundations.",
      stats: [
        { label: "Honors", value: "Dean’s Lister (2022–2026)" },
        { label: "Credentials", value: "Full-Stack & Cloud Certified" },
      ],
      pills: ["Academic Honor Roll", "Cloud Architecture", "System Design"],
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
      pills: ["Full Academic Scholar", "Student Tech Leader", "Peer Mentor"],
    },
  },
];

export default function Book3D() {
  // State: 0 = Closed (Front Cover), 1..spreads.length = Open Spreads, spreads.length + 1 = Closed (Back Cover)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isTurning, setIsTurning] = useState<boolean>(false);
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

  useEffect(() => {
    const handleGlobalKey = (e: globalThis.KeyboardEvent) => {
      if (bookRef.current && bookRef.current.contains(document.activeElement)) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [currentStep, isTurning]);

  const isOpen = currentStep >= 1 && currentStep <= spreads.length;
  const isBackCover = currentStep > spreads.length;
  const activeSpread = isOpen ? spreads[currentStep - 1] : null;

  return (
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
      <div className={`book3d-shadow ${isTurning ? "book3d-shadow--turning" : ""}`} aria-hidden="true" />

      {/* Main 3D Book Stage */}
      <div className="book3d-stage">
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
              <h3 className="book3d-cover__title">
                My Journey <span>education &amp; honors</span>
              </h3>
              
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
          <div className="book3d-spread" role="group" aria-label={`Spread ${currentStep} of ${spreads.length}`}>
            {/* Left Page (Click to go to previous spread) */}
            <div
              className="book3d-page book3d-page--left"
              onClick={handlePrev}
              title="Click left page to turn back"
            >
              <div className="book3d-page__inner">
                <div className="book3d-page__header">
                  <span className="book3d-page__tag">{activeSpread.leftPage.tag}</span>
                  <span className="book3d-page__number">{currentStep * 2 - 1}</span>
                </div>

                {activeSpread.leftPage.quote && (
                  <blockquote className="book3d-page__quote">
                    {activeSpread.leftPage.quote}
                  </blockquote>
                )}

                {activeSpread.leftPage.image && (
                  <div className="book3d-page__image-wrap">
                    <img
                      src={activeSpread.leftPage.image}
                      alt={activeSpread.leftPage.caption || "Page visual"}
                      className="book3d-page__image"
                    />
                    {activeSpread.leftPage.caption && (
                      <span className="book3d-page__caption">{activeSpread.leftPage.caption}</span>
                    )}
                  </div>
                )}
              </div>
              {/* Subtle Page Spine Shadow */}
              <div className="book3d-page__spine-gutter book3d-page__spine-gutter--left" aria-hidden="true" />
            </div>

            {/* Book Center Binding Crease */}
            <div className="book3d-center-binding" aria-hidden="true" />

            {/* Right Page (Click to turn to next spread) */}
            <div
              className="book3d-page book3d-page--right"
              onClick={handleNext}
              title="Click right page to turn next"
            >
              <div className="book3d-page__inner">
                <div className="book3d-page__header">
                  <span className="book3d-page__tag">{activeSpread.rightPage.tag}</span>
                  <span className="book3d-page__number">{currentStep * 2}</span>
                </div>

                <div className="book3d-page__main-content">
                  <h4 className="book3d-page__title">{activeSpread.rightPage.title}</h4>
                  {activeSpread.rightPage.subtitle && (
                    <p className="book3d-page__subtitle">{activeSpread.rightPage.subtitle}</p>
                  )}
                  <p className="book3d-page__desc">{activeSpread.rightPage.description}</p>

                  {activeSpread.rightPage.stats && (
                    <div className="book3d-page__stats">
                      {activeSpread.rightPage.stats.map((st, i) => (
                        <div key={i} className="book3d-page__stat-item">
                          <span className="book3d-page__stat-label">{st.label}</span>
                          <strong className="book3d-page__stat-value">{st.value}</strong>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSpread.rightPage.pills && (
                    <div className="book3d-page__pills">
                      {activeSpread.rightPage.pills.map((pill, i) => (
                        <span key={i} className="book3d-page__pill">
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Subtle Page Spine Shadow */}
              <div className="book3d-page__spine-gutter book3d-page__spine-gutter--right" aria-hidden="true" />
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
            <div className="book3d-spine-edge book3d-spine-edge--back" aria-hidden="true" />
            <div className="book3d-cover__content book3d-cover__content--back">
              <div className="book3d-cover__seal">🏛️</div>
              <h3 className="book3d-cover__title book3d-cover__title--back">
                The Academic Chronicles
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
