import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Footer, Navigation } from "./Sections";
import Book3D from "./Book3D";
import HangingIdCard from "./HangingIdCard";
import HeroBeamLines from "./HeroBeamLines";

const experience = [
  ["01", "Full-Stack Developer", "Jun – Aug 2026"],
  ["02", "IT Support & Maintenance Intern", "Feb – May 2026"],
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
  { name: "Adobe", icon: "/adobe.svg", category: "Creative Suite" },
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

  // Retro Arcade Snake Game State
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [snake, setSnake] = useState<Array<{ x: number; y: number }>>([
    { x: 3, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 1 },
  ]);
  const dirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const nextDirRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const [food, setFood] = useState<{ x: number; y: number; tech: TechItem } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem("matrix_snake_highscore");
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [eatenCount, setEatenCount] = useState<number>(0);
  const [eatenFeedback, setEatenFeedback] = useState<string | null>(null);

  const gridCells = Array.from({ length: 28 }, (_, i) => {
    const x = i % 7;
    const y = Math.floor(i / 7);
    if (i < techItems.length) {
      const tech = techItems[i];
      return { type: "tech", tech, id: `tech-${tech.name}`, x, y } as const;
    }
    return { type: "empty", id: `empty-${i}`, x, y } as const;
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

  const spawnFood = (currentSnake: Array<{ x: number; y: number }>) => {
    const availableCells = gridCells.filter(
      (cell) => cell.type === "tech" && !currentSnake.some((seg) => seg.x === cell.x && seg.y === cell.y)
    );
    if (availableCells.length === 0) return;
    const chosen = availableCells[Math.floor(Math.random() * availableCells.length)];
    if (chosen.type === "tech") {
      setFood({ x: chosen.x, y: chosen.y, tech: chosen.tech });
    }
  };

  const startSnakeGame = () => {
    const initialSnake = [
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    setSnake(initialSnake);
    setScore(0);
    setEatenCount(0);
    setEatenFeedback(null);
    setGameState("playing");
    playSynthSound(440, "triangle", 0.12);
    spawnFood(initialSnake);
  };

  const exitSnakeGame = () => {
    setGameState("idle");
    setFood(null);
    setEatenFeedback(null);
  };

  const changeDirection = (dx: number, dy: number) => {
    if (gameState !== "playing") return;
    const cur = dirRef.current;
    // Prevent 180-degree reverse suicide
    if (dx !== 0 && cur.x === -dx) return;
    if (dy !== 0 && cur.y === -dy) return;
    nextDirRef.current = { x: dx, y: dy };
  };

  // Keyboard navigation
  useEffect(() => {
    if (gameState !== "playing") return;

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          changeDirection(0, -1);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          changeDirection(0, 1);
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          changeDirection(-1, 0);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          changeDirection(1, 0);
          break;
        case "Escape":
          exitSnakeGame();
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState]);

  // Snake movement tick
  useEffect(() => {
    if (gameState !== "playing") return;

    const currentSpeed = Math.max(160, 260 - eatenCount * 6);
    const interval = window.setInterval(() => {
      dirRef.current = nextDirRef.current;
      const curDir = dirRef.current;

      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = { x: head.x + curDir.x, y: head.y + curDir.y };

        // Wall collision check
        if (newHead.x < 0 || newHead.x >= 7 || newHead.y < 0 || newHead.y >= 4) {
          setGameState("gameover");
          playSynthSound(160, "sawtooth", 0.22);
          return prevSnake;
        }

        // Self collision check
        if (prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameState("gameover");
          playSynthSound(160, "sawtooth", 0.22);
          return prevSnake;
        }

        // Food consumption check
        if (food && newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => {
            const nextScore = s + 100;
            setHighScore((prevHigh) => {
              const newHigh = Math.max(prevHigh, nextScore);
              try {
                localStorage.setItem("matrix_snake_highscore", String(newHigh));
              } catch {}
              return newHigh;
            });
            return nextScore;
          });
          setEatenCount((c) => c + 1);
          setEatenFeedback(`+ ${food.tech.name}`);
          playSynthSound(580 + (eatenCount % 8) * 40, "triangle", 0.09);
          setTimeout(() => setEatenFeedback(null), 700);

          const grownSnake = [newHead, ...prevSnake];
          spawnFood(grownSnake);
          return grownSnake;
        }

        // Standard movement: move forward, pop tail
        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, currentSpeed);

    return () => clearInterval(interval);
  }, [gameState, food, eatenCount]);

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
        <HeroBeamLines />

        <h1 id="about-page-title" className="about-hero__title">
          MEET LEC
        </h1>

        {/* Interactive 3D Hanging Lanyard ID Card with Gravitational Motion Physics & Soft Bounce */}
        <HangingIdCard />
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
            {/* Tech Stack Matrix Topbar with Retro Snake Controls */}
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
                    onClick={startSnakeGame}
                    title="Play Retro Snake on the Matrix"
                  >
                    🕹️ Play Snake
                  </button>
                </>
              ) : gameState === "playing" ? (
                <>
                  <div className="blitz-stats">
                    <span className="blitz-score">{score} pts</span>
                    {highScore > 0 && (
                      <span className="snake-length-badge" title="Highest score achieved">
                        🏆 Best: {highScore.toLocaleString()}
                      </span>
                    )}
                    <span className="snake-length-badge">Stack: {snake.length}</span>
                    {eatenFeedback && <span className="snake-toast-pill">{eatenFeedback}</span>}
                  </div>
                  <button
                    type="button"
                    className="blitz-exit-btn"
                    onClick={exitSnakeGame}
                    title="Exit Snake"
                  >
                    ✕ Stop
                  </button>
                </>
              ) : (
                <>
                  <p className="about-experience__label">Game Over</p>
                  <button
                    type="button"
                    className="blitz-start-btn"
                    onClick={startSnakeGame}
                  >
                    Play Again ↺
                  </button>
                </>
              )}
            </div>

            <div
              className={`about-matrix-grid ${gameState === "playing" ? "about-matrix-grid--snake" : ""}`}
              role="region"
              aria-label="Interactive Tech Stack Matrix"
            >
              {/* Active Playing Grid */}
              {gridCells.map((cell, idx) => {
                const isHead = gameState === "playing" && snake[0]?.x === cell.x && snake[0]?.y === cell.y;
                const isBody =
                  gameState === "playing" &&
                  !isHead &&
                  snake.some((seg) => seg.x === cell.x && seg.y === cell.y);
                const isFood = gameState === "playing" && food?.x === cell.x && food?.y === cell.y;

                if (cell.type === "tech") {
                  return (
                    <div
                      key={cell.id}
                      className={`about-matrix-cell about-matrix-cell--tech ${
                        isHead
                          ? "about-matrix-cell--snake-head"
                          : isBody
                          ? "about-matrix-cell--snake-body"
                          : isFood
                          ? "about-matrix-cell--snake-food"
                          : ""
                      }`}
                      onMouseEnter={() => gameState === "idle" && setHoveredTech(cell.tech)}
                      onMouseLeave={() => gameState === "idle" && setHoveredTech(null)}
                      title={gameState === "idle" ? `${cell.tech.name} (${cell.tech.category})` : undefined}
                    >
                      {isFood && <span className="snake-food-dot" />}
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
                    className={`about-matrix-cell about-matrix-cell--empty ${
                      isHead
                        ? "about-matrix-cell--snake-head"
                        : isBody
                        ? "about-matrix-cell--snake-body"
                        : ""
                    }`}
                  />
                );
              })}

              {/* Game Over Modal Screen Overlay */}
              {gameState === "gameover" && (
                <div className="blitz-overlay" role="dialog" aria-modal="true" aria-label="Game Over Scorecard">
                  <div className="blitz-card">
                    <span className="blitz-eyebrow">Game Over</span>
                    
                    <div className="blitz-score-big">
                      {score.toLocaleString()} <small>pts</small>
                    </div>
                    
                    <div className="blitz-rank">
                      {score > 0 && score >= highScore ? (
                        <span>🎉 NEW HIGH SCORE!</span>
                      ) : (
                        <span>🏆 High Score: <strong>{highScore.toLocaleString()} pts</strong></span>
                      )}
                    </div>

                    <div className="blitz-breakdown">
                      <div className="blitz-stat-item">
                        <span className="blitz-stat-label">Stack Size</span>
                        <strong className="blitz-stat-value">{snake.length} items</strong>
                      </div>
                      <div className="blitz-stat-divider" aria-hidden="true" />
                      <div className="blitz-stat-item">
                        <span className="blitz-stat-label">Tech Eaten</span>
                        <strong className="blitz-stat-value">{eatenCount}</strong>
                      </div>
                    </div>

                    <div className="blitz-actions">
                      <button type="button" className="blitz-btn-replay" onClick={startSnakeGame}>
                        Play Again ↺
                      </button>
                      <button type="button" className="blitz-btn-close" onClick={exitSnakeGame}>
                        Back to Matrix
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile / Clickable Directional D-Pad when Snake is Active */}
            {gameState === "playing" && (
              <div className="snake-controls" aria-label="Snake Controls">
                <button
                  type="button"
                  className="snake-btn snake-btn--up"
                  onClick={() => changeDirection(0, -1)}
                  aria-label="Up"
                >
                  ▲
                </button>
                <div className="snake-controls__middle">
                  <button
                    type="button"
                    className="snake-btn snake-btn--left"
                    onClick={() => changeDirection(-1, 0)}
                    aria-label="Left"
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    className="snake-btn snake-btn--down"
                    onClick={() => changeDirection(0, 1)}
                    aria-label="Down"
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    className="snake-btn snake-btn--right"
                    onClick={() => changeDirection(1, 0)}
                    aria-label="Right"
                  >
                    ▶
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3D Flipping Book Education Section */}
      <section className="about-education book-education" aria-labelledby="academic-book-title">
        <header className="about-education__header shell">
          <p className="about-education__desc">
            University milestones, Dean's Honor Roll distinctions, and technical certifications.
          </p>
          <h2 id="academic-book-title" className="about-education__title">
            ( Education )
          </h2>
        </header>

        <Book3D />
      </section>
      <Footer />
    </main>
  );
}
