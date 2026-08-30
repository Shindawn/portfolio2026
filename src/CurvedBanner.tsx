import { useEffect, useRef } from "react";

export default function CurvedBanner() {
  const textPathRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    let offset = 0;
    let animationFrameId: number;

    const animate = () => {
      offset -= 0.85; // smooth gliding velocity
      if (offset <= -1400) {
        offset = 0;
      }
      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${offset}px`);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Repeating only 'Design that moves' without stars, separated by clean rhythmic spacing
  const repeatingText =
    "Design that moves       Design that moves       Design that moves       Design that moves       Design that moves       Design that moves       Design that moves       ";

  return (
    <section className="curved-marquee" aria-hidden="true">
      <div className="curved-marquee__inner">
        <svg
          className="curved-marquee__svg"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Smooth arch curve across the full width */}
            <path
              id="arch-text-path"
              d="M -400,220 C 180,20 1260,20 1840,220"
            />
          </defs>

          {/* Moving text path directly without ribbon background */}
          <text className="curved-marquee__text">
            <textPath
              ref={textPathRef}
              href="#arch-text-path"
              startOffset="0px"
              xmlSpace="preserve"
            >
              {repeatingText}
            </textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}
