import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Footer, Navigation } from "./Sections";
import Book3D from "./Book3D";

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

export default function AboutPage() {
  const stackRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  // Stack Blitz Game State
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [combo, setCombo] = useState<number>(1);
  const [maxCombo, setMaxCombo] = useState<number>(1);
  const [targetIdx, setTargetIdx] = useState<number | null>(null);
  const [isBonus, setIsBonus] = useState<boolean>(false);
  const [hitFeedback, setHitFeedback] = useState<{ idx: number; text: string } | null>(null);

  const gridCells = Array.from({ length: 28 }, (_, i) => {
    if (i < techItems.length) {
      const tech = techItems[i];
      return { type: "tech", tech, id: `tech-${tech.name}` } as const;
    }
    return { type: "empty", id: `empty-${i}` } as const;
  });

  const playSynthSound = (frequency: number, type: OscillatorType = "sine", duration = 0.08) => {
    try {
      audioCtxRef.current ??= new AudioContext();
      if (audioCtxRef.current.state === "suspended") void audioCtxRef.current.resume();
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // Audio fallback
    }
  };

  const pickNextTarget = (prevIdx?: number | null) => {
    const techIndices = gridCells
      .map((c, i) => (c.type === "tech" ? i : -1))
      .filter((i) => i !== -1 && i !== prevIdx);
    const next = techIndices[Math.floor(Math.random() * techIndices.length)];
    setTargetIdx(next);
    setIsBonus(Math.random() < 0.22); // 22% chance of golden bonus star
  };

  const startBlitzGame = () => {
    setScore(0);
    setTimeLeft(20);
    setCombo(1);
    setMaxCombo(1);
    setHitFeedback(null);
    setGameState("playing");
    playSynthSound(440, "triangle", 0.12);
    pickNextTarget(null);
  };

  const exitBlitzGame = () => {
    setGameState("idle");
    setTargetIdx(null);
    setHitFeedback(null);
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameState("gameover");
          playSynthSound(587.33, "triangle", 0.25);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  const handleCellClick = (idx: number, isTech: boolean) => {
    if (gameState !== "playing" || !isTech) return;

    if (idx === targetIdx) {
      const addedScore = (isBonus ? 250 : 100) * combo;
      setScore((prev) => prev + addedScore);
      setCombo((prev) => Math.min(prev + 1, 5));
      setMaxCombo((prev) => Math.max(prev, combo));
      setHitFeedback({ idx, text: `+${addedScore}` });
      playSynthSound(520 + combo * 60, "sine", 0.09);
      setTimeout(() => setHitFeedback(null), 400);
      pickNextTarget(idx);
    } else {
      setCombo(1);
      playSynthSound(180, "sawtooth", 0.12);
    }
  };

  const getRankTitle = (finalScore: number) => {
    if (finalScore >= 3500) return { title: "10x Engineering Legend ⚡", color: "#22c55e" };
    if (finalScore >= 2200) return { title: "Senior Staff Architect 🚀", color: "#38bdf8" };
    if (finalScore >= 1200) return { title: "Full-Stack Specialist 💻", color: "#a855f7" };
    return { title: "Junior Code Tinkerer 🛠️", color: "#eab308" };
  };

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
            {/* Tech Stack Matrix Topbar with Game Controls */}
            <div className="about-matrix__topbar">
              {gameState === "idle" ? (
                <>
                  <div className="about-matrix__title-group">
                    <p className="about-experience__label">Tech Stack Matrix</p>
                    {hoveredTech && (
                      <span className="about-matrix__active-name">
                        <strong>{hoveredTech.name}</strong> • {hoveredTech.category}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="blitz-start-btn"
                    onClick={startBlitzGame}
                    title="Play Stack Blitz Mini-Game"
                  >
                    🎮 Play Blitz
                  </button>
                </>
              ) : gameState === "playing" ? (
                <>
                  <div className="blitz-stats">
                    <span className="blitz-timer">⏱️ {timeLeft}s</span>
                    <span className="blitz-score">⚡ {score} pts</span>
                    <span className={`blitz-combo blitz-combo--${combo}`}>🔥 {combo}x</span>
                  </div>
                  <button
                    type="button"
                    className="blitz-exit-btn"
                    onClick={exitBlitzGame}
                    title="Exit mini-game"
                  >
                    ✕ Stop
                  </button>
                </>
              ) : (
                <>
                  <p className="about-experience__label">Game Complete</p>
                  <button
                    type="button"
                    className="blitz-start-btn"
                    onClick={startBlitzGame}
                  >
                    ↻ Play Again
                  </button>
                </>
              )}
            </div>

            <div
              className={`about-matrix-grid ${gameState === "playing" ? "about-matrix-grid--game" : ""}`}
              role="region"
              aria-label="Interactive Tech Stack Matrix"
            >
              {/* Active Playing Grid */}
              {gridCells.map((cell, idx) => {
                const isTarget = gameState === "playing" && targetIdx === idx;
                const isHit = hitFeedback?.idx === idx;

                if (cell.type === "tech") {
                  return (
                    <div
                      key={cell.id}
                      className={`about-matrix-cell about-matrix-cell--tech ${
                        isTarget ? `about-matrix-cell--target ${isBonus ? "about-matrix-cell--bonus" : ""}` : ""
                      } ${isHit ? "about-matrix-cell--hit" : ""}`}
                      onClick={() => handleCellClick(idx, true)}
                      onMouseEnter={() => gameState === "idle" && setHoveredTech(cell.tech)}
                      onMouseLeave={() => gameState === "idle" && setHoveredTech(null)}
                      title={gameState === "idle" ? `${cell.tech.name} (${cell.tech.category})` : undefined}
                    >
                      {isTarget && (
                        <span className="blitz-target-badge">
                          {isBonus ? "⭐ +250" : "🎯 TAP"}
                        </span>
                      )}
                      {isHit && (
                        <span className="blitz-hit-float">{hitFeedback.text}</span>
                      )}
                      <img
                        className="about-matrix-cell__icon"
                        src={cell.tech.icon}
                        alt={cell.tech.name}
                        loading="lazy"
                      />
                    </div>
                  );
                }
                return (
                  <div
                    key={`empty-${idx}`}
                    className="about-matrix-cell about-matrix-cell--empty"
                    onClick={() => handleCellClick(idx, false)}
                  />
                );
              })}

              {/* Game Over Modal Screen Overlay */}
              {gameState === "gameover" && (
                <div className="blitz-overlay" role="dialog" aria-modal="true" aria-label="Game Over Scorecard">
                  <div className="blitz-card">
                    <span className="blitz-badge-trophy">🏆</span>
                    <h3 className="blitz-result-title">Stack Blitz Complete</h3>
                    
                    <div className="blitz-score-big">{score.toLocaleString()} <small>pts</small></div>
                    
                    <div className="blitz-rank" style={{ color: getRankTitle(score).color }}>
                      {getRankTitle(score).title}
                    </div>

                    <div className="blitz-breakdown">
                      <div className="blitz-stat-pill">
                        <span>Max Combo</span>
                        <strong>{maxCombo}x 🔥</strong>
                      </div>
                      <div className="blitz-stat-pill">
                        <span>Time Limit</span>
                        <strong>20s ⏱️</strong>
                      </div>
                    </div>

                    <div className="blitz-actions">
                      <button type="button" className="blitz-btn-replay" onClick={startBlitzGame}>
                        Play Again ↻
                      </button>
                      <button type="button" className="blitz-btn-close" onClick={exitBlitzGame}>
                        View Matrix ✕
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3D Flipping Book Education Section */}
      <section className="about-education book-education" aria-labelledby="academic-book-title">
        <header>
          <h2 id="academic-book-title">( Education )</h2>
          <p>An interactive 3D chronicle of university milestones, scholastic honors, merit grants, and leadership.</p>
        </header>

        <Book3D />
      </section>
      <Footer />
    </main>
  );
}
