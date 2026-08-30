import { useRef, type PointerEvent } from "react";
import HeroTitleEffect from "./HeroTitleEffect";
import { Footer, Navigation } from "./Sections";

const experience = [
  ["01", "Full-Stack Developer", "Jun – Aug 2026"],
  ["02", "IT Support & Maintenance", "Feb – May 2026"],
  ["03", "UI/UX Designer", "Feb 2025 – Feb 2026"],
  ["04", "Web Developer", "May 2023 – Nov 2025"],
  ["05", "Document Specialist", "May 2024 – May 2026"],
] as const;

const stack = [
  ["https://cdn.simpleicons.org/react/20a878", "React"],
  ["https://cdn.simpleicons.org/html5/20a878", "HTML5"],
  ["https://cdn.simpleicons.org/javascript/20a878", "JavaScript"],
  ["https://cdn.simpleicons.org/php/20a878", "PHP"],
  ["https://cdn.simpleicons.org/laravel/20a878", "Laravel"],
  ["https://cdn.simpleicons.org/nodedotjs/20a878", "Node.js"],
  ["https://cdn.simpleicons.org/mysql/20a878", "MySQL"],
  ["https://cdn.simpleicons.org/supabase/20a878", "Supabase"],
  ["https://cdn.simpleicons.org/firebase/20a878", "Firebase"],
  ["https://cdn.simpleicons.org/git/20a878", "Git"],
  ["https://cdn.simpleicons.org/github/20a878", "GitHub"],
  ["https://cdn.simpleicons.org/vercel/20a878", "Vercel"],
  ["https://cdn.simpleicons.org/postman/20a878", "Postman"],
  ["https://cdn.simpleicons.org/python/20a878", "Python"],
  ["https://cdn.simpleicons.org/openjdk/20a878", "Java"],
  ["https://cdn.simpleicons.org/figma/20a878", "Figma"],
  ["https://cdn.simpleicons.org/typescript/20a878", "TypeScript"],
  ["https://cdn.simpleicons.org/nextdotjs/20a878", "Next.js"],
  ["https://cdn.simpleicons.org/prisma/20a878", "Prisma"],
  ["https://cdn.simpleicons.org/cloudflare/20a878", "Cloudflare"],
  ["https://cdn.simpleicons.org/css/20a878", "CSS"],
  ["https://cdn.simpleicons.org/openapiinitiative/20a878", "OpenAPI"],
  ["https://cdn.simpleicons.org/jsonwebtokens/20a878", "JSON Web Tokens"],
  ["https://cdn.simpleicons.org/githubactions/20a878", "GitHub Actions"],
  ["https://cdn.simpleicons.org/neon/20a878", "Neon"],
] as const;

export default function AboutPage() {
  const stackRef = useRef<HTMLDivElement>(null);

  const moveCards = (event: PointerEvent<HTMLDivElement>) => {
    const stack = stackRef.current;
    if (!stack) return;
    const bounds = stack.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    stack.style.setProperty("--far-x", `${x * 56}px`);
    stack.style.setProperty("--far-y", `${y * 40}px`);
    stack.style.setProperty("--far-x-reverse", `${x * -48}px`);
    stack.style.setProperty("--far-y-reverse", `${y * -36}px`);
    stack.style.setProperty("--near-x", `${x * 28}px`);
    stack.style.setProperty("--near-y", `${y * 24}px`);
    stack.style.setProperty("--tilt-x", `${y * -7}deg`);
    stack.style.setProperty("--tilt-y", `${x * 9}deg`);
  };

  const resetCards = () => {
    ["--far-x", "--far-y", "--far-x-reverse", "--far-y-reverse", "--near-x", "--near-y"].forEach((property) => stackRef.current?.style.setProperty(property, "0px"));
    ["--tilt-x", "--tilt-y"].forEach((property) => stackRef.current?.style.setProperty(property, "0deg"));
  };

  return <main className="about-page">
    <Navigation />
    <section className="about-hero" aria-labelledby="about-page-title">
      <h1 id="about-page-title" className="about-hero__title">MEET LEC</h1>

      <div className="about-badges" aria-hidden="true">
        <span className="about-badge about-badge--one">Full-Stack Developer</span>
        <span className="about-badge about-badge--two">UI/UX Designer</span>
        <span className="about-badge about-badge--three">Web &amp; Mobile Apps</span>
        <span className="about-badge about-badge--four">Based in Manila</span>
        <span className="about-badge about-badge--five">Ideas to Production</span>
      </div>

      <div className="about-card-stack" ref={stackRef} onPointerMove={moveCards} onPointerLeave={resetCards}>
        <article className="about-polaroid about-polaroid--left"><div className="about-polaroid__art about-polaroid__art--left" /></article>
        <article className="about-polaroid about-polaroid--right"><div className="about-polaroid__art about-polaroid__art--right" /></article>
        <article className="about-polaroid about-polaroid--main">
          <div className="about-polaroid__art about-polaroid__art--main" />
          <footer><span>Fig. 01 — Portrait</span><span>Lescy Gdawn, 2026</span></footer>
        </article>
      </div>
    </section>

    <section className="about-introduction" aria-labelledby="introduction-title">
      <div className="pixel-heading"><h2 id="introduction-title">( Introduction )</h2><HeroTitleEffect selector="h2" canvasClassName="pixel-heading-canvas" /></div>
      <p>Lescy is a full-stack developer and UI/UX designer who builds clear, reliable digital experiences from concept to deployment.</p>
    </section>

    <section className="about-experience" aria-labelledby="experience-title">
      <header>
        <div className="pixel-heading"><h2 id="experience-title">( Experience )</h2><HeroTitleEffect selector="h2" canvasClassName="pixel-heading-canvas" /></div>
        <p>A look at my professional journey and the tools I work with.</p>
      </header>
      <div className="about-experience__grid">
        <div className="about-experience__column">
          <p className="about-experience__label">Career</p>
          <div className="about-experience__list">{experience.map(([index, name, discipline]) => <article className="about-experience__item" key={index}><span className="about-experience__index">{index}</span><strong>{name}</strong><span>{discipline}</span></article>)}</div>
        </div>
        <div className="about-experience__column">
          <p className="about-experience__label">Stack</p>
          <div className="about-experience__list about-experience__list--stack">{stack.map(([logo, name]) => <article className="about-experience__item about-experience__item--stack" key={name} title={name}><img className="about-experience__logo" src={logo} alt={name} loading="lazy" /></article>)}</div>
        </div>
      </div>
    </section>
    <Footer />
  </main>;
}
