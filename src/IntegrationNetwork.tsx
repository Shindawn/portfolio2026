import { useState, type ReactNode } from "react";

interface IntegrationNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  path: string;
  speed: number;
  delay: number;
  icon: ReactNode;
  status: string;
}

const nodes: IntegrationNode[] = [
  {
    id: "notion",
    name: "Notion",
    category: "Notes & Docs",
    x: 130,
    y: 110,
    path: "M 450 230 C 310 230, 230 110, 130 110",
    speed: 5.5,
    delay: 0,
    status: "Docs, notes & planning",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.43-.84c1.12-.093 1.214-.56 1.4-.933L20.9 1.41c.093-.186.28-.28.56-.28.467 0 .653.28.653.746v16.7c0 .84-.373 1.306-1.306 1.4l-14.55 1.026c-.84.093-1.306-.28-1.773-.84l-2.053-2.613c-.28-.373-.373-.653-.373-.933V4.954c0-.653.467-.933.933-.933.28 0 .56.093.84.28l-.384-.093zm1.68 2.053v11.756c0 .467.28.653.653.653l12.41-.84c.373-.093.56-.373.56-.746V5.421c0-.467-.28-.653-.653-.653L6.792 5.608c-.373.093-.653.373-.653.653zm2.52 1.306h2.893l4.666 7.466V7.567h2.333v9.052h-2.706L9.046 9.06v7.56h-2.387V7.567z" />
      </svg>
    ),
  },
  {
    id: "google",
    name: "Google Cloud",
    category: "Cloud & Hosting",
    x: 230,
    y: 230,
    path: "M 450 230 L 230 230",
    speed: 4.8,
    delay: 1.2,
    status: "Cloud hosting & services",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
  },
  {
    id: "slack",
    name: "Slack",
    category: "Collaboration",
    x: 140,
    y: 350,
    path: "M 450 230 C 310 230, 240 350, 140 350",
    speed: 6.2,
    delay: 2.1,
    status: "Team chat & alerts",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub",
    category: "Version Control",
    x: 360,
    y: 390,
    path: "M 450 230 C 410 310, 380 350, 360 390",
    speed: 5.0,
    delay: 3.2,
    status: "Repos & CI/CD workflows",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    category: "UI/UX Design",
    x: 540,
    y: 390,
    path: "M 450 230 C 490 310, 520 350, 540 390",
    speed: 5.6,
    delay: 0.8,
    status: "Design systems & UI specs",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6 0a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3zm0-6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3zm6-3h3a3 3 0 1 1 0 6h-3V3zm-6 15a3 3 0 0 1 3-3h3v3a3 3 0 1 1-6 0z" />
      </svg>
    ),
  },
  {
    id: "react",
    name: "React & Next.js",
    category: "Frontend",
    x: 770,
    y: 110,
    path: "M 450 230 C 590 230, 670 110, 770 110",
    speed: 6.0,
    delay: 1.6,
    status: "Web applications & UI",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <circle cx="12" cy="12" r="2.2" />
        <g stroke="currentColor" strokeWidth="1.5" fill="none">
          <ellipse rx="10" ry="4.2" cx="12" cy="12" />
          <ellipse rx="10" ry="4.2" cx="12" cy="12" transform="rotate(60 12 12)" />
          <ellipse rx="10" ry="4.2" cx="12" cy="12" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
  },
  {
    id: "sheets",
    name: "REST APIs",
    category: "Backend & Data",
    x: 670,
    y: 230,
    path: "M 450 230 L 670 230",
    speed: 4.6,
    delay: 2.8,
    status: "API endpoints & data flow",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    id: "openai",
    name: "AI & LLMs",
    category: "AI Tooling",
    x: 760,
    y: 350,
    path: "M 450 230 C 590 230, 660 350, 760 350",
    speed: 5.8,
    delay: 2.0,
    status: "AI workflows & integrations",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.771-4.209 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.746-7.07zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.674 8.105v-5.659a.79.79 0 0 0-.409-.686zm2.01-3.023l-.141-.085-4.779-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
      </svg>
    ),
  },
];

export default function IntegrationNetwork() {
  const [hoveredNode, setHoveredNode] = useState<IntegrationNode | null>(null);

  return (
    <section className="integration-network" id="integrations" aria-label="Interactive Integration Network">
      <div className="integration-network__inner shell">
        <div className="integration-network__stage-wrap">
          {/* Active status tooltip pill */}
          <div className="integration-network__status-bar" aria-live="polite">
            {hoveredNode ? (
              <span className="integration-network__badge is-active">
                <span className="integration-network__badge-dot" />
                <strong>{hoveredNode.name}</strong>
                <span className="integration-network__badge-divider" aria-hidden="true">—</span>
                <span>{hoveredNode.status}</span>
              </span>
            ) : (
              <span className="integration-network__badge">
                <span className="integration-network__badge-dot" />
                <span>Software Development Connected Tools & Workflow</span>
              </span>
            )}
          </div>

          <div className="integration-network__canvas">
            <svg
              className="integration-network__svg"
              viewBox="0 0 900 460"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {/* Concentric Expanding / Reaching Radar Pulse Waves */}
              <circle cx="450" cy="230" r="140" className="network-orbit-wave network-orbit-wave--1" />
              <circle cx="450" cy="230" r="140" className="network-orbit-wave network-orbit-wave--2" />
              <circle cx="450" cy="230" r="140" className="network-orbit-wave network-orbit-wave--3" />

              {/* Inner Orbit Circle around Hub */}
              <circle cx="450" cy="230" r="58" className="network-orbit network-orbit--inner" />

              {/* Connector Bezier Lines and Single Calm Floating Particle */}
              {nodes.map((node) => {
                const isHovered = hoveredNode?.id === node.id;
                return (
                  <g key={node.id} className={`network-connector ${isHovered ? "is-active" : ""}`}>
                    {/* Base Static Connector Path */}
                    <path d={node.path} className="network-path-base" />

                    {/* Single Gentle Floating Light Particle */}
                    <circle r="2.2" className="network-particle">
                      <animateMotion
                        dur={`${node.speed}s`}
                        repeatCount="indefinite"
                        path={node.path}
                        begin={`-${node.delay}s`}
                        keyPoints="0;1"
                        keyTimes="0;1"
                      />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* Central Main Hub Badge */}
            <div className="network-hub" title="VS Code / Primary Development Environment">
              <div className="network-hub__pulse" />
              <div className="network-hub__core">
                <svg
                  className="network-hub__icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
                </svg>
              </div>
            </div>

            {/* Satellite Node Badges Positioned Absolutely (Percentages based on 900x460 canvas) */}
            {nodes.map((node) => {
              const leftPercent = (node.x / 900) * 100;
              const topPercent = (node.y / 460) * 100;
              const isHovered = hoveredNode?.id === node.id;

              return (
                <button
                  key={node.id}
                  type="button"
                  className={`network-node ${isHovered ? "network-node--hovered" : ""}`}
                  style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onFocus={() => setHoveredNode(node)}
                  onBlur={() => setHoveredNode(null)}
                  aria-label={`${node.name} (${node.category})`}
                >
                  <span className="network-node__icon">{node.icon}</span>
                  <span className="network-node__tooltip" aria-hidden={!isHovered}>
                    <strong>{node.name}</strong>
                    <small>{node.category}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
