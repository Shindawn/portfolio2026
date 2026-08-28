import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brands, Expertise, Faq, Footer, Hero, LatestWork, SneakPeek } from "./Sections";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.from("#hero-title span", {
        yPercent: 115, opacity: 0, duration: 1.15, stagger: 0.09, ease: "power4.out",
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
        { xPercent: 28, yPercent: 25, rotation: -8 },
        { xPercent: -28, yPercent: -16, rotation: -4, ease: "none" },
      );
      peek.from(".shelf-book", {
        yPercent: 38, opacity: 0, stagger: 0.035, ease: "power2.out",
      }, 0);

      gsap.utils.toArray<HTMLElement>(".reveal-header").forEach((element) => {
        gsap.from(element.children, {
          scrollTrigger: { trigger: element, start: "top 82%" },
          y: 42, opacity: 0, filter: "blur(10px)", duration: 0.9, stagger: 0.1, ease: "power3.out",
        });
      });

      const reveals = [
        [".expertise__services", ".expertise__services", { y: 45, filter: "blur(12px)", duration: 1.1 }],
        [".project-row", ".project-list", { y: 30, stagger: 0.09, duration: 0.7 }],
        [".brand-mark", ".brand-strip", { y: 18, stagger: 0.055, duration: 0.5 }],
        [".testimonial", ".testimonials", { y: 90, stagger: 0.08, duration: 0.85 }],
        [".faq details", ".faq__list", { x: 45, stagger: 0.08, duration: 0.65 }],
      ] as const;

      reveals.forEach(([targets, trigger, vars]) => {
        gsap.from(targets, {
          ...vars, opacity: 0, ease: "power3.out",
          scrollTrigger: { trigger, start: "top 82%" },
        });
      });

      gsap.from(".footer__wordmark span", {
        scrollTrigger: { trigger: ".footer__wordmark", start: "top 92%" },
        yPercent: 100, opacity: 0, stagger: 0.08, duration: 1, ease: "power4.out",
      });
    }, appRef);

    return () => context.revert();
  }, []);

  return <div ref={appRef}><Hero /><SneakPeek /><Expertise /><LatestWork /><Brands /><Faq /><Footer /></div>;
}
