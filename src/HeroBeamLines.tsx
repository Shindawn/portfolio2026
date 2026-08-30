export default function HeroBeamLines() {
  return (
    <div className="hero-beams" aria-hidden="true">
      <svg
        className="hero-beams__svg"
        viewBox="0 0 1440 580"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-beam-grad-left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-beam-color)" stopOpacity="0.15" />
            <stop offset="45%" stopColor="var(--hero-beam-color)" stopOpacity="1" />
            <stop offset="75%" stopColor="var(--hero-beam-color)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--hero-beam-color)" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="hero-beam-grad-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-beam-color)" stopOpacity="0.15" />
            <stop offset="45%" stopColor="var(--hero-beam-color)" stopOpacity="1" />
            <stop offset="75%" stopColor="var(--hero-beam-color)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--hero-beam-color)" stopOpacity="0" />
          </linearGradient>

          <filter id="hero-beam-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static Base Guide Lines ending just before the carousel */}
        <path
          d="M 60,0 C 260,180 280,380 280,580"
          className="hero-beams__base-path"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M 1380,0 C 1180,180 1160,380 1160,580"
          className="hero-beams__base-path"
          stroke="currentColor"
          strokeWidth="1.2"
        />

        {/* Animated Moving Light Beams ending just before the carousel */}
        <path
          d="M 60,0 C 260,180 280,380 280,580"
          className="hero-beams__beam-path hero-beams__beam-path--left"
          stroke="url(#hero-beam-grad-left)"
          strokeWidth="2.5"
          filter="url(#hero-beam-glow)"
        />
        <path
          d="M 1380,0 C 1180,180 1160,380 1160,580"
          className="hero-beams__beam-path hero-beams__beam-path--right"
          stroke="url(#hero-beam-grad-right)"
          strokeWidth="2.5"
          filter="url(#hero-beam-glow)"
        />
      </svg>
    </div>
  );
}
