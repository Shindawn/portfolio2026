import { useRef, useState, type PointerEvent } from "react";
import { Footer, Navigation } from "./Sections";

const experience = [
  ["01", "Full-Stack Developer", "Jun – Aug 2026"],
  ["02", "IT Support & Maintenance", "Feb – May 2026"],
  ["03", "UI/UX Designer", "Feb 2025 – Feb 2026"],
  ["04", "Web Developer", "May 2023 – Nov 2025"],
  ["05", "Document Specialist", "May 2024 – May 2026"],
] as const;

interface TechItem {
  name: string;
  icon: string;
  category: string;
}

const techItems: TechItem[] = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/20a878", category: "Frontend" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/20a878", category: "Framework" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/20a878", category: "Language" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/20a878", category: "Runtime" },
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/20a878", category: "Backend" },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/20a878", category: "Language" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/20a878", category: "Database" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/20a878", category: "Database" },
  { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/20a878", category: "ORM" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/20a878", category: "BaaS" },
  { name: "Neon", icon: "https://cdn.simpleicons.org/neon/20a878", category: "Database" },
  { name: "Cloudflare", icon: "https://cdn.simpleicons.org/cloudflare/20a878", category: "Edge & R2" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/20a878", category: "BaaS" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/20a878", category: "Deploy" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/20a878", category: "VCS" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/20a878", category: "Platform" },
  { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions/20a878", category: "CI/CD" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/20a878", category: "UI/UX" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/20a878", category: "Language" },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/20a878", category: "Frontend" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/20a878", category: "Styling" },
  { name: "Postman", icon: "https://cdn.simpleicons.org/postman/20a878", category: "API Testing" },
  { name: "OpenAPI", icon: "https://cdn.simpleicons.org/openapiinitiative/20a878", category: "Specs" },
  { name: "JWT", icon: "https://cdn.simpleicons.org/jsonwebtokens/20a878", category: "Auth" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/20a878", category: "Language" },
  { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/20a878", category: "Language" },
];

interface AcademicTab {
  id: string;
  label: string;
  image: string;
  description: string;
  statLabel: string;
  statValue: string;
  secondaryStatLabel?: string;
  secondaryStatValue?: string;
}

const academicTabs: AcademicTab[] = [
  {
    id: "education",
    label: "Education",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    description:
      "Bachelor of Science in Information Technology at Catanduanes State University (2022 – 2026). Comprehensive study of distributed architectures, full-stack systems engineering, database modeling, and human-centered digital products.",
    statLabel: "Standing",
    statValue: "1.4 GWA (Cum Laude)",
  },
  {
    id: "awards",
    label: "Awards & Certs",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=600&q=80",
    description:
      "Recognized with consecutive Dean's Honor Roll standing across academic years, complemented by industry credentials in modern full-stack web architectures, API specifications, and cloud computing foundations.",
    statLabel: "Honors",
    statValue: "Dean's Lister (2022–2026)",
  },
  {
    id: "scholarships",
    label: "Scholarships",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    description:
      "Awarded competitive tertiary academic scholarships based on consistent GPA performance and scholastic excellence, receiving full institutional tuition grants and research project funding.",
    statLabel: "Grant",
    statValue: "Tertiary Academic Scholar",
  },
  {
    id: "affiliations",
    label: "Affiliations",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    description:
      "Active member and student leader in collegiate computing organizations and developer circles, leading code jams, peer mentoring sessions, and UI/UX design workshops across campus.",
    statLabel: "Leadership",
    statValue: "IT Society & Tech Guild",
  },
];

export default function AboutPage() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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
    ["--far-x", "--far-y", "--far-x-reverse", "--far-y-reverse", "--near-x", "--near-y"].forEach((property) =>
      stackRef.current?.style.setProperty(property, "0px")
    );
    ["--tilt-x", "--tilt-y"].forEach((property) => stackRef.current?.style.setProperty(property, "0deg"));
  };

  const gridCells = Array.from({ length: 28 }, (_, i) => {
    if (i < techItems.length) {
      const tech = techItems[i];
      return { type: "tech", tech, id: `tech-${tech.name}` } as const;
    }
    return { type: "empty", id: `empty-${i}` } as const;
  });

  return (
    <main className="about-page">
      <Navigation />
      <section className="about-hero" aria-labelledby="about-page-title">
        <h1 id="about-page-title" className="about-hero__title">
          MEET LEC
        </h1>

        <div className="about-badges" aria-hidden="true">
          <span className="about-badge about-badge--one">Full-Stack Developer</span>
          <span className="about-badge about-badge--two">UI/UX Designer</span>
          <span className="about-badge about-badge--three">Web &amp; Mobile Apps</span>
          <span className="about-badge about-badge--four">Based in Manila</span>
          <span className="about-badge about-badge--five">Ideas to Production</span>
        </div>

        <div className="about-card-stack" ref={stackRef} onPointerMove={moveCards} onPointerLeave={resetCards}>
          <article className="about-polaroid about-polaroid--left">
            <div className="about-polaroid__art about-polaroid__art--left" />
          </article>
          <article className="about-polaroid about-polaroid--right">
            <div className="about-polaroid__art about-polaroid__art--right" />
          </article>
          <article className="about-polaroid about-polaroid--main">
            <div className="about-polaroid__art about-polaroid__art--main" />
            <footer>
              <span>Fig. 01 — Portrait</span>
              <span>Lescy Gdawn, 2026</span>
            </footer>
          </article>
        </div>
      </section>

      <section className="about-introduction" aria-labelledby="introduction-title">
        <h2 id="introduction-title">( Introduction )</h2>
        <p>
          Lescy is a full-stack developer and UI/UX designer who builds clear, reliable digital experiences from concept to deployment.
        </p>
      </section>

      <section className="about-experience" aria-labelledby="experience-title">
        <header>
          <h2 id="experience-title">( Experience )</h2>
          <p>A look at my professional journey and the tools I work with.</p>
        </header>
        <div className="about-experience__grid">
          <div className="about-experience__column about-experience__column--career">
            <p className="about-experience__label">Career</p>
            <div className="about-experience__list">
              {experience.map(([index, name, discipline]) => (
                <article className="about-experience__item" key={index}>
                  <span className="about-experience__index">{index}</span>
                  <strong>{name}</strong>
                  <span>{discipline}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="about-experience__column about-experience__column--stack">
            <div className="about-matrix__topbar">
              <p className="about-experience__label">Tech Stack Matrix</p>
              {hoveredTech ? (
                <span className="about-matrix__active-name">
                  <strong>{hoveredTech.name}</strong> • {hoveredTech.category}
                </span>
              ) : (
                <span className="about-matrix__hint">Hover cells to reveal stack</span>
              )}
            </div>

            <div className="about-matrix-grid" role="region" aria-label="Interactive Tech Stack Matrix">
              {gridCells.map((cell, idx) => {
                if (cell.type === "tech") {
                  return (
                    <div
                      key={cell.id}
                      className="about-matrix-cell about-matrix-cell--tech"
                      onMouseEnter={() => setHoveredTech(cell.tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      title={`${cell.tech.name} (${cell.tech.category})`}
                    >
                      <img
                        className="about-matrix-cell__icon"
                        src={cell.tech.icon}
                        alt={cell.tech.name}
                        loading="lazy"
                      />
                    </div>
                  );
                }
                return <div key={`empty-${idx}`} className="about-matrix-cell about-matrix-cell--empty" />;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Folder Tabs Academic Section */}
      <section className="about-education folder-education" aria-labelledby="academic-folder-title">
        <header>
          <h2 id="academic-folder-title">( Academic Background &amp; Honors )</h2>
          <p>University foundation, scholastic honors, scholarship grants, and collegiate leadership.</p>
        </header>

        <div className="folder-education__container">
          {/* Tab Bar with seamlessly connected active tab */}
          <div className="folder-tabs__bar" role="tablist" aria-label="Academic & Background Tabs">
            {academicTabs.map((tab, idx) => {
              const isActive = idx === activeTabIndex;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`folder-panel-${tab.id}`}
                  id={`folder-tab-${tab.id}`}
                  className={`folder-tab-btn ${isActive ? "folder-tab-btn--active" : ""}`}
                  onClick={() => setActiveTabIndex(idx)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Seamless Folder Card Body */}
          <div
            className={`folder-card folder-card--active-${activeTabIndex}`}
            role="tabpanel"
            id={`folder-panel-${academicTabs[activeTabIndex].id}`}
            aria-labelledby={`folder-tab-${academicTabs[activeTabIndex].id}`}
          >
            <div className="folder-card__media">
              <img
                key={academicTabs[activeTabIndex].id}
                src={academicTabs[activeTabIndex].image}
                alt={academicTabs[activeTabIndex].label}
                className="folder-card__img"
                loading="lazy"
              />
            </div>

            <div className="folder-card__content" key={`content-${academicTabs[activeTabIndex].id}`}>
              <p className="folder-card__description">{academicTabs[activeTabIndex].description}</p>

              <div className="folder-card__stat-row">
                <span className="folder-card__stat-label">{academicTabs[activeTabIndex].statLabel}</span>
                <strong className="folder-card__stat-value">{academicTabs[activeTabIndex].statValue}</strong>
              </div>

              {academicTabs[activeTabIndex].secondaryStatLabel && (
                <div className="folder-card__stat-row folder-card__stat-row--sub">
                  <span className="folder-card__stat-label">{academicTabs[activeTabIndex].secondaryStatLabel}</span>
                  <strong className="folder-card__stat-value">{academicTabs[activeTabIndex].secondaryStatValue}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
