import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brands, Expertise, Faq, Footer, Hero, LatestWork, SneakPeek } from "./Sections";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const appRef = useRef<HTMLDivElement>(null);

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
        { xPercent: -34, yPercent: -12, ease: "none" },
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

      gsap.from(".footer__wordmark span", {
        scrollTrigger: { trigger: ".footer__wordmark", start: "top 92%" },
        yPercent: 100, opacity: 0, stagger: 0.08, duration: 1, ease: "power4.out",
      });
    }, appRef);

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return <div ref={appRef}><Hero /><SneakPeek /><Expertise /><LatestWork /><Brands /><Faq /><Footer /></div>;
}
