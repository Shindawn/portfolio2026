import { covers, faqs, projects, testimonials } from "./data";
import HeroTitleEffect from "./HeroTitleEffect";
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
  return <nav className="nav shell" aria-label="Main navigation">
    <div className="nav-start"><ThemeToggle /><a className="brand" href="/" aria-label="Lescy Gdawn, home">Lescy Gdawn</a><NavClock /></div>
    <div className="nav-links"><details className="file-menu"><summary>File</summary><div className="file-menu__dropdown">
      <a href="/LescyGCaadlawon_CV.pdf" target="_blank" rel="noreferrer"><span>Preview Resume</span><small aria-hidden="true">↗</small></a>
      <a href="/LescyGCaadlawon_CV.pdf" download="LescyGCaadlawon_CV.pdf"><span>Download Resume</span><small aria-hidden="true">↓</small></a>
    </div></details><a href="/">Home</a><a href="/about">About</a><a href="/#work">Work</a><a className="button button--nav" href="mailto:hello@lescygdawn.com">Book a Call</a></div>
  </nav>;
}

export function Hero() {
  return <main className="hero" id="home"><Navigation /><section className="intro shell" aria-labelledby="hero-title">
    <div className="hero-title-wrap">
      <h1 id="hero-title"><span>LESCY</span><span>GDAWN</span></h1>
      <HeroTitleEffect />
    </div>
    <div className="hero-details" id="about"><div className="summary"><p>I build full-stack web systems end to end — from database schema and REST APIs to cloud deployment — backed by a UI/UX design background that keeps every interface clear and intentional.</p><a className="button" href="#work">View all projects</a></div>
      <dl className="facts"><div><dt>Role</dt><dd>Full-Stack Developer &amp; UI/UX Designer</dd></div><div><dt>Based</dt><dd>Mandaluyong, Philippines</dd></div><div><dt>Working with</dt><dd>Startups, LGUs &amp; freelance clients</dd></div></dl>
    </div>
  </section></main>;
}

export function SneakPeek() {
  const [openCover, setOpenCover] = useState<number | null>(null);

  useEffect(() => {
    if (openCover === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenCover(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [openCover]);

  return <><section className="sneak-peek" aria-labelledby="sneak-peek-title"><div className="sneak-peek__inner shell">
    <header className="sneak-peek__intro"><p id="sneak-peek-title">Sneak peek of my works</p></header>
    <div className="project-shelf" aria-label="Selected project covers">{covers.map(([modifier, name, artwork], index) => <div key={name} className={`shelf-slot shelf-slot--${modifier}`} style={{ "--layer": index, "--art": artwork } as CSSProperties}>
      <button
        className={`shelf-book${[1, 3].includes(index) ? " shelf-book--glass" : ""}`}
        type="button"
        aria-label={`Preview ${name} project`}
        aria-haspopup="dialog"
        onClick={() => setOpenCover((current) => current === index ? null : index)}
      ><span>{name}</span></button>
    </div>)}</div>
  </div></section>

  {openCover !== null && <div
    className="cover-preview is-open"
    role="dialog"
    aria-modal="true"
    aria-label={`${covers[openCover][1]} project preview`}
    onClick={() => setOpenCover(null)}
  >
    <div className="cover-preview__panel" onClick={(event) => event.stopPropagation()}>
      <div className="cover-preview__image" style={{ "--art": covers[openCover][2] } as CSSProperties} />
      <p>{covers[openCover][1]}</p>
      <button type="button" className="cover-preview__close" onClick={() => setOpenCover(null)} aria-label="Close project preview">×</button>
    </div>
  </div>}
  </>;
}

export function Expertise() {
  return <section className="expertise" id="expertise" aria-labelledby="expertise-title"><div className="expertise__inner shell">
    <header className="expertise__header reveal-header"><div className="pixel-heading"><h2 id="expertise-title">( Expertise )</h2><HeroTitleEffect selector="h2" canvasClassName="pixel-heading-canvas" /></div><p>A degree holder in Information Technology with hands-on experience building backend-driven web applications, REST APIs, and database systems — paired with a design background in UI/UX and visual design.</p></header>
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
    <header className="latest-work__intro reveal-header"><div className="pixel-heading"><h2 id="work-title">( Latest Work )</h2><HeroTitleEffect selector="h2" canvasClassName="pixel-heading-canvas" /></div><p>A selection of systems I’ve shipped end to end — from a full-stack<br />LGU management platform to an AI-powered portfolio and AR UI design.</p></header>
    <div className="project-list" onPointerMove={movePreview} onPointerLeave={() => setActiveProject(null)}><div className="project-list__head" aria-hidden="true"><span>Index</span><span>Project</span><span>Category</span><span /></div>
      {projects.map(([index, name, category, tag], projectIndex) => <a className="project-row" href="#contact" key={index} onPointerEnter={() => setActiveProject(projectIndex)} onFocus={() => setActiveProject(projectIndex)} onBlur={() => setActiveProject(null)}>
        <span className="project-row__index">{index}</span><span className="project-row__name">{name}</span><span className="project-row__category">{category} <small>{tag}</small></span><span className="project-row__arrow" aria-hidden="true">↗</span>
      </a>)}
      {activeProject !== null && <span className="project-preview is-visible" aria-hidden="true" style={{ "--art": projects[activeProject][4], "--preview-x": `${previewPosition.x}px`, "--preview-y": `${previewPosition.y}px`, "--preview-offset-x": previewPosition.flip ? "calc(-100% - 1.5rem)" : "1.5rem" } as CSSProperties}><span className="project-preview__image" /><span className="project-preview__shade" /><span className="project-preview__content"><span className="project-preview__eyebrow">About the project</span><span className="project-preview__description">{projects[activeProject][5]}</span></span></span>}
    </div>
  </div></section>;
}

export function Brands() {
  return <section className="brands" aria-labelledby="brands-title"><div className="brands__inner shell">
    <header className="brands__intro reveal-header"><div className="pixel-heading"><h2 id="brands-title">( Companies I work with )</h2><HeroTitleEffect selector="h2" canvasClassName="pixel-heading-canvas" /></div><p>Teams and tools I’ve collaborated with,<br />and what they say about working together.</p></header>
    <div className="brand-strip" aria-label="Selected companies and platforms"><div className="brand-track">
      {[...companyMarks, ...companyMarks].map(([label, mark, modifier], index) => <span className={`brand-mark ${modifier}`} aria-label={index < companyMarks.length ? label : undefined} aria-hidden={index >= companyMarks.length} key={`${label}-${index}`}>{mark}</span>)}
    </div></div>
    <div className="testimonials" aria-label="Client testimonials">{testimonials.map(([modifier, initials, name, role, quote]) => <article className={`testimonial testimonial--${modifier}`} key={name}><blockquote>“{quote}”</blockquote><div className="testimonial__person"><span className={`avatar avatar--${modifier}`} aria-hidden="true">{initials}</span><p><strong>{name}</strong><span>{role}</span></p></div></article>)}</div>
  </div></section>;
}

export function Faq() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());
  const toggleItem = (index: number) => setOpenItems((current) => {
    const next = new Set(current);
    if (next.has(index)) next.delete(index); else next.add(index);
    return next;
  });

  return <section className="faq" id="faq" aria-labelledby="faq-title"><div className="faq__inner shell">
    <header className="faq__intro reveal-header"><div className="pixel-heading"><h2 id="faq-title">( FAQs )</h2><HeroTitleEffect selector="h2" canvasClassName="pixel-heading-canvas" /></div><p>Got questions? Here’s everything you<br />need to know about working with me.</p></header>
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
  return <footer className="footer" id="contact"><div className="footer__inner shell"><div className="footer__contact"><p className="footer__eyebrow">LET’S CONNECT</p><a className="footer__email" href="mailto:hi@lescy.tech" aria-label="Email hi at lescy dot tech"><span className="footer__email-local" aria-hidden="true">hi</span><span className="footer__email-at" aria-hidden="true">@</span><span className="footer__email-domain" aria-hidden="true">lescy.tech</span></a><p className="footer__message">Have a project in mind or an idea worth exploring?<br />Let’s talk and create something meaningful together.</p></div>
    <div className="footer__meta"><p>©2026 Lescy G. Caadlawon</p><nav className="footer__socials" aria-label="Social links"><a href="https://www.linkedin.com/in/lescycaadlawon" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/Shindawn" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.facebook.com/lescygcaadlawon/" target="_blank" rel="noreferrer">Facebook</a><a href="https://wa.me/639692467870" target="_blank" rel="noreferrer">WhatsApp</a></nav><p className="footer__credit">Thoughtfully crafted by Lescy Gdawn</p></div><p className="footer__wordmark" aria-hidden="true"><span>LESCY</span><span>GDAWN</span></p>
  </div></footer>;
}
