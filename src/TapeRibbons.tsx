import { useState } from "react";

interface TapeTrackProps {
  text: string;
  subtext?: string;
  theme: "yellow" | "white" | "blue";
  angle: number;
  direction: "left" | "right";
  speedSeconds: number;
  zIndex: number;
  isPaused: boolean;
}

const tapeItems = [
  {
    theme: "yellow" as const,
    angle: -2.2,
    direction: "left" as const,
    speedSeconds: 32,
    zIndex: 5,
    quotes: [
      { text: "“THIS SECTION IS CURRENTLY BEING UPDATED”", tag: "—DEV DISPATCH" },
      { text: "“DON'T JUST TALK ABOUT IT, BE ABOUT IT”", tag: "—THE REVIEW" },
      { text: "“SHOUT-OUT TO THE CULTURE”", tag: "—WEEKLY PRESS" },
      { text: "“NEW CASE STUDIES & SYSTEM ARCHITECTURE INCOMING”", tag: "—WIP 2026" },
    ],
  },
  {
    theme: "white" as const,
    angle: 1.4,
    direction: "right" as const,
    speedSeconds: 38,
    zIndex: 4,
    quotes: [
      { text: "“DON'T JUST TALK ABOUT IT, BE ABOUT IT”", tag: "—WEEKLY PRESS" },
      { text: "“NEW PRODUCT RELEASES & LIVE DEMOS IN STAGING”", tag: "—BUILD LOG" },
      { text: "“POLISHING THE CODE & CRAFTING DETAILED CASE STUDIES”", tag: "—DEV ARCHIVE" },
      { text: "“QUALITY OVER RUSH • DOCUMENTING IMPACT”", tag: "—PRODUCTION" },
    ],
  },
  {
    theme: "blue" as const,
    angle: -0.9,
    direction: "left" as const,
    speedSeconds: 30,
    zIndex: 6,
    quotes: [
      { text: "“LIMITED EDITION STATUE”", tag: "—CITY PAPER" },
      { text: "“CELEBRATES A GOLDEN ANNIVERSARY DOWNTOWN”", tag: "—CITY PAPER" },
      { text: "“FULL-STACK SYSTEMS • HIGH SPEED ARCHITECTURE • AR UI”", tag: "—DISPATCH" },
      { text: "“NEXT-GEN WORK UNDER ACTIVE CRAFT”", tag: "—2026 STATUS" },
    ],
  },
  {
    theme: "white" as const,
    angle: 1.9,
    direction: "right" as const,
    speedSeconds: 36,
    zIndex: 3,
    quotes: [
      { text: "“CELEBRATES A GOLDEN ANNIVERSARY DOWNTOWN”", tag: "—CITY PAPER" },
      { text: "“THE LOUDEST COMMIT FEED IN THE DISTRICT”", tag: "—WEEKLY PRESS" },
      { text: "“BENCHMARKS, SCHEMAS & PRODUCTION METRICS BEING WRITTEN”", tag: "—CHANGELOG" },
      { text: "“TESTED IN PRODUCTION • BUILT FOR SCALE”", tag: "—SYSTEM NOTE" },
    ],
  },
  {
    theme: "yellow" as const,
    angle: -2.6,
    direction: "left" as const,
    speedSeconds: 34,
    zIndex: 2,
    quotes: [
      { text: "“EARNS ITS PLACE ON THE WALL”", tag: "—WEEKLY PRESS" },
      { text: "“BUILT FOR THE BLOCK, MADE FOR THE RECORD”", tag: "—THE REVIEW" },
      { text: "“STANDBY FOR OFFICIAL CASE STUDY LAUNCHES”", tag: "—STATUS: UPDATING" },
      { text: "“REAL-WORLD CLIENT WORK & PROVEN ENGINEERING”", tag: "—DEV LOG" },
    ],
  },
];

export default function TapeRibbons() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeSpeed, setActiveSpeed] = useState<"normal" | "slow" | "fast">("normal");

  const speedMultiplier = activeSpeed === "slow" ? 1.75 : activeSpeed === "fast" ? 0.55 : 1;

  return (
    <div className="tape-showcase" aria-label="Animated caution and quote tape ribbons">
      {/* Tape Ambient Glow Backdrop */}
      <div className="tape-showcase__ambient-glow" aria-hidden="true" />

      {/* Ribbon Layers Container */}
      <div className="tape-showcase__stage">
        {tapeItems.map((tape, index) => {
          const duration = tape.speedSeconds * speedMultiplier;
          // Repeat phrases to guarantee seamless infinite wrap
          const repeatedPhrases = [...tape.quotes, ...tape.quotes, ...tape.quotes, ...tape.quotes];

          return (
            <div
              key={index}
              className={`tape-strip tape-strip--${tape.theme} tape-strip--layer-${index + 1}`}
              style={{
                "--tape-angle": `${tape.angle}deg`,
                "--tape-z": tape.zIndex,
                zIndex: tape.zIndex,
              } as React.CSSProperties}
            >
              {/* Glossy specular highlight layer for realistic tape plastic texture */}
              <div className="tape-strip__sheen" aria-hidden="true" />
              
              {/* Top and Bottom adhesive drop edges */}
              <div className="tape-strip__edge-line tape-strip__edge-line--top" aria-hidden="true" />
              <div className="tape-strip__edge-line tape-strip__edge-line--bottom" aria-hidden="true" />

              {/* Infinite scrolling marquee track */}
              <div
                className={`tape-strip__track tape-strip__track--${tape.direction}${
                  isPaused ? " is-paused" : ""
                }`}
                style={{
                  animationDuration: `${duration}s`,
                }}
              >
                {repeatedPhrases.map((phrase, pIdx) => (
                  <span className="tape-strip__item" key={pIdx}>
                    <span className="tape-strip__quote">{phrase.text}</span>
                    <span className="tape-strip__tag">{phrase.tag}</span>
                    <span className="tape-strip__dot" aria-hidden="true">•</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Controls Bar */}
      <div className="tape-controls">
        <div className="tape-controls__status">
          <span className="tape-controls__pulse" />
          <span className="tape-controls__text">TAPE FEED: LIVE MARQUEE</span>
        </div>

        <div className="tape-controls__actions">
          <button
            type="button"
            className={`tape-controls__btn ${isPaused ? "is-active" : ""}`}
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? "Resume Tapes Animation" : "Pause Tapes Animation"}
          >
            {isPaused ? "▶ Resume" : "⏸ Pause"}
          </button>

          <div className="tape-controls__speed-group">
            <span className="tape-controls__speed-label">Speed:</span>
            {(["slow", "normal", "fast"] as const).map((spd) => (
              <button
                key={spd}
                type="button"
                className={`tape-controls__speed-btn ${activeSpeed === spd ? "is-active" : ""}`}
                onClick={() => setActiveSpeed(spd)}
              >
                {spd.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
