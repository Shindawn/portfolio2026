import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
};

type Props = {
  selector?: string;
  canvasClassName?: string;
};

export default function HeroTitleEffect({ selector = "h1", canvasClassName = "hero-title-canvas" }: Props = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const title = canvas?.parentElement?.querySelector<HTMLElement>(selector);
    if (!canvas || !title || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const pointer = { x: -1000, y: -1000, active: false };
    let particles: Particle[] = [];
    let frame = 0;
    let disposed = false;
    let leaveTimer = 0;
    let inkColor = "#10100f";

    const updateInkColor = () => {
      const configuredColor = getComputedStyle(canvas.parentElement ?? title)
        .getPropertyValue("--particle-ink")
        .trim();
      inkColor = configuredColor || getComputedStyle(title).color;
    };

    const buildParticles = async () => {
      await document.fonts.ready;
      if (disposed) return;

      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * ratio);
      canvas.height = Math.round(bounds.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const buffer = document.createElement("canvas");
      buffer.width = Math.round(bounds.width);
      buffer.height = Math.round(bounds.height);
      const bufferContext = buffer.getContext("2d", { willReadFrequently: true });
      if (!bufferContext) return;

      const titleStyle = getComputedStyle(title);
      updateInkColor();
      const titleBounds = title.getBoundingClientRect();
      const spans = [...title.querySelectorAll<HTMLSpanElement>("span")];
      bufferContext.fillStyle = "#10100f";
      bufferContext.textBaseline = "top";
      bufferContext.font = `${titleStyle.fontWeight} ${titleStyle.fontSize} ${titleStyle.fontFamily}`;
      if ("letterSpacing" in bufferContext) bufferContext.letterSpacing = titleStyle.letterSpacing;

      if (spans.length) {
        spans.forEach((span) => {
          const spanBounds = span.getBoundingClientRect();
          bufferContext.fillText(
            span.textContent ?? "",
            spanBounds.left - bounds.left,
            titleBounds.top - bounds.top + (spanBounds.top - titleBounds.top),
          );
        });
      } else {
        bufferContext.fillText(title.textContent ?? "", titleBounds.left - bounds.left, titleBounds.top - bounds.top);
      }

      const pixels = bufferContext.getImageData(0, 0, buffer.width, buffer.height).data;
      const gap = window.innerWidth < 700 ? 5 : 4;
      const nextParticles: Particle[] = [];
      for (let y = 0; y < buffer.height; y += gap) {
        for (let x = 0; x < buffer.width; x += gap) {
          if (pixels[(y * buffer.width + x) * 4 + 3] > 90) {
            nextParticles.push({ x, y, originX: x, originY: y, vx: 0, vy: 0, size: gap * 0.72 });
          }
        }
      }
      particles = nextParticles;
      canvas.parentElement?.classList.add("is-particle-ready");
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distanceSquared = dx * dx + dy * dy;
          const radius = Math.min(145, Math.max(90, width * 0.1));
          if (distanceSquared < radius * radius) {
            const distance = Math.sqrt(distanceSquared) || 1;
            const force = (1 - distance / radius) * 6.5;
            particle.vx += (dx / distance) * force + (Math.random() - 0.5) * 1.4;
            particle.vy += (dy / distance) * force + (Math.random() - 0.5) * 1.4;
          }
        }

        particle.vx += (particle.originX - particle.x) * 0.035;
        particle.vy += (particle.originY - particle.y) * 0.035;
        particle.vx *= 0.86;
        particle.vy *= 0.86;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const speed = Math.min(5, Math.abs(particle.vx) + Math.abs(particle.vy));
        if (speed > 0.45) {
          context.fillStyle = `rgba(0, 195, 205, ${Math.min(0.72, speed / 5)})`;
          context.fillRect(particle.x - 2.2, particle.y, particle.size, particle.size);
          context.fillStyle = `rgba(245, 58, 42, ${Math.min(0.68, speed / 5)})`;
          context.fillRect(particle.x + 2.2, particle.y, particle.size, particle.size);
        }
        context.fillStyle = inkColor;
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
      }
      frame = requestAnimationFrame(draw);
    };

    const movePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
      window.clearTimeout(leaveTimer);
      canvas.parentElement?.classList.add("is-hovering");
    };
    const leavePointer = () => {
      pointer.active = false;
      leaveTimer = window.setTimeout(() => {
        canvas.parentElement?.classList.remove("is-hovering");
      }, 650);
    };
    const resize = () => { window.clearTimeout(Number(canvas.dataset.resizeTimer)); canvas.dataset.resizeTimer = String(window.setTimeout(buildParticles, 150)); };
    const themeObserver = new MutationObserver(updateInkColor);
    themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"] });

    buildParticles().then(draw);
    canvas.addEventListener("pointermove", movePointer);
    canvas.addEventListener("pointerleave", leavePointer);
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      window.clearTimeout(leaveTimer);
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", movePointer);
      canvas.removeEventListener("pointerleave", leavePointer);
      window.removeEventListener("resize", resize);
    };
  }, [selector]);

  return <canvas ref={canvasRef} className={canvasClassName} aria-hidden="true" />;
}
