import { covers, faqs, projects, testimonials } from "./data";
import HeroTitleEffect from "./HeroTitleEffect";
import { useState } from "react";

const companyMarks = [
  ["Vercel", "", "brand-mark--triangle"], ["Shopify", "S", ""],
  ["Webflow", "W", ""], ["Spotify", "≋", "brand-mark--round"],
  ["Airbnb", "A", "brand-mark--line"], ["Framer", "F", ""],
  ["Figma", "8", "brand-mark--line"], ["Linear", "╲", "brand-mark--round"],
  ["Notion", "N", "brand-mark--line"], ["Stripe", "S", ""],
] as const;

function Navigation() {
  return <nav className="nav shell" aria-label="Main navigation">
    <a className="brand" href="#home" aria-label="Lescy Gdawn, home">Lescy Gdawn</a>
    <div className="nav-links"><a href="#home">Home</a><a href="#about">About</a><a href="#work">Work</a><a className="button button--nav" href="mailto:hello@lescygdawn.com">Book a Call</a></div>
  </nav>;
}

export function Hero() {
  return <main className="hero" id="home"><Navigation /><section className="intro shell" aria-labelledby="hero-title">
    <div className="hero-title-wrap">
      <h1 id="hero-title"><span>LESCY</span><span>GDAWN</span></h1>
      <HeroTitleEffect />
    </div>
    <div className="hero-details" id="about"><div className="summary"><p>I design digital products end to end, combining reliable functionality with high-quality UI aligned to brand strategy. I work with agencies and private clients.</p><a className="button" href="#work">View all projects</a></div>
      <dl className="facts"><div><dt>Role</dt><dd>Independent designer &amp; engineer</dd></div><div><dt>Based</dt><dd>Manila, Philippines</dd></div><div><dt>Working with</dt><dd>Startups &amp; studios worldwide</dd></div></dl>
    </div>
  </section></main>;
}

export function SneakPeek() {
  return <section className="sneak-peek" aria-labelledby="sneak-peek-title"><div className="sneak-peek__inner shell">
    <header className="sneak-peek__intro"><p id="sneak-peek-title">Sneak peek of my works</p></header>
    <div className="project-shelf" aria-label="Selected project covers">{covers.map(([modifier, name]) => <div key={name} className={`shelf-slot shelf-slot--${modifier}`}><article className="shelf-book" aria-label={`${name} project`}><span>{name}</span></article></div>)}</div>
  </div></section>;
}

export function Expertise() {
  return <section className="expertise" id="expertise" aria-labelledby="expertise-title"><div className="expertise__inner shell">
    <header className="expertise__header reveal-header"><h2 id="expertise-title">( Expertise )</h2><p>I design and build strategic digital experiences that combine clarity, performance, and refined aesthetics to support real business growth.</p></header>
    <p className="expertise__services">
      <span className="expertise__service" tabIndex={0}>Product Design,</span>{" "}
      <span className="expertise__service" tabIndex={0}>Web Development,</span><br />
      <span className="expertise__service" tabIndex={0}>Brand Systems,</span>{" "}
      <span className="expertise__service" tabIndex={0}>Creative Direction.</span>
    </p>
  </div></section>;
}

export function LatestWork() {
  return <section className="latest-work" id="work" aria-labelledby="work-title"><div className="latest-work__inner shell">
    <header className="latest-work__intro reveal-header"><h2 id="work-title">( Latest Work )</h2><p>A curated selection of standout portfolios and projects<br />that define quality, craft, and timeless digital design.</p></header>
    <div className="project-list"><div className="project-list__head" aria-hidden="true"><span>Index</span><span>Project</span><span>Category</span><span /></div>
      {projects.map(([index, name, category, tag]) => <a className="project-row" href="#contact" key={index}><span className="project-row__index">{index}</span><span className="project-row__name">{name}</span><span className="project-row__category">{category} <small>{tag}</small></span><span className="project-row__arrow" aria-hidden="true">↗</span></a>)}
    </div>
  </div></section>;
}

export function Brands() {
  return <section className="brands" aria-labelledby="brands-title"><div className="brands__inner shell">
    <header className="brands__intro reveal-header"><h2 id="brands-title">( Companies I work with )</h2><p>Teams and tools I’ve collaborated with,<br />and what they say about working together.</p></header>
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
  return <footer className="footer" id="contact"><div className="footer__inner shell"><div className="footer__contact"><p className="footer__eyebrow">LET’S CONNECT</p><a className="footer__email" href="mailto:hi@lescy.tech">hi@lescy.tech</a><p className="footer__message">Whether it’s a full product build, a design partnership,<br />or a quick question — my inbox is always open.</p></div>
    <div className="footer__meta"><p>©2026 Lescy G. Caadlawon</p><nav className="footer__socials" aria-label="Social links"><a href="https://www.linkedin.com/in/lescycaadlawon" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/Shindawn" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.facebook.com/lescygcaadlawon/" target="_blank" rel="noreferrer">Facebook</a><a href="https://wa.me/639692467870" target="_blank" rel="noreferrer">WhatsApp</a></nav><p className="footer__credit">Designed &amp; developed by Lescy Gdawn</p></div><p className="footer__wordmark" aria-hidden="true"><span>LESCY</span><span>GDAWN</span></p>
  </div></footer>;
}
