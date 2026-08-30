import { useEffect, useState, type MouseEvent } from "react";

function getInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const current = document.documentElement.dataset.theme;
  if (current === "dark" || current === "light") return current;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    if (typeof window !== "undefined" && "startViewTransition" in document) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as unknown as {
        startViewTransition: (cb: () => void) => { ready: Promise<void> }
      }).startViewTransition(() => {
        document.documentElement.dataset.theme = nextTheme;
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 400,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      if (typeof window !== "undefined") {
        document.documentElement.dataset.theme = nextTheme;
      }
      setTheme(nextTheme);
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? "theme-toggle--dark" : "theme-toggle--light"}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      <svg
        className="theme-toggle__icon"
        viewBox="0 0 24 24"
        width="17"
        height="17"
        aria-hidden="true"
      >
        <mask id="theme-toggle-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle
            className="theme-toggle__mask-cutout"
            cx={isDark ? "19" : "28"}
            cy={isDark ? "5" : "0"}
            r="8"
            fill="black"
          />
        </mask>
        <circle
          className="theme-toggle__sun-body"
          cx="12"
          cy="12"
          r={isDark ? "8.5" : "5"}
          fill="currentColor"
          mask="url(#theme-toggle-mask)"
        />
        <g className="theme-toggle__sun-rays" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <line x1="12" y1="1.5" x2="12" y2="4.2" />
          <line x1="12" y1="19.8" x2="12" y2="22.5" />
          <line x1="4.2" y1="4.2" x2="6.1" y2="6.1" />
          <line x1="17.9" y1="17.9" x2="19.8" y2="19.8" />
          <line x1="1.5" y1="12" x2="4.2" y2="12" />
          <line x1="19.8" y1="12" x2="22.5" y2="12" />
          <line x1="4.2" y1="19.8" x2="6.1" y2="17.9" />
          <line x1="17.9" y1="6.1" x2="19.8" y2="4.2" />
        </g>
      </svg>
    </button>
  );
}
