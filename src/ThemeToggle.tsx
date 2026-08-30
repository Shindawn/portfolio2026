import { useEffect, useState } from "react";

function getInitialTheme(): "light" | "dark" {
  const current = document.documentElement.dataset.theme;
  return current === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return <button
    type="button"
    className="theme-toggle"
    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    aria-pressed={theme === "dark"}
    onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
  >
    {theme === "dark" ? <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="4.4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <line x1="12" y1="1.6" x2="12" y2="4.1" /><line x1="12" y1="19.9" x2="12" y2="22.4" />
        <line x1="1.6" y1="12" x2="4.1" y2="12" /><line x1="19.9" y1="12" x2="22.4" y2="12" />
        <line x1="4.5" y1="4.5" x2="6.3" y2="6.3" /><line x1="17.7" y1="17.7" x2="19.5" y2="19.5" />
        <line x1="4.5" y1="19.5" x2="6.3" y2="17.7" /><line x1="17.7" y1="6.3" x2="19.5" y2="4.5" />
      </g>
    </svg> : <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="currentColor" d="M20.6 15.4a8.6 8.6 0 0 1-11-11 1 1 0 0 0-1.27-1.27A10.6 10.6 0 1 0 21.87 16.7a1 1 0 0 0-1.27-1.3Z" />
    </svg>}
  </button>;
}
