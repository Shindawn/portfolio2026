export default function HeroBeamLines() {
  return (
    <div className="hero-beams" aria-hidden="true">
      <svg
        className="hero-beams__svg"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-beam-grad-left" x1="0" y1="0%" x2="0" y2="100%">
            <stop offset="0%" stopColor="var(--hero-beam-color)" stopOpacity="0.2" />
            <stop offset="45%" stopColor="var(--hero-beam-color)" stopOpacity="1" />
            <stop offset="70%" stopColor="var(--hero-beam-color)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--hero-beam-color)" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="hero-beam-grad-right" x1="0" y1="0%" x2="0" y2="100%">
            <stop offset="0%" stopColor="var(--hero-beam-color)" stopOpacity="0.2" />
            <stop offset="45%" stopColor="var(--hero-beam-color)" stopOpacity="1" />
            <stop offset="70%" stopColor="var(--hero-beam-color)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--hero-beam-color)" stopOpacity="0.3" />
          </linearGradient>

          <filter id="hero-beam-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Continuous unbroken guide paths running all the way straight down */}
        <path
          d="M 60,0 C 260,260 280,580 280,950"
          className="hero-beams__base-path"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M 1380,0 C 1180,260 1160,580 1160,950"
          className="hero-beams__base-path"
          stroke="currentColor"
          strokeWidth="1.2"
        />

        {/* Continuous uninterrupted light beams gliding smoothly top to bottom */}
        <path
          d="M 60,0 C 260,260 280,580 280,950"
          className="hero-beams__beam-path hero-beams__beam-path--left"
          stroke="url(#hero-beam-grad-left)"
          strokeWidth="2.5"
          filter="url(#hero-beam-glow)"
        />
        <path
          d="M 1380,0 C 1180,260 1160,580 1160,950"
          className="hero-beams__beam-path hero-beams__beam-path--right"
          stroke="url(#hero-beam-grad-right)"
          strokeWidth="2.5"
          filter="url(#hero-beam-glow)"
        />
      </svg>
    </div>
  );
}
