import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type CarouselItem = {
  id: string;
  title: string;
  category: string;
  tag: string;
  artIndex: number;
  color: string;
};

const items: CarouselItem[] = [
  {
    id: "01",
    title: "LGU Water District",
    category: "Full-Stack System",
    tag: "LGU",
    artIndex: 0,
    color: "#1a7a5a",
  },
  {
    id: "02",
    title: "HR Payroll Suite",
    category: "Enterprise Web App",
    tag: "HRIS",
    artIndex: 1,
    color: "#2563eb",
  },
  {
    id: "03",
    title: "ARIBA BATO",
    category: "Interactive AR App",
    tag: "AR/3D",
    artIndex: 2,
    color: "#d97706",
  },
  {
    id: "04",
    title: "Igel Solutions",
    category: "Corporate Platform",
    tag: "Engineering",
    artIndex: 3,
    color: "#7c3aed",
  },
  {
    id: "05",
    title: "CC Wedding",
    category: "Event Experience",
    tag: "Design",
    artIndex: 4,
    color: "#e11d48",
  },
  {
    id: "06",
    title: "Solis Architecture",
    category: "Digital Architecture",
    tag: "Platform",
    artIndex: 1,
    color: "#059669",
  },
  {
    id: "07",
    title: "Chrome Type Lab",
    category: "Experimental UI",
    tag: "Creative",
    artIndex: 2,
    color: "#0284c7",
  },
];

export default function Hero3DCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [scrollX, setScrollX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, initialScroll: 0, lastX: 0, velocity: 0, time: 0 });
  const isHoveredRef = useRef(false);
  const scrollRef = useRef(0);
  scrollRef.current = scrollX;

  const cardWidth = 240;
  const gap = 20;
  const itemTotalWidth = cardWidth + gap;
  const totalWidth = items.length * itemTotalWidth;

  // Auto-scroll loop with smooth momentum & inertia
  useEffect(() => {
    let animationId: number;
    let velocity = dragStartRef.current.velocity;

    const loop = () => {
      if (!isDragging) {
        if (Math.abs(velocity) > 0.1) {
          velocity *= 0.94; // friction
          setScrollX((prev) => prev - velocity);
        } else if (!isHoveredRef.current) {
          // Continuous subtle ambient drift
          setScrollX((prev) => prev + 0.6);
        }
      }
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      initialScroll: scrollRef.current,
      lastX: e.clientX,
      velocity: 0,
      time: performance.now(),
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - dragStartRef.current.time);
    const dx = e.clientX - dragStartRef.current.startX;
    const instantaneousVelocity = ((e.clientX - dragStartRef.current.lastX) / dt) * 16 * 1.4; // Sensitivity multiplier 4x

    dragStartRef.current.velocity = instantaneousVelocity;
    dragStartRef.current.lastX = e.clientX;
    dragStartRef.current.time = now;

    setScrollX(dragStartRef.current.initialScroll - dx);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Render 3 infinite cycles to allow endless wrap-around
  const repeatedItems = [...items, ...items, ...items];

  return (
    <section
      className="hero-3d-carousel"
      aria-label="3D Interactive Work Carousel"
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
    >
      <div
        className="hero-3d-carousel__stage"
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="hero-3d-carousel__track" ref={trackRef}>
          {repeatedItems.map((item, index) => {
            const centerOffset = ((index * itemTotalWidth - scrollX) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;
            
            // 3D Cylinder calculation (matching Framer settings: perspective 500, rotation limit 90deg)
            const normalizedX = centerOffset / 460;
            const clampedNorm = Math.max(-1.8, Math.min(1.8, normalizedX));
            
            // Rotation: cards angle inward along the cylinder arch
            const rotateY = clampedNorm * 34; // curve around 3D cylinder
            const translateZ = -Math.abs(clampedNorm) * 55; // depth fallback
            const scale = Math.max(0.82, 1 - Math.abs(clampedNorm) * 0.1);
            const opacity = Math.max(0.35, 1 - Math.abs(clampedNorm) * 0.35);

            return (
              <div
                key={`${item.id}-${index}`}
                className="hero-3d-card"
                style={{
                  transform: `translateX(${centerOffset}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: Math.round(100 - Math.abs(clampedNorm) * 20),
                }}
              >
                <div className="hero-3d-card__inner">
                  <div
                    className="hero-3d-card__image"
                    style={{
                      backgroundPosition: `calc(${item.artIndex} * 20%) center`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
