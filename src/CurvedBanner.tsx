import { useEffect, useRef } from "react";

export default function CurvedBanner() {
  const textPathRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    let offset = 0;
    let animationFrameId: number;

    const animate = () => {
      offset -= 0.85; // smooth gliding velocity
      if (offset <= -1500) {
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

  // Repeating text moving continuously inside the arched ribbon
  const repeatingText =
    "Design that moves.       Design that moves.       Design that moves.       Design that moves.       Design that moves.       Design that moves.       Design that moves.       ";

  return (
    <section className="curved-marquee" aria-hidden="true">
      <div className="curved-marquee__inner">
        <svg
          className="curved-marquee__svg"
          viewBox="0 0 1440 380"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dramatic convex arched curve matching reference image */}
            <path
              id="arch-text-path"
              d="M -250,390 C 200,50 1240,50 1690,390"
            />
          </defs>

          {/* Arched Ribbon Strip Background */}
          <path
            d="M -250,390 C 200,50 1240,50 1690,390"
            className="curved-marquee__ribbon"
            stroke="currentColor"
            strokeWidth="130"
            strokeLinecap="square"
            fill="none"
          />

          {/* Moving Text riding inside the arch ribbon */}
          <text className="curved-marquee__text" dy="4">
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
