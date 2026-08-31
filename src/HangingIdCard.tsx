import { useState, useRef, type PointerEvent } from "react";

export default function HangingIdCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    const container = containerRef.current;
    if (!el || !container) return;
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Smooth damped cursor-driven 3D physics tilt (subtle & refined)
    const rotX = -y * 10;
    const rotY = x * 12;
    const rotZ = x * 4;
    const posX = x * 14;
    const posY = y * 8;

    // Specular glare reflection tracking
    const glareX = (x + 0.5) * 100;
    const glareY = (y + 0.5) * 100;

    el.style.setProperty("--rot-x", `${rotX}deg`);
    el.style.setProperty("--rot-y", `${rotY}deg`);
    el.style.setProperty("--rot-z", `${rotZ}deg`);
    el.style.setProperty("--pos-x", `${posX}px`);
    el.style.setProperty("--pos-y", `${posY}px`);
    el.style.setProperty("--glare-x", `${glareX}%`);
    el.style.setProperty("--glare-y", `${glareY}%`);
    el.style.setProperty("--glare-opacity", "0.6");
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    setIsHovered(false);
    el.style.setProperty("--rot-x", "0deg");
    el.style.setProperty("--rot-y", "0deg");
    el.style.setProperty("--rot-z", "0deg");
    el.style.setProperty("--pos-x", "0px");
    el.style.setProperty("--pos-y", "0px");
    el.style.setProperty("--glare-opacity", "0");
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("lescycaadlawon.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="aurum-lanyard-stage"
      ref={containerRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      role="region"
      aria-label="Interactive 3D Hanging Developer Pass"
    >
      {/* Hanging Webbing Ribbon Strap */}
      <div className="aurum-ribbon-strap">
        <div className="aurum-ribbon-pattern">
          <span>LESCY G. CAADLAWON ✕ JR. DEV &amp; UI/UX DESIGNER ✕ PASS 2026</span>
        </div>
      </div>

      {/* Metallic Clasp & Swivel Mechanism */}
      <div className="aurum-clasp-assembly">
        <div className="aurum-clasp-metal-band" />
        <div className="aurum-clasp-swivel" />
        <div className="aurum-clasp-ring" />
      </div>

      {/* 3D Interactive Hanging ID Card */}
      <div
        className={`aurum-id-card ${isHovered ? "is-hovered" : "is-hanging"}`}
        ref={cardRef}
      >
        {/* Punch Hole Slot */}
        <div className="aurum-punch-hole">
          <div className="aurum-punch-hole__ring" />
        </div>

        {/* Dynamic Specular Lighting Glare */}
        <div className="aurum-card-glare" aria-hidden="true" />

        {/* Diagonal Wave Texture Overlay */}
        <div className="aurum-card-mesh" aria-hidden="true" />

        {/* Header Badges */}
        <div className="aurum-card-header">
          <span className="aurum-card-tag">DEV PASS</span>
          <span className="aurum-card-badge">CREATIVE TECH</span>
        </div>

        {/* Hero Identity with Circular Photo Avatar */}
        <div className="aurum-card-hero">
          <div className="aurum-card-avatar-wrap">
            <img
              src="/lescy-portrait.jpg"
              alt="Lescy G. Caadlawon"
              className="aurum-card-avatar"
            />
          </div>
          <h2 className="aurum-card-name">Lescy G. Caadlawon</h2>
          <span className="aurum-card-sub">JR. DEV &amp; UI/UX DESIGNER</span>
        </div>

        {/* Metadata Grid */}
        <div className="aurum-card-meta-grid">
          <div className="aurum-meta-cell">
            <span className="aurum-meta-label">PROGRAM</span>
            <strong className="aurum-meta-val">BSIT</strong>
          </div>
          <div className="aurum-meta-cell">
            <span className="aurum-meta-label">DEPARTMENT</span>
            <strong className="aurum-meta-val">Software &amp; Cloud</strong>
          </div>
        </div>

        {/* Email Row with Copy to Clipboard */}
        <div
          className="aurum-card-email-row"
          onClick={handleCopyEmail}
          title="Click to copy email"
          role="button"
          tabIndex={0}
        >
          <span className="aurum-meta-label">EMAIL</span>
          <div className="aurum-email-val-wrap">
            <span className="aurum-email-val">lescycaadlawon.dev@gmail.com</span>
            <svg
              className="aurum-copy-icon"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            {copied && <span className="aurum-copied-tooltip">Copied!</span>}
          </div>
        </div>

        {/* Footer Brand & Verification Chip */}
        <div className="aurum-card-footer">
          <div className="aurum-footer-logo">
            <svg
              className="aurum-heart-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <div className="aurum-footer-text">
              <strong>Mandaluyong City</strong>
              <small>PHILIPPINES</small>
            </div>
          </div>
          <div className="aurum-card-chip" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
