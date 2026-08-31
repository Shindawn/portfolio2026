import { covers, faqs, projects, testimonials } from "./data";
import CurvedBanner from "./CurvedBanner";
import Hero3DCarousel from "./Hero3DCarousel";
import HeroBeamLines from "./HeroBeamLines";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState, type CSSProperties, type PointerEvent } from "react";

const companyMarks = [
  ["Vercel", "", "brand-mark--triangle"], ["Shopify", "S", ""],
  ["Webflow", "W", ""], ["Spotify", "≋", "brand-mark--round"],
  ["Airbnb", "A", "brand-mark--line"], ["Framer", "F", ""],
  ["Figma", "8", "brand-mark--line"], ["Linear", "╲", "brand-mark--round"],
  ["Notion", "N", "brand-mark--line"], ["Stripe", "S", ""],
] as const;

function NavClock() {
  const formatTime = () => new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  }).format(new Date()).replaceAll(",", "");
  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(formatTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <time className="nav-clock" title="Philippine Standard Time">{time}</time>;
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className={`nav shell${isMenuOpen ? " is-menu-open" : ""}`} aria-label="Main navigation">
        <div className="nav-start">
          <a className="brand" href="/" aria-label="Lescy Gdawn, home" onClick={closeMenu}>
            <span>Lescy Gdawn</span>
          </a>
        </div>

        <div className="nav-center">
          <button
            type="button"
            className={`nav-hamburger${isMenuOpen ? " is-active" : ""}`}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="nav-hamburger__bar nav-hamburger__bar--top" />
            <span className="nav-hamburger__bar nav-hamburger__bar--bottom" />
          </button>
        </div>

        <div className="nav-end">
          <NavClock />
          <ThemeToggle />
        </div>
      </nav>

      {/* Fullscreen Navigation Overlay (Matching Reference Image 2) */}
      <div
        className={`nav-overlay${isMenuOpen ? " is-open" : ""}`}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation menu"
      >
        <div className="nav-overlay__inner shell">
          <ul className="nav-overlay__list">
            <li className="nav-overlay__item">
              <a href="/" className="nav-overlay__link" onClick={closeMenu}>
                <span>Home</span>
              </a>
            </li>
            <li className="nav-overlay__item">
              <a href="/about" className="nav-overlay__link" onClick={closeMenu}>
                <span>About</span>
              </a>
            </li>
            <li className="nav-overlay__item">
              <a href="/#work" className="nav-overlay__link" onClick={closeMenu}>
                <span>Work</span>
              </a>
            </li>
          </ul>

          <div className="nav-overlay__footer">
            <div className="nav-overlay__resume-group">
              <a
                href="/LescyGCaadlawon_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="nav-overlay__sublink"
              >
                <span>Preview Resume ↗</span>
              </a>
              <a
                href="/LescyGCaadlawon_CV.pdf"
                download="LescyGCaadlawon_CV.pdf"
                className="nav-overlay__sublink"
              >
                <span>Download Resume ↓</span>
              </a>
            </div>
            <p className="nav-overlay__copyright">©2026 Lescy Gdawn · Mandaluyong, Philippines</p>
          </div>
        </div>
      </div>
    </>
  );
}

const rotatingWords = ["Cheaper", "Faster", "Great"] as const;

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Available for work";

  useEffect(() => {
    let currentIdx = 0;
    let isDeleting = false;
    let timer: number;

    const tick = () => {
      if (!isDeleting) {
        currentIdx++;
        setTypedText(fullText.substring(0, currentIdx));

        if (currentIdx === fullText.length) {
          isDeleting = true;
          timer = window.setTimeout(tick, 2000);
        } else {
          timer = window.setTimeout(tick, 75);
        }
      } else {
        currentIdx--;
        setTypedText(fullText.substring(0, currentIdx));

        if (currentIdx === 0) {
          isDeleting = false;
          timer = window.setTimeout(tick, 400);
        } else {
          timer = window.setTimeout(tick, 35);
        }
      }
    };

    timer = window.setTimeout(tick, 100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIsFlipping(true);
      window.setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsFlipping(false);
      }, 220);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="hero" id="home">
      <Navigation />
      <HeroBeamLines />
      <section className="intro shell" id="about" aria-labelledby="hero-title">
        <div className="hero-stage">
          <div className="hero-stage__eyebrow-pill">
            <span className="hero-stage__eyebrow-dot" aria-hidden="true" />
            <span className="hero-stage__typing-text">
              {typedText}
              <span className="hero-stage__typing-cursor" aria-hidden="true">|</span>
            </span>
          </div>

          <div className="hero-title-wrap hero-stage__title-wrap">
            <h1 id="hero-title" className="hero-stage__title">
              <span className="hero-stage__title-line1">Delivering</span>
              <span className="hero-stage__title-line2">
                <em className={`hero-stage__italic-accent${isFlipping ? " is-flipping" : ""}`}>
                  {rotatingWords[wordIndex]}
                </em>
                <span className="hero-stage__main-accent">Web Systems</span>
              </span>
            </h1>
          </div>

          <p className="hero-stage__subtitle">
            Optimized architectures and intentional UI/UX that help startups, LGUs, and brands launch high-impact digital systems.
          </p>

          <div className="hero-stage__actions">
            <a className="button button--hero-primary" href="#work">
              <span>View all projects</span>
              <span className="button__arrow" aria-hidden="true">→</span>
            </a>
            <a
              className="button button--hero-secondary"
              href="https://calendar.app.google/NzRmXYUx3p8Z7g2L8"
              target="_blank"
              rel="noreferrer"
            >
              <span>Book a Call</span>
            </a>
          </div>
        </div>
      </section>
      <Hero3DCarousel />
    </main>
  );
}

export function Expertise() {
  return <section className="expertise" id="expertise" aria-labelledby="expertise-title"><div className="expertise__inner shell">
    <header className="expertise__header reveal-header"><h2 id="expertise-title">( Expertise )</h2><p>A degree holder in Information Technology with hands-on experience building backend-driven web applications, REST APIs, and database systems — paired with a design background in UI/UX and visual design.</p></header>
    <p className="expertise__services">
      <span className="expertise__service" tabIndex={0}>Web-Software Development,</span><br />
      <span className="expertise__service" tabIndex={0}>UI/UX Designer,</span>{" "}
      <span className="expertise__service" tabIndex={0}>Graphic Designer.</span>
    </p>
  </div></section>;
}

export function LatestWork() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0, flip: false });

  const movePreview = (event: PointerEvent<HTMLElement>) => {
    setPreviewPosition({ x: event.clientX, y: event.clientY, flip: event.clientX > window.innerWidth * 0.64 });
  };

  return <section className="latest-work" id="work" aria-labelledby="work-title"><div className="latest-work__inner shell">
    <header className="latest-work__intro reveal-header"><h2 id="work-title">( Latest Work )</h2><p>A selection of systems I’ve shipped end to end — from a full-stack<br />LGU management platform to an AI-powered portfolio and AR UI design.</p></header>
    <div className="project-list" onPointerMove={movePreview} onPointerLeave={() => setActiveProject(null)}><div className="project-list__head" aria-hidden="true"><span>Index</span><span>Project</span><span>Category</span><span /></div>
      {projects.map(([index, name, category, tag], projectIndex) => <a className="project-row" href="#contact" key={index} onPointerEnter={() => setActiveProject(projectIndex)} onFocus={() => setActiveProject(projectIndex)} onBlur={() => setActiveProject(null)}>
        <span className="project-row__index">{index}</span><span className="project-row__name">{name}</span><span className="project-row__category">{category} <small>{tag}</small></span><span className="project-row__arrow" aria-hidden="true">↗</span>
      </a>)}
      {activeProject !== null && <span className="project-preview is-visible" aria-hidden="true" style={{ "--art": projects[activeProject][4], "--preview-x": `${previewPosition.x}px`, "--preview-y": `${previewPosition.y}px`, "--preview-offset-x": previewPosition.flip ? "calc(-100% - 1.5rem)" : "1.5rem" } as CSSProperties}>
        <span
          className="project-preview__image"
          style={
            projects[activeProject][6]
              ? {
                  backgroundImage: `url('${projects[activeProject][6]}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        />
      </span>}
    </div>
  </div></section>;
}

const testimonialPhotos = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  "/chris-testimonial.jpg",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
];

export function Brands() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isHovered]);

  const current = testimonials[activeTestimonial];
  const roleParts = current[3].split(", ");
  const roleTitle = roleParts[0] || "";
  const companyName = roleParts[1] || "";

  return (
    <section className="brands" aria-labelledby="brands-title">
      <div className="brands__inner shell">
        <header className="brands__intro reveal-header">
          <h2 id="brands-title">Working with Teams That Value Design</h2>
        </header>

        <div className="brand-strip" aria-label="Selected companies and platforms">
          <div className="brand-track">
            {[...companyMarks, ...companyMarks].map(([label, mark, modifier], index) => (
              <span
                className={`brand-mark ${modifier}`}
                aria-label={index < companyMarks.length ? label : undefined}
                aria-hidden={index >= companyMarks.length}
                key={`${label}-${index}`}
              >
                {mark}
              </span>
            ))}
          </div>
        </div>

        {/* Full-width Compact Testimonial Banner with Grid Crosshair & Moving Light Beams */}
        <div
          className="testimonial-card-stage"
          aria-label="Client testimonials"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Moving Light Beams Grid Overlay */}
          <div className="testimonial-card__grid-overlay" aria-hidden="true">
            <div className="testimonial-grid-line testimonial-grid-line--horiz">
              <div className="testimonial-grid-beam testimonial-grid-beam--horiz" />
            </div>
            <div className="testimonial-grid-line testimonial-grid-line--vert">
              <div className="testimonial-grid-beam testimonial-grid-beam--vert" />
            </div>
          </div>

          {/* Testimonial Card Body */}
          <div className="testimonial-card__body">
            {/* Left: Client Portrait Photo */}
            <div className="testimonial-card__photo-frame">
              <img
                key={activeTestimonial}
                className="testimonial-card__photo"
                src={testimonialPhotos[activeTestimonial]}
                alt={current[2]}
                loading="lazy"
              />
            </div>

            {/* Middle: Client Quote & Info */}
            <div className="testimonial-card__content">
              <blockquote className="testimonial-card__quote" key={current[4]}>
                “{current[4]}”
              </blockquote>

              <div className="testimonial-card__author-info">
                <div className="testimonial-card__name-row">
                  <strong className="testimonial-card__name">{current[2]}</strong>
                  <svg
                    className="testimonial-card__badge"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    aria-label="Verified client"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      fill="var(--accent-bright)"
                    />
                  </svg>
                </div>
                <p className="testimonial-card__role">
                  <span>{roleTitle}</span>
                  {companyName && (
                    <>
                      <span className="testimonial-card__dot"> • </span>
                      <span>{companyName}</span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Right: Controls & Slide Counter */}
            <div className="testimonial-card__controls">
              <span className="testimonial-card__counter">
                0{activeTestimonial + 1} / 0{testimonials.length}
              </span>
              <div className="testimonial-card__arrows">
                <button
                  type="button"
                  className="testimonial-arrow-btn testimonial-arrow-btn--prev"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="testimonial-arrow-btn testimonial-arrow-btn--next"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());
  const toggleItem = (index: number) => setOpenItems((current) => {
    const next = new Set(current);
    if (next.has(index)) next.delete(index); else next.add(index);
    return next;
  });

  return <section className="faq" id="faq" aria-labelledby="faq-title"><div className="faq__inner shell">
    <header className="faq__intro reveal-header"><h2 id="faq-title">( FAQs )</h2><p>Got questions? Here’s everything you<br />need to know about working with me.</p></header>
    <div className="faq__list">{faqs.map(([question, answer], index) => {
      const isOpen = openItems.has(index);
      return <div className={`faq-item${isOpen ? " is-open" : ""}`} key={question}>
        <button className="faq-question" type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => toggleItem(index)}>{question}</button>
        <div className="faq-answer-wrap" id={`faq-answer-${index}`} aria-hidden={!isOpen}><div><p>{answer}</p></div></div>
      </div>;
    })}</div>
  </div></section>;
}

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <CurvedBanner />
      <div className="footer__inner shell">
        <div className="footer__contact">
          <p className="footer__eyebrow">LET'S CONNECT</p>
          <a className="footer__email" href="mailto:lescycaadlawon.dev@gmail.com" aria-label="Email lescycaadlawon dot dev at gmail dot com">
            <span className="footer__email-local" aria-hidden="true">lescycaadlawon.dev</span>
            <span className="footer__email-at" aria-hidden="true">@</span>
            <span className="footer__email-domain" aria-hidden="true">gmail.com</span>
          </a>
          <p className="footer__message">
            Have a project in mind or an idea worth exploring?
            <br />
            Let’s talk and create something meaningful together.
          </p>
        </div>
        <div className="footer__meta">
          <p>©2026 Lescy G. Caadlawon</p>
          <nav className="footer__socials" aria-label="Social links">
            <a href="https://www.linkedin.com/in/lescycaadlawon" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/Shindawn" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.facebook.com/lescygcaadlawon/" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://wa.me/639692467870" target="_blank" rel="noreferrer">WhatsApp</a>
          </nav>
          <p className="footer__credit">portfolio is currently being actively updated</p>
        </div>
      </div>
    </footer>
  );
}
