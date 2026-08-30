import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurvedBanner from "./CurvedBanner";
import Hero3DCarousel from "./Hero3DCarousel";
import { Brands, Expertise, Faq, Footer, Hero, LatestWork } from "./Sections";
import IntegrationNetwork from "./IntegrationNetwork";
import Preloader from "./Preloader";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let audioContext: AudioContext | null = null;

    const playKeyClick = () => {
      audioContext ??= new AudioContext();
      if (audioContext.state === "suspended") void audioContext.resume();

      const now = audioContext.currentTime;
      const output = audioContext.createGain();
      const pitchVariation = 0.94 + Math.random() * 0.12;
      output.gain.setValueAtTime(0.065, now);
      output.gain.exponentialRampToValueAtTime(0.001, now + 0.085);
      output.connect(audioContext.destination);

      const switchTone = audioContext.createOscillator();
      switchTone.type = "sine";
      switchTone.frequency.setValueAtTime(118 * pitchVariation, now);
      switchTone.frequency.exponentialRampToValueAtTime(54 * pitchVariation, now + 0.055);
      switchTone.connect(output);
      switchTone.start(now);
      switchTone.stop(now + 0.075);

      const noiseLength = Math.ceil(audioContext.sampleRate * 0.045);
      const noiseBuffer = audioContext.createBuffer(1, noiseLength, audioContext.sampleRate);
      const noise = noiseBuffer.getChannelData(0);
      for (let index = 0; index < noise.length; index += 1) {
        noise[index] = (Math.random() * 2 - 1) * (1 - index / noise.length);
      }
      const noiseSource = audioContext.createBufferSource();
      const noiseFilter = audioContext.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.value = 1150 * pitchVariation;
      noiseFilter.Q.value = 1.4;
      noiseSource.buffer = noiseBuffer;
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(output);
      noiseSource.start(now);

      const clickTone = audioContext.createOscillator();
      const clickGain = audioContext.createGain();
      clickTone.type = "square";
      clickTone.frequency.value = 2800 * pitchVariation;
      clickGain.gain.setValueAtTime(0.012, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
      clickTone.connect(clickGain);
      clickGain.connect(audioContext.destination);
      clickTone.start(now);
      clickTone.stop(now + 0.014);
    };

    const isSoundButton = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest("button, a.button"));

    const onPointerDown = (event: PointerEvent) => {
      if (event.button === 0 && isSoundButton(event.target)) playKeyClick();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.repeat && (event.key === "Enter" || event.key === " ") && isSoundButton(event.target)) playKeyClick();
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
      if (audioContext) void audioContext.close();
    };
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hoverCleanups: Array<() => void> = [];
    const context = gsap.context(() => {
      gsap.from(".hero-title-wrap", {
        yPercent: 65, opacity: 0, duration: 1.15, ease: "power4.out",
      });
      gsap.from(".hero-details > *", {
        y: 28, opacity: 0, duration: 0.85, stagger: 0.12, delay: 0.45, ease: "power3.out",
      });

      const peek = gsap.timeline({
        scrollTrigger: {
          trigger: ".sneak-peek",
          start: "top top",
          end: "+=125%",
          scrub: 1,
          pin: ".sneak-peek__inner",
          anticipatePin: 1,
        },
      });
      peek.fromTo(".project-shelf",
        { xPercent: 34, yPercent: 18 },
        { xPercent: 0, yPercent: 0, ease: "none" },
      );
      peek.from(".shelf-book", {
        xPercent: 45, opacity: 0, stagger: 0.06, ease: "power2.out",
      }, 0);

      const shelfBooks = gsap.utils.toArray<HTMLElement>(".shelf-book");
      shelfBooks.forEach((book) => {
        const lift = gsap.quickTo(book, "y", { duration: 0.38, ease: "power3.out" });
        const scale = gsap.quickTo(book, "scale", { duration: 0.38, ease: "power3.out" });
        const onEnter = () => { lift(-24); scale(1.035); };
        const onLeave = () => { lift(0); scale(1); };
        book.addEventListener("pointerenter", onEnter);
        book.addEventListener("pointerleave", onLeave);
        hoverCleanups.push(() => {
          book.removeEventListener("pointerenter", onEnter);
          book.removeEventListener("pointerleave", onLeave);
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-header").forEach((element) => {
        gsap.from(element.children, {
          scrollTrigger: { trigger: element, start: "top 82%" },
          y: 42, opacity: 0, filter: "blur(10px)", duration: 0.9, stagger: 0.1, ease: "power3.out",
        });
      });

      const reveals = [
        [".expertise__services", ".expertise__services", { y: 45, filter: "blur(12px)", duration: 1.1 }],
        [".integration-network__stage-wrap", ".integration-network", { y: 40, filter: "blur(10px)", duration: 1.0 }],
        [".project-row", ".project-list", { y: 30, stagger: 0.09, duration: 0.7 }],
        [".brand-mark", ".brand-strip", { y: 18, stagger: 0.055, duration: 0.5 }],
        [".testimonial", ".testimonials", { y: 90, stagger: 0.08, duration: 0.85 }],
        [".faq-item", ".faq__list", { y: 18, stagger: 0.06, duration: 0.55 }],
      ] as const;

      reveals.forEach(([targets, trigger, vars]) => {
        gsap.from(targets, {
          ...vars, opacity: 0, ease: "power3.out",
          scrollTrigger: { trigger, start: "top 82%" },
        });
      });
    }, appRef);

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <div ref={appRef}>
      <Preloader />
      <Hero />
      <Expertise />
      <IntegrationNetwork />
      <LatestWork />
      <Brands />
      <Faq />
      <Footer />
    </div>
  );
}
