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
          <linearGradient id="hero-beam-grad-left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-beam-color)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--hero-beam-color)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--hero-beam-color)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-beam-grad-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--hero-beam-color)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--hero-beam-color)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--hero-beam-color)" stopOpacity="0" />
          </linearGradient>
          <filter id="hero-beam-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base Static Guide Lines */}
        <path
          d="M 60,0 C 260,260 260,640 60,900"
          className="hero-beams__base-path"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M 1380,0 C 1180,260 1180,640 1380,900"
          className="hero-beams__base-path"
          stroke="currentColor"
          strokeWidth="1.2"
        />

        {/* Animated Moving Glowing White/Light Beams */}
        <path
          d="M 60,0 C 260,260 260,640 60,900"
          className="hero-beams__beam-path hero-beams__beam-path--left"
          stroke="url(#hero-beam-grad-left)"
          strokeWidth="2.8"
          filter="url(#hero-beam-glow)"
        />
        <path
          d="M 1380,0 C 1180,260 1180,640 1380,900"
          className="hero-beams__beam-path hero-beams__beam-path--right"
          stroke="url(#hero-beam-grad-right)"
          strokeWidth="2.8"
          filter="url(#hero-beam-glow)"
        />
      </svg>
    </div>
  );
}
