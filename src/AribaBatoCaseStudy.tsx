import { useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer, Navigation } from "./Sections";

gsap.registerPlugin(ScrollTrigger);

const experienceMapSteps = [
  { num: "01", title: "Open ARIBA BATO", desc: "Launch companion app upon arriving in the historic municipality of Bato." },
  { num: "02", title: "Explore Locations", desc: "Browse nearby cultural heritage sites and geographic destination markers." },
  { num: "03", title: "Select Destination", desc: "Choose Batalay Shrine or Saint John the Baptist Church for navigation." },
  { num: "04", title: "Learn Its Story", desc: "Immerse in voice narration and historical chronicles before on-site arrival." },
  { num: "05", title: "Experience AR", desc: "Point mobile camera to trigger localized 3D augmentations and historical anchors." },
  { num: "06", title: "Complete Activities", desc: "Engage in location-based tasks, scavenger clues, and monument interactions." },
  { num: "07", title: "Take Quizzes", desc: "Reinforce learning through gamified Guess Who and multiple-choice trivia." },
  { num: "08", title: "Earn Badges", desc: "Unlock Stone Sentinel and Shrine Scholar cultural achievement artifacts." },
  { num: "09", title: "Track Progress", desc: "Monitor exploration percentage, collected landmarks, and leaderboard rank." },
  { num: "10", title: "Continue Exploring", desc: "Follow progressive trails to discover the next hidden heritage landmark." },
];

const badgesList = [
  {
    name: "Stone Sentinel",
    icon: "⛪",
    tier: "Heritage Guardian",
    desc: "Awarded for exploring the ancient coral stone architecture of Saint John the Baptist Parish.",
  },
  {
    name: "Shrine Scholar",
    icon: "✝️",
    tier: "Historical Explorer",
    desc: "Unlocked by discovering the foundational site of Christianity in Batalay Shrine.",
  },
  {
    name: "Bato Voyager",
    icon: "🧭",
    tier: "Trail Pioneer",
    desc: "Earned by completing 100% of all geolocation exploration waypoints across Bato.",
  },
  {
    name: "Heritage Master",
    icon: "🏆",
    tier: "Grand Champion",
    desc: "Achieved by acing all interactive AR quizzes with a perfect cultural mastery score.",
  },
];

const iterationPairs = [
  {
    topic: "Navigation Clarity & Map Orientation",
    observed: "Users in field trials hesitated when orienting map routes while walking on site.",
    adjusted: "Added dynamic heading compass indicators and simplified landmark distance markers.",
    improved: "Reduced initial route-finding friction and improved self-guided exploration confidence.",
  },
  {
    topic: "AR Scanner Feedback & Reticle Cueing",
    observed: "Participants weren't sure if the camera was actively detecting historical physical markers.",
    adjusted: "Engineered a glowing scanning bracket with clear tactile and visual detection pulses.",
    improved: "Faster target recognition and zero confusion during augmented object rendering.",
  },
  {
    topic: "Quiz Interaction & Information Recall",
    observed: "Long text questions felt like formal academic exams, dampening the sense of adventure.",
    adjusted: "Restructured questions into Bite-sized 'Guess Who' trivia with instant celebratory animations.",
    improved: "Higher quiz completion rates and increased engagement with historical lore.",
  },
];

export default function AribaBatoCaseStudy() {
  const pageRef = useRef<HTMLElement>(null);
  const [activeLandmark, setActiveLandmark] = useState<"batalay" | "church" | null>(null);
  const [landmarkPos, setLandmarkPos] = useState({ x: 0, y: 0, flip: false });
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState<"batalay" | "church" | null>(null);

  const handleLandmarkMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const isRightHalf = e.clientX > window.innerWidth * 0.58;
    const clampedY = Math.max(140, Math.min(window.innerHeight - 140, e.clientY));
    setLandmarkPos({
      x: e.clientX,
      y: clampedY,
      flip: isRightHalf,
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "ARIBA BATO — Augmented Reality Heritage Mobile Experience";
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".a-hero__left", {
        opacity: 0,
        x: -24,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".a-hero-ar-stage", {
        opacity: 0,
        y: 32,
        duration: 1.0,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".a-animate-section").forEach((sec) => {
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
      <main ref={pageRef} className="ariba-case" id="main-content">
        
        {/* =========================================================================
            01. OPENING — BEGIN THE JOURNEY
           ========================================================================= */}
        <section className="a-hero">
          <div className="a-container">
            <div className="a-hero-grid">
              
              {/* Left Column: Title & Heritage Concept */}
              <div className="a-hero__left">
                <div className="a-kicker">
                  <span className="a-kicker__dot" />
                  <span>CULTURAL HERITAGE · MOBILE AR EXPERIENCE</span>
                </div>

                <h1 className="a-heading-lg" style={{ fontSize: "clamp(3.2rem, 7vw, 5.8rem)" }}>
                  ARIBA BATO
                </h1>

                <h2 style={{ fontFamily: "var(--a-serif)", fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)", fontWeight: 400, color: "var(--a-terra)", margin: "-0.5rem 0 1.25rem", lineHeight: 1.2 }}>
                  Exploring heritage through augmented reality, storytelling, and play.
                </h2>

                <p className="a-lead">
                  A gamified mobile experience designed to encourage users to discover the cultural heritage of Bato, Catanduanes through interactive stories, challenges, quizzes, and augmented reality.
                </p>

                <div className="a-hero-meta-grid">
                  <div className="a-hero-meta-item">
                    <span>Role</span>
                    <strong>Lead UI/UX Architect & Mobile Developer</strong>
                  </div>
                  <div className="a-hero-meta-item">
                    <span>Category</span>
                    <strong>UI/UX Mobile App</strong>
                  </div>
                  <div className="a-hero-meta-item">
                    <span>Platform</span>
                    <strong>Mobile Application (iOS & Android)</strong>
                  </div>
                  <div className="a-hero-meta-item">
                    <span>Scope & Context</span>
                    <strong>Academic Capstone · Tourism & Heritage</strong>
                  </div>
                </div>

                <a href="#why-ariba" className="a-scroll-prompt">
                  <span>Start Exploring ↓</span>
                </a>
              </div>

              {/* Right Column: AR Mobile Screen Stage */}
              <div className="a-hero-ar-stage">
                <div className="a-hero-poster-frame">
                  <div className="a-ar-hud-overlay">
                    <span>● AR HERITAGE SCANNER ACTIVE</span>
                    <span>BATALAY 13°35'N</span>
                  </div>
                  <video
                    src="/aribabato.mp4"
                    poster="/ariba-bato-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            02. SECTION 02 — WHY ARIBA BATO EXISTS
           ========================================================================= */}
        <section className="a-section a-animate-section" id="why-ariba">
          <div className="a-container">
            <div style={{ maxWidth: "860px" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">🏛️</span>
                <span>HERITAGE & PRESERVATION</span>
              </div>
              
              <h2 className="a-heading-lg">
                Heritage becomes more meaningful when people can <em>experience it</em>—not just read about it.
              </h2>
              
              <p className="a-lead">
                Bato, Catanduanes is home to cultural and historical landmarks with stories worth preserving and sharing. The challenge was to explore how technology could make learning about these places more engaging, especially for younger and digitally oriented users.
              </p>
              
              <p className="a-lead" style={{ marginTop: "1rem" }}>
                Instead of presenting historical information as static textbook content, ARIBA BATO turns heritage exploration into an interactive journey.
              </p>
            </div>

            {/* Destination Landmark Markers */}
            <div className="a-landmarks-grid">
              <div
                className="a-landmark-card a-landmark-card--interactive"
                onPointerEnter={() => setActiveLandmark("batalay")}
                onPointerLeave={() => setActiveLandmark(null)}
                onPointerMove={handleLandmarkMouseMove}
                onClick={() => setMobilePreviewOpen((prev) => (prev === "batalay" ? null : "batalay"))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setMobilePreviewOpen((prev) => (prev === "batalay" ? null : "batalay"));
                  }
                }}
                aria-expanded={mobilePreviewOpen === "batalay"}
                aria-label="Batalay Shrine details and landmark photo preview"
              >
                <div className="a-landmark-card__header">
                  <span className="a-landmark-pin">📍 DESTINATION MARKER 01</span>
                  <span className="a-landmark-hover-pill">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    Hover to view photo
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--a-serif)", fontSize: "2rem", margin: "0.2rem 0", color: "var(--ink)" }}>
                  Batalay Shrine
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.65 }}>
                  The historic cradle of Christianity in Catanduanes, marking the site where Augustinian friar Diego de Herrera was laid to rest in 1576. ARIBA BATO brings its historical significance alive through on-site augmented storytelling.
                </p>

                {/* Mobile tap-to-reveal preview */}
                {mobilePreviewOpen === "batalay" && (
                  <div className="a-landmark-mobile-preview" aria-label="Batalay Shrine landmark preview">
                    <img
                      src="/batalay-shrine.jpg"
                      alt="Batalay Shrine in Bato, Catanduanes"
                      className="a-landmark-mobile-preview__img"
                      loading="lazy"
                    />
                    <div className="a-landmark-mobile-preview__caption">
                      <strong>Batalay Shrine</strong>
                      <span>Bato, Catanduanes · Cradle of Christianity in Catanduanes (1576)</span>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="a-landmark-card a-landmark-card--interactive"
                onPointerEnter={() => setActiveLandmark("church")}
                onPointerLeave={() => setActiveLandmark(null)}
                onPointerMove={handleLandmarkMouseMove}
                onClick={() => setMobilePreviewOpen((prev) => (prev === "church" ? null : "church"))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setMobilePreviewOpen((prev) => (prev === "church" ? null : "church"));
                  }
                }}
                aria-expanded={mobilePreviewOpen === "church"}
                aria-label="Saint John the Baptist Parish Church details and landmark photo preview"
              >
                <div className="a-landmark-card__header">
                  <span className="a-landmark-pin">📍 DESTINATION MARKER 02</span>
                  <span className="a-landmark-hover-pill">
                    <svg
                      viewBox="0 0 24 24"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    Hover to view photo
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--a-serif)", fontSize: "2rem", margin: "0.2rem 0", color: "var(--ink)" }}>
                  Saint John the Baptist Parish Church
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.65 }}>
                  A majestic coral stone church standing steadfast by the Bato River since the 1830s. The mobile application allows visitors to scan architectural details and discover the craftsmanship of 19th-century artisans.
                </p>

                {/* Mobile tap-to-reveal preview */}
                {mobilePreviewOpen === "church" && (
                  <div className="a-landmark-mobile-preview" aria-label="Church landmark preview">
                    <img
                      src="/bato-church.jpg"
                      alt="Saint John the Baptist Parish Church in Bato, Catanduanes"
                      className="a-landmark-mobile-preview__img"
                      loading="lazy"
                    />
                    <div className="a-landmark-mobile-preview__caption">
                      <strong>Saint John the Baptist Parish Church</strong>
                      <span>Bato, Catanduanes · Coral stone architecture (est. 1830s)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            03. SECTION 03 — FROM VISITOR TO EXPLORER
           ========================================================================= */}
        <section className="a-section a-section--sand a-animate-section">
          <div className="a-container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">🚶‍♂️</span>
                <span>BEHAVIORAL TRANSFORMATION</span>
              </div>
              <h2 className="a-heading-md">
                From Visitor to <em>Explorer</em>
              </h2>
              <p className="a-lead" style={{ margin: "0 auto" }}>
                The goal was not simply to create a digital tour guide. ARIBA BATO was designed to make users active participants in the exploration of local heritage.
              </p>
            </div>

            {/* Winding Trail Progression */}
            <div className="a-progression-trail">
              <span className="a-trail-node">VISIT</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node">DISCOVER</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node">INTERACT</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node">LEARN</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node">COMPLETE CHALLENGES</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node">EARN ACHIEVEMENTS</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node a-trail-node--hero">REMEMBER THE EXPERIENCE</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            04. SECTION 04 — THE EXPERIENCE MAP
           ========================================================================= */}
        <section className="a-section a-animate-section">
          <div className="a-container">
            <div style={{ maxWidth: "800px", marginBottom: "3rem" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">🗺️</span>
                <span>ADVENTURE NAVIGATION</span>
              </div>
              <h2 className="a-heading-lg">
                The <em>Experience Map</em>
              </h2>
              <p className="a-lead">
                An illustrated journey mapping how a traveler moves through the application while exploring the real physical terrain of Bato.
              </p>
            </div>

            {/* Illustrated Journey Map */}
            <div className="a-experience-map">
              <div className="a-map-steps-grid">
                {experienceMapSteps.map((step) => (
                  <div key={step.num} className="a-map-step-card">
                    <span className="a-map-step-card__num">STEP {step.num}</span>
                    <strong style={{ fontSize: "1rem", color: "var(--ink)" }}>{step.title}</strong>
                    <span style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.5 }}>{step.desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            05. SECTION 05 — MEET THE EXPERIENCE (MOBILE SHOWCASE)
           ========================================================================= */}
        <section className="a-section a-section--sand a-animate-section">
          <div className="a-container--wide">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">📱</span>
                <span>APPLICATION SHOWCASE</span>
              </div>
              <h2 className="a-heading-lg">
                Meet the <em>Experience</em>
              </h2>
              <p className="a-lead" style={{ margin: "0 auto" }}>
                Every interface is designed to balance clear mobile ergonomics with adventurous, location-based discovery.
              </p>
            </div>

            {/* Floating Mobile Screens with Experience Tags */}
            <div className="a-floating-screens-grid">
              <div className="a-floating-screen-card">
                <span className="a-floating-screen-card__tag">Explore</span>
                <img src="/ariba-bato-poster.jpg" alt="ARIBA BATO Home Discovery" />
                <div style={{ padding: "1.25rem", textAlign: "center", background: "var(--paper)" }}>
                  <strong style={{ fontSize: "0.95rem" }}>Home & Landmark Discovery</strong>
                </div>
              </div>

              <div className="a-floating-screen-card" style={{ transform: "translateY(2rem)" }}>
                <span className="a-floating-screen-card__tag">Discover</span>
                <img src="/ariba-bato-app.png" alt="ARIBA BATO Site Details" />
                <div style={{ padding: "1.25rem", textAlign: "center", background: "var(--paper)" }}>
                  <strong style={{ fontSize: "0.95rem" }}>Heritage Site Chronicles</strong>
                </div>
              </div>

              <div className="a-floating-screen-card" style={{ transform: "translateY(1rem)" }}>
                <span className="a-floating-screen-card__tag">Play</span>
                <img src="/ariba-bato-poster.png" alt="ARIBA BATO AR Quest" />
                <div style={{ padding: "1.25rem", textAlign: "center", background: "var(--paper)" }}>
                  <strong style={{ fontSize: "0.95rem" }}>Augmented Reality Reticle</strong>
                </div>
              </div>

              <div className="a-floating-screen-card" style={{ transform: "translateY(3rem)" }}>
                <span className="a-floating-screen-card__tag">Achieve</span>
                <img src="/ariba-bato-app.png" alt="ARIBA BATO Achievements" />
                <div style={{ padding: "1.25rem", textAlign: "center", background: "var(--paper)" }}>
                  <strong style={{ fontSize: "0.95rem" }}>Badges & Leaderboard</strong>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            06. SECTION 06 — HERITAGE THROUGH STORYTELLING
           ========================================================================= */}
        <section className="a-section a-animate-section">
          <div className="a-container">
            <div className="a-landmarks-grid" style={{ alignItems: "center" }}>
              <div>
                <div className="a-kicker">
                  <span className="a-kicker__icon">📖</span>
                  <span>NARRATIVE IMMERSION</span>
                </div>
                <h2 className="a-heading-lg">
                  Stories before <em>statistics.</em>
                </h2>
                <p className="a-lead">
                  Historical information was designed to feel approachable rather than reading like a dry textbook. By pacing lore with voiceover narration and localized vignettes, visitors feel the human presence of the past.
                </p>

                <div style={{ marginTop: "2rem", borderLeft: "3px solid var(--a-terra)", paddingLeft: "1.5rem" }}>
                  <blockquote style={{ fontFamily: "var(--a-serif)", fontSize: "1.35rem", fontStyle: "italic", color: "var(--ink)", margin: 0 }}>
                    “Standing on the shores of Batalay, the Pacific wind carries four centuries of memory—from ancient seafaring villages to the dawn of Spanish stone craft.”
                  </blockquote>
                </div>
              </div>

              <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}>
                <img src="/ariba-bato-poster.jpg" alt="Storytelling UI in ARIBA BATO" style={{ width: "100%", display: "block" }} />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            07. SECTION 07 — AUGMENTED REALITY AS A LAYER OF DISCOVERY
           ========================================================================= */}
        <section className="a-section a-section--dark a-animate-section">
          <div className="a-container">
            <div style={{ textAlign: "center", maxWidth: "860px", margin: "0 auto" }}>
              <div className="a-kicker" style={{ color: "var(--a-cyan)" }}>
                <span className="a-kicker__icon">✨</span>
                <span>AUGMENTED REALITY OVERLAYS</span>
              </div>
              <h2 className="a-heading-lg">
                AR turns the physical location into part of the <em>interface.</em>
              </h2>
              <p className="a-lead">
                Instead of separating digital information from the heritage site, the AR experience was envisioned as an additional visual layer users could interact with while exploring the real physical environment.
              </p>
            </div>

            {/* AR Viewport Reticle Stage */}
            <div className="a-ar-viewport">
              <video
                src="/prototype.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "2.5rem", textAlign: "center", color: "#d6d3d1", fontSize: "0.92rem" }}>
              <div>✓ Physical & digital space connection</div>
              <div>✓ Location-based camera detection</div>
              <div>✓ Contextual architectural overlays</div>
              <div>✓ Respectful historical identity</div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            08. SECTION 08 — LEARNING THROUGH PLAY
           ========================================================================= */}
        <section className="a-section a-animate-section">
          <div className="a-container">
            <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">🎯</span>
                <span>GAMIFICATION & MOTIVATION</span>
              </div>
              <h2 className="a-heading-lg">
                Learning without making it feel like a <em>lesson.</em>
              </h2>
              <p className="a-lead" style={{ margin: "0 auto" }}>
                Gamification was used to reinforce cultural learning while keeping the experience enjoyable, rewarding, and deeply memorable.
              </p>
            </div>

            {/* Activity Loop Progression */}
            <div className="a-quest-trail">
              <span className="a-quest-step">Heritage Story</span>
              <span className="a-trail-arrow">↓</span>
              <span className="a-quest-step">Location Challenge</span>
              <span className="a-trail-arrow">↓</span>
              <span className="a-quest-step">Correct Answer</span>
              <span className="a-trail-arrow">↓</span>
              <span className="a-quest-step">Progress Unlocked</span>
              <span className="a-trail-arrow">↓</span>
              <span className="a-quest-step" style={{ background: "var(--a-terra)", color: "#fff" }}>Achievement Badge</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginTop: "2rem" }}>
              {["Treasure Hunts", "Multiple-Choice Quizzes", "True or False", "Photo Identification", "Guess Who Lore", "Spatial Knowledge Checks"].map((item) => (
                <div key={item} style={{ padding: "1rem", borderRadius: "10px", border: "1px solid var(--line)", background: "var(--paper)", textAlign: "center", fontSize: "0.88rem", fontWeight: 700, color: "var(--ink)" }}>
                  🎲 {item}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            09. SECTION 09 — THE TREASURE HUNT
           ========================================================================= */}
        <section className="a-section a-section--sand a-animate-section">
          <div className="a-container">
            <div style={{ maxWidth: "800px" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">🗺️</span>
                <span>GEO-LOCATED QUESTS</span>
              </div>
              <h2 className="a-heading-md">The Treasure Hunt Experience</h2>
              <p className="a-lead">
                The interaction needed to provide enough direction for users to continue exploring without removing the organic sense of discovery.
              </p>
            </div>

            {/* Quest Flow Strip */}
            <div className="a-progression-trail" style={{ justifyContent: "flex-start" }}>
              <span className="a-trail-node">Start Quest</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node">Find Location</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node">Discover Clue</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node">Complete Activity</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node">Unlock Progress</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node a-trail-node--hero">Finish Hunt</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. SECTION 10 — REWARDING EXPLORATION (ACHIEVEMENT WALL)
           ========================================================================= */}
        <section className="a-section a-animate-section">
          <div className="a-container">
            <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">🏆</span>
                <span>COLLECTIBLE ARTIFACTS</span>
              </div>
              <h2 className="a-heading-lg">
                Every discovery leaves a <em>mark.</em>
              </h2>
              <p className="a-lead" style={{ margin: "0 auto" }}>
                Badges and progress systems were introduced to give users a sense of accomplishment and encourage continued exploration across the province.
              </p>
            </div>

            <div className="a-badges-grid">
              {badgesList.map((badge) => (
                <div key={badge.name} className="a-badge-card">
                  <div className="a-badge-icon">{badge.icon}</div>
                  <strong style={{ fontSize: "1.2rem", color: "var(--ink)" }}>{badge.name}</strong>
                  <span style={{ fontFamily: "var(--a-mono)", fontSize: "0.74rem", color: "var(--a-terra)", fontWeight: 700, textTransform: "uppercase" }}>
                    {badge.tier}
                  </span>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0 }}>
                    {badge.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            11. SECTION 11 — HELPING USERS CONTINUE THEIR JOURNEY
           ========================================================================= */}
        <section className="a-section a-section--sand a-animate-section">
          <div className="a-container">
            <div style={{ maxWidth: "800px", marginBottom: "3rem" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">🕒</span>
                <span>TEMPORAL EXPERIENCE STRUCTURE</span>
              </div>
              <h2 className="a-heading-md">Helping Users Continue Their Journey</h2>
              <p className="a-lead">
                Organizing supporting features around the three distinct phases of travel.
              </p>
            </div>

            <div className="a-trip-phases-grid">
              <div className="a-phase-card">
                <span className="a-phase-card__tag">PHASE 01 · BEFORE THE JOURNEY</span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
                  Planning & Saved Routes
                </h3>
                <p style={{ fontSize: "0.92rem", color: "var(--muted)", margin: 0 }}>
                  Pre-downloading offline heritage routes, reading opening hours, and bookmarking historical sites before traveling.
                </p>
              </div>

              <div className="a-phase-card">
                <span className="a-phase-card__tag">PHASE 02 · DURING THE JOURNEY</span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
                  Navigation & AR Activities
                </h3>
                <p style={{ fontSize: "0.92rem", color: "var(--muted)", margin: 0 }}>
                  Live compass wayfinding, location-triggered AR scans, instant trivia checks, and scavenger hunt tasks.
                </p>
              </div>

              <div className="a-phase-card">
                <span className="a-phase-card__tag">PHASE 03 · AFTER THE JOURNEY</span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
                  Achievements & Community
                </h3>
                <p style={{ fontSize: "0.92rem", color: "var(--muted)", margin: 0 }}>
                  Reviewing unlocked badges, viewing leaderboard standings, sharing cultural memories, and referring fellow explorers.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            12. SECTION 12 — DESIGNING THE MOBILE EXPERIENCE
           ========================================================================= */}
        <section className="a-section a-animate-section">
          <div className="a-container">
            <div style={{ maxWidth: "800px", marginBottom: "3rem" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">🎨</span>
                <span>BEHIND THE EXPERIENCE</span>
              </div>
              <h2 className="a-heading-lg">
                Turning exploration into an <em>interface.</em>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
              <div style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1.75rem", background: "var(--paper)" }}>
                <strong style={{ color: "var(--a-terra)", fontSize: "1.1rem", display: "block", marginBottom: "0.3rem" }}>Clear Navigation</strong>
                <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>Users always understand where they are on the trail and what they can explore next.</span>
              </div>
              <div style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1.75rem", background: "var(--paper)" }}>
                <strong style={{ color: "var(--a-terra)", fontSize: "1.1rem", display: "block", marginBottom: "0.3rem" }}>Visual Engagement</strong>
                <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>Heritage content feels inviting without overwhelming or obscuring the historical subject.</span>
              </div>
              <div style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1.75rem", background: "var(--paper)" }}>
                <strong style={{ color: "var(--a-terra)", fontSize: "1.1rem", display: "block", marginBottom: "0.3rem" }}>Progressive Discovery</strong>
                <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>Information and activities unfold organically as users physically move through spaces.</span>
              </div>
              <div style={{ border: "1px solid var(--line)", borderRadius: "14px", padding: "1.75rem", background: "var(--paper)" }}>
                <strong style={{ color: "var(--a-terra)", fontSize: "1.1rem", display: "block", marginBottom: "0.3rem" }}>Mobile Readability</strong>
                <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>Generous typography and high-contrast controls remain legible under direct outdoor sunlight.</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            13. SECTION 13 — VISUAL IDENTITY
           ========================================================================= */}
        <section className="a-section a-section--sand a-animate-section">
          <div className="a-container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">🌿</span>
                <span>BRAND IDENTITY TRIAD</span>
              </div>
              <h2 className="a-heading-md">Balancing Three Worlds</h2>
            </div>

            <div className="a-identity-triad">
              <div className="a-triad-card">
                <strong>🏛️ Heritage</strong>
                <span style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
                  Earthy terracotta, warm sandstones, and historical typography reflecting 400 years of Catanduanes culture.
                </span>
              </div>

              <div className="a-triad-card">
                <strong>⚡ Technology</strong>
                <span style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
                  Electric cyan reticle lines, responsive camera telemetry, and high-performance WebGL 3D augmentations.
                </span>
              </div>

              <div className="a-triad-card">
                <strong>🧭 Adventure</strong>
                <span style={{ fontSize: "0.92rem", color: "var(--muted)" }}>
                  Winding topographic trails, collectible quest badges, and cheerful gamification cues.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            14. SECTION 14 — FROM WIREFRAME TO HIGH-FIDELITY EXPERIENCE
           ========================================================================= */}
        <section className="a-section a-animate-section">
          <div className="a-container">
            <div style={{ maxWidth: "800px", marginBottom: "3rem" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">📐</span>
                <span>DEVELOPMENT CHRONOLOGY</span>
              </div>
              <h2 className="a-heading-md">From Wireframe to High-Fidelity Experience</h2>
              <span style={{ fontFamily: "var(--a-mono)", fontSize: "0.85rem", color: "var(--a-terra)", fontWeight: 800 }}>
                TIMELINE: FEBRUARY 2025 — FEBRUARY 2026
              </span>
            </div>

            <div className="a-progression-trail" style={{ justifyContent: "flex-start" }}>
              <span className="a-trail-node">Early Concept</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node">Wireframe Prototypes</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node">Refined Interface</span>
              <span className="a-trail-arrow">➔</span>
              <span className="a-trail-node a-trail-node--hero">High-Fidelity AR Prototype</span>
            </div>

            <p className="a-lead" style={{ marginTop: "1.5rem" }}>
              The high-fidelity prototype evolved throughout the capstone development period. The core experience was established earlier in the project, while later stages focused on refinements, adjustments, testing feedback, and minor revisions alongside application development.
            </p>
          </div>
        </section>

        {/* =========================================================================
            15. SECTION 15 — TESTING THE EXPERIENCE (USABILITY EVALUATION)
           ========================================================================= */}
        <section className="a-section a-section--sand a-animate-section">
          <div className="a-container">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">📊</span>
                <span>USABILITY EVALUATION</span>
              </div>
              <h2 className="a-heading-lg">
                Did the experience actually <em>work for users?</em>
              </h2>
            </div>

            {/* SUS Hero Gauge Box */}
            <div className="a-sus-hero-box">
              <span style={{ fontFamily: "var(--a-mono)", fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", color: "var(--a-terra)" }}>
                SYSTEM USABILITY SCALE (SUS) EVALUATION
              </span>
              <div className="a-sus-score">75.43</div>
              <span style={{ padding: "0.4rem 1.2rem", borderRadius: "999px", background: "var(--a-terra)", color: "#fff", fontWeight: 800, fontSize: "0.84rem", textTransform: "uppercase" }}>
                RATING: GOOD (65 PARTICIPANTS)
              </span>

              <div className="a-sus-dimensions-grid">
                <div className="a-sus-dimension-card">
                  <span>Ease of Use</span>
                  <strong>73.37</strong>
                </div>
                <div className="a-sus-dimension-card">
                  <span>Learnability</span>
                  <strong>73.64</strong>
                </div>
                <div className="a-sus-dimension-card">
                  <span>Functionality</span>
                  <strong>78.53</strong>
                </div>
                <div className="a-sus-dimension-card">
                  <span>Overall Satisfaction</span>
                  <strong style={{ color: "var(--a-emerald)" }}>86.41</strong>
                </div>
                <div className="a-sus-dimension-card">
                  <span>GUESS-18 Score</span>
                  <strong style={{ color: "var(--a-terra)" }}>87.28%</strong>
                </div>
              </div>
            </div>

            <p className="a-lead" style={{ textAlign: "center", margin: "0 auto" }}>
              The results indicated generally positive usability and strong overall satisfaction, while also revealing opportunities for improving ease of use and reducing perceived complexity during camera transitions.
            </p>
          </div>
        </section>

        {/* =========================================================================
            16. SECTION 16 — WHAT CHANGED THROUGH ITERATION
           ========================================================================= */}
        <section className="a-section a-animate-section">
          <div className="a-container">
            <div>
              <div className="a-kicker">
                <span className="a-kicker__icon">🔄</span>
                <span>DESIGN EVOLUTION</span>
              </div>
              <h2 className="a-heading-md">What Changed Through Iteration</h2>
              <p className="a-lead">
                How testing discoveries were translated into tangible interface refinements.
              </p>
            </div>

            <div className="a-iteration-rows">
              {iterationPairs.map((item) => (
                <div key={item.topic} className="a-iteration-row">
                  <div className="a-iter-step">
                    <span className="a-iter-step__label">01 · OBSERVED</span>
                    <strong style={{ color: "var(--ink)", fontSize: "0.96rem" }}>{item.topic}</strong>
                    <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>{item.observed}</span>
                  </div>
                  <div className="a-iter-step" style={{ borderLeft: "2px solid var(--a-terra)", paddingLeft: "1.25rem" }}>
                    <span className="a-iter-step__label">02 · ADJUSTED</span>
                    <strong style={{ color: "var(--ink)", fontSize: "0.96rem" }}>Design Revision</strong>
                    <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>{item.adjusted}</span>
                  </div>
                  <div className="a-iter-step" style={{ borderLeft: "2px solid var(--a-emerald)", paddingLeft: "1.25rem" }}>
                    <span className="a-iter-step__label" style={{ color: "var(--a-emerald)" }}>03 · IMPROVED</span>
                    <strong style={{ color: "var(--ink)", fontSize: "0.96rem" }}>User Impact</strong>
                    <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>{item.improved}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            17. SECTION 17 — THE COMPLETE EXPERIENCE (PANORAMIC SHOWCASE)
           ========================================================================= */}
        <section className="a-section a-section--dark a-animate-section">
          <div className="a-container--wide">
            <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
              <div className="a-kicker" style={{ color: "var(--a-cyan)" }}>
                <span className="a-kicker__icon">✨</span>
                <span>PANORAMIC EXHIBIT</span>
              </div>
              <h2 className="a-heading-lg">
                The Complete <em>Experience</em>
              </h2>
              <p className="a-lead">
                An end-to-end mobile adventure connecting heritage chronicles, real-world navigation, augmented camera discoveries, and collective achievements.
              </p>
            </div>

            <div style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 35px 90px rgba(0,0,0,0.3)" }}>
              <img src="/ariba-bato-poster.jpg" alt="ARIBA BATO Complete Experience Gallery" style={{ width: "100%", display: "block" }} />
            </div>
          </div>
        </section>

        {/* =========================================================================
            CLOSING — BEYOND THE PROTOTYPE
           ========================================================================= */}
        <section className="a-section">
          <div className="a-container--narrow">
            <div style={{ textAlign: "center" }}>
              <div className="a-kicker">
                <span className="a-kicker__icon">🌱</span>
                <span>CULTURAL IMPACT</span>
              </div>
              
              <h2 className="a-heading-lg" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>
                Technology can help preserve stories by giving people new ways to <em>experience them.</em>
              </h2>

              <div className="a-lead" style={{ margin: "2rem auto", textAlign: "center" }}>
                <p style={{ marginBottom: "1.25rem" }}>
                  ARIBA BATO challenged me to think beyond individual screens and design an experience that connected technology, culture, learning, and exploration.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  The project strengthened my understanding of mobile UX, gamification, augmented reality experiences, usability evaluation, and designing digital products around real-world environments.
                </p>
                <p>
                  More importantly, it showed how thoughtful technology can support cultural awareness without replacing the place, history, and stories that make that culture meaningful.
                </p>
              </div>

              <div style={{ fontFamily: "var(--a-serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontStyle: "italic", color: "var(--a-terra)", margin: "3rem 0" }}>
                Explore. Learn. Remember.
              </div>
            </div>

            {/* Footer Navigation */}
            <footer className="a-footer-nav">
              <a href="/works/hr-payroll" className="editorial-btn editorial-btn--ghost">
                <span>← Previous: HR Payroll</span>
              </a>
              <a href="/works/cc-wedding" className="editorial-btn editorial-btn--primary">
                <span>Next Case Study: CC Wedding →</span>
              </a>
            </footer>

          </div>
        </section>

      </main>

      {/* Floating Cursor Image Hover for Landmarks (Batalay Shrine & Bato Church) */}
      {activeLandmark && (
        <div
          className="a-church-floating-preview"
          style={{
            left: `${landmarkPos.x}px`,
            top: `${landmarkPos.y}px`,
            transform: `translate3d(${landmarkPos.flip ? "calc(-100% - 1.5rem)" : "1.5rem"}, -50%, 0)`,
          }}
          aria-hidden="true"
        >
          <div className="a-church-floating-preview__inner">
            <img
              src={activeLandmark === "batalay" ? "/batalay-shrine.jpg" : "/bato-church.jpg"}
              alt={activeLandmark === "batalay" ? "Batalay Shrine, Bato, Catanduanes" : "Saint John the Baptist Parish Church, Bato, Catanduanes"}
              className="a-church-floating-preview__img"
            />
            <div className="a-church-floating-preview__caption">
              <strong>{activeLandmark === "batalay" ? "Batalay Shrine" : "Saint John the Baptist Parish Church"}</strong>
              <span>
                {activeLandmark === "batalay"
                  ? "Historic cradle of Christianity in Catanduanes (est. 1576)"
                  : "Historic coral stone architecture by the Bato River (est. 1830s)"}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
