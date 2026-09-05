import { useState, useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import "./IntegrationNetwork.css";

export type NetworkCategoryKey = "dev" | "n8n" | "wordpress";

interface IntegrationNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  path: string;
  extraPath?: string;
  speed: number;
  delay: number;
  icon: ReactNode;
  status: string;
}

interface NetworkCategory {
  id: NetworkCategoryKey;
  label: string;
  shortLabel: string;
  tagline: string;
  layoutType: "radial" | "pipeline" | "tiered";
  hubX: number;
  hubY: number;
  hubName: string;
  hubTooltip: string;
  hubColor: string;
  hubBgHover: string;
  hubIcon: ReactNode;
  nodes: IntegrationNode[];
}

const networkCategories: Record<NetworkCategoryKey, NetworkCategory> = {
  dev: {
    id: "dev",
    label: "Software Dev",
    shortLabel: "Dev",
    tagline: "Centralized IDE Orbit & Full-Stack Development Pipeline",
    layoutType: "radial",
    hubX: 450,
    hubY: 230,
    hubName: "VS Code",
    hubTooltip: "VS Code / Primary Development Environment",
    hubColor: "#007acc",
    hubBgHover: "rgba(0, 122, 204, 0.15)",
    hubIcon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
      </svg>
    ),
    nodes: [
      {
        id: "react",
        name: "React & Next.js",
        category: "Frontend UI",
        x: 750,
        y: 110,
        path: "M 450 230 C 580 230, 660 110, 750 110",
        speed: 5.2,
        delay: 0,
        status: "High-performance SPA & SSR web applications",
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
        id: "apis",
        name: "REST & GraphQL",
        category: "Backend & APIs",
        x: 740,
        y: 260,
        path: "M 450 230 C 580 230, 650 260, 740 260",
        speed: 4.8,
        delay: 1.2,
        status: "Structured API endpoints & data serialization",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="16" y2="17" />
          </svg>
        ),
      },
      {
        id: "postgres",
        name: "PostgreSQL & Redis",
        category: "Database & Cache",
        x: 630,
        y: 380,
        path: "M 450 230 C 530 310, 580 350, 630 380",
        speed: 5.6,
        delay: 2.4,
        status: "ACID relational schema, query tuning & cache",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        ),
      },
      {
        id: "github",
        name: "GitHub CI/CD",
        category: "Version Control",
        x: 270,
        y: 380,
        path: "M 450 230 C 370 310, 320 350, 270 380",
        speed: 5.0,
        delay: 3.1,
        status: "Automated test suites, branching & deployment",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        ),
      },
      {
        id: "google-cloud",
        name: "Google Cloud",
        category: "Cloud Hosting",
        x: 160,
        y: 260,
        path: "M 450 230 C 320 230, 250 260, 160 260",
        speed: 4.6,
        delay: 1.8,
        status: "Serverless containers, GCP compute & storage",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
        ),
      },
      {
        id: "figma",
        name: "Figma UI/UX",
        category: "Interface Design",
        x: 150,
        y: 110,
        path: "M 450 230 C 320 230, 240 110, 150 110",
        speed: 5.4,
        delay: 0.6,
        status: "Interactive prototypes & design system components",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6 0a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3zm0-6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3zm6-3h3a3 3 0 1 1 0 6h-3V3zm-6 15a3 3 0 0 1 3-3h3v3a3 3 0 1 1-6 0z" />
          </svg>
        ),
      },
    ],
  },

  n8n: {
    id: "n8n",
    label: "n8n Automation",
    shortLabel: "n8n",
    tagline: "Linear Event-Driven DAG Pipeline & Multi-Channel Orchestration",
    layoutType: "pipeline",
    hubX: 320,
    hubY: 230,
    hubName: "n8n Core",
    hubTooltip: "n8n / Central Workflow Engine & Logic Router",
    hubColor: "#ea4b71",
    hubBgHover: "rgba(234, 75, 113, 0.15)",
    hubIcon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="3" fill="currentColor" />
        <circle cx="12" cy="6" r="3" fill="currentColor" />
        <circle cx="12" cy="18" r="3" fill="currentColor" />
        <circle cx="19" cy="12" r="3" fill="currentColor" />
        <path d="M8 12h8" />
        <path d="M5 12l7-6" />
        <path d="M5 12l7 6" />
        <path d="M12 6l7 6" />
        <path d="M12 18l7-6" />
      </svg>
    ),
    nodes: [
      {
        id: "webhooks-n8n",
        name: "Webhooks & Stripe",
        category: "Input Triggers",
        x: 120,
        y: 130,
        path: "M 120 130 C 200 130, 240 230, 320 230",
        speed: 4.4,
        delay: 0,
        status: "Real-time payment events & incoming webhooks",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <path d="M2 8c0-2.2 1.8-4 4-4" />
          </svg>
        ),
      },
      {
        id: "airtable-n8n",
        name: "Airtable Forms",
        category: "Lead Ingestion",
        x: 120,
        y: 330,
        path: "M 120 330 C 200 330, 240 230, 320 230",
        speed: 4.6,
        delay: 1.1,
        status: "CRM form submissions & client intake sync",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M11.667 1.63L2.247 6.002a.75.75 0 000 1.348l9.42 4.372a.75.75 0 00.632 0l9.42-4.372a.75.75 0 000-1.348L12.3 1.63a.75.75 0 00-.633 0zm-.917 11.23L1.5 8.525V17a.75.75 0 00.434.68l8.5 4a.75.75 0 00.316.07V12.86zm2.5 0v8.89a.75.75 0 00.316-.07l8.5-4A.75.75 0 0022.5 17V8.525l-9.25 4.335z" />
          </svg>
        ),
      },
      {
        id: "openai-n8n",
        name: "OpenAI Agents & RAG",
        category: "AI Processing",
        x: 550,
        y: 140,
        path: "M 320 230 C 410 230, 460 140, 550 140",
        speed: 5.0,
        delay: 0.5,
        status: "LangChain embeddings, auto-tagging & summary generation",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.771-4.209 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.746-7.07zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.674 8.105v-5.659a.79.79 0 0 0-.409-.686zm2.01-3.023l-.141-.085-4.779-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
          </svg>
        ),
      },
      {
        id: "sheets-n8n",
        name: "Database & Sheets",
        category: "Storage Sync",
        x: 550,
        y: 320,
        path: "M 320 230 C 410 230, 460 320, 550 320",
        speed: 5.2,
        delay: 1.8,
        status: "PostgreSQL & Google Sheets live records synchronization",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
            <line x1="9" y1="3" x2="9" y2="21" />
            <line x1="15" y1="3" x2="15" y2="21" />
          </svg>
        ),
      },
      {
        id: "telegram-n8n",
        name: "Telegram & Discord",
        category: "Action Dispatch",
        x: 780,
        y: 230,
        path: "M 550 140 C 640 140, 700 230, 780 230",
        extraPath: "M 550 320 C 640 320, 700 230, 780 230",
        speed: 4.8,
        delay: 2.2,
        status: "Instant bot alerts, customer pings & channel broadcast",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
          </svg>
        ),
      },
    ],
  },

  wordpress: {
    id: "wordpress",
    label: "WordPress",
    shortLabel: "WordPress",
    tagline: "Tiered CMS Architecture & Performance Ecosystem",
    layoutType: "tiered",
    hubX: 450,
    hubY: 220,
    hubName: "WordPress Core",
    hubTooltip: "WordPress / Headless & Monolithic Architecture",
    hubColor: "#21759b",
    hubBgHover: "rgba(33, 117, 155, 0.15)",
    hubIcon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L7.84 4.887C9.09 4.316 10.5 4 12 4c.64 0 1.26.06 1.86.175L9.67 17.525l-2.27-6.2c-.37-.99-.54-1.59-.54-2.07 0-.73.44-1.15 1.07-1.15.11 0 .23.01.35.03L8.35 8c-1.34 0-2.3.93-2.3 2.19 0 .61.18 1.34.49 2.19l3.52 9.61c.62.14 1.27.21 1.94.21 1.43 0 2.77-.3 3.97-.84l-3.32-9.65 2.37-6.52c.28-.77.49-1.24.49-1.58 0-.6-.35-.95-.91-.95-.12 0-.25.01-.39.04l.07-.19c1.28 0 2.22.86 2.22 2.05 0 .58-.19 1.33-.51 2.21l-3.39 9.35 1.25 3.44c2.87-1.61 4.79-4.7 4.79-8.2 0-5.523-4.477-10-10-10zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
    nodes: [
      {
        id: "woocommerce",
        name: "WooCommerce",
        category: "Store & Checkout",
        x: 280,
        y: 85,
        path: "M 280 85 L 450 220",
        speed: 5.0,
        delay: 0,
        status: "High-conversion product checkout, cart & payment funnels",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        ),
      },
      {
        id: "elementor",
        name: "Elementor & Blocks",
        category: "Frontend Editor",
        x: 620,
        y: 85,
        path: "M 620 85 L 450 220",
        speed: 5.2,
        delay: 0.9,
        status: "Full site editing, Gutenberg block templates & custom themes",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-3.5 14.5h-2v-9h2zm8.5 0h-6.5v-2H17zm0-3.5h-6.5v-2H17zm0-3.5h-6.5v-2H17z" />
          </svg>
        ),
      },
      {
        id: "acf",
        name: "ACF Pro & CPTs",
        category: "Custom Data Engine",
        x: 170,
        y: 220,
        path: "M 170 220 L 450 220",
        speed: 4.6,
        delay: 1.8,
        status: "Relational custom fields, repeatable layouts & custom post types",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
          </svg>
        ),
      },
      {
        id: "rankmath",
        name: "SEO & Schema",
        category: "Search Visibility",
        x: 730,
        y: 220,
        path: "M 450 220 L 730 220",
        speed: 4.8,
        delay: 2.6,
        status: "OpenGraph tags, JSON-LD structured data & indexing",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        ),
      },
      {
        id: "php-cloudflare",
        name: "PHP 8 & Cloudflare",
        category: "Infrastructure & Edge",
        x: 450,
        y: 365,
        path: "M 450 220 L 450 365",
        speed: 4.5,
        delay: 1.2,
        status: "Fast server execution, MySQL caching & Edge CDN security",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
        ),
      },
    ],
  },
};

const categoryKeys: NetworkCategoryKey[] = ["dev", "n8n", "wordpress"];

export default function IntegrationNetwork() {
  const [activeCategory, setActiveCategory] = useState<NetworkCategoryKey>("dev");
  const [hoveredNode, setHoveredNode] = useState<IntegrationNode | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);

  const currentCategory = networkCategories[activeCategory];
  const currentIndex = categoryKeys.indexOf(activeCategory);

  const handleCategoryChange = (key: NetworkCategoryKey) => {
    setActiveCategory(key);
    setHoveredNode(null);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + categoryKeys.length) % categoryKeys.length;
    handleCategoryChange(categoryKeys[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % categoryKeys.length;
    handleCategoryChange(categoryKeys[nextIndex]);
  };

  // Entrance animation whenever activeCategory changes
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".network-node",
        { scale: 0.82, opacity: 0, y: 12 },
        { scale: 1, opacity: 1, y: 0, duration: 0.42, stagger: 0.045, ease: "back.out(1.6)" }
      );
      gsap.fromTo(
        ".network-hub",
        { scale: 0.78, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.8)" }
      );
      gsap.fromTo(
        ".network-path-base",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.03, ease: "power2.out" }
      );
    }, canvasRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Damped 3D Parallax & Magnetic Cursor Float
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle 3D card tilt
    gsap.to(canvasRef.current, {
      rotationY: x * 6,
      rotationX: -y * 6,
      transformPerspective: 1200,
      ease: "power2.out",
      duration: 0.45,
    });

    // Hub gentle magnetic attraction
    if (hubRef.current) {
      gsap.to(hubRef.current, {
        x: x * 12,
        y: y * 12,
        ease: "power2.out",
        duration: 0.4,
      });
    }

    // Layered node depth parallax
    gsap.to(".network-node", {
      x: (i) => x * (8 + (i % 3) * 3),
      y: (i) => y * (8 + (i % 3) * 3),
      ease: "power2.out",
      duration: 0.45,
    });
  };

  const handlePointerLeave = () => {
    if (!canvasRef.current) return;
    gsap.to(canvasRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 0.65,
    });
    if (hubRef.current) {
      gsap.to(hubRef.current, {
        x: 0,
        y: 0,
        ease: "power2.out",
        duration: 0.65,
      });
    }
    gsap.to(".network-node", {
      x: 0,
      y: 0,
      ease: "power2.out",
      duration: 0.65,
    });
  };

  const hubLeftPercent = (currentCategory.hubX / 900) * 100;
  const hubTopPercent = (currentCategory.hubY / 460) * 100;

  return (
    <section className="integration-network" id="integrations" aria-label="Interactive Integration Network">
      <div className="integration-network__inner shell">
        <div className="integration-network__stage-wrap">
          
          {/* Top Control Bar with Status on Left and Stepper on Top-Right */}
          <div className="integration-network__top-bar">
            {/* Active status tooltip pill / Live Tagline */}
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
                  <span>{currentCategory.tagline}</span>
                </span>
              )}
            </div>

            {/* Stepper Selector placed at Right Top */}
            <div className="integration-network__stepper" role="group" aria-label="Ecosystem Category Selector">
              <button
                type="button"
                className="integration-network__stepper-arrow"
                onClick={handlePrev}
                aria-label="Previous ecosystem category"
                title="Previous category"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                type="button"
                className="integration-network__stepper-current"
                onClick={handleNext}
                title="Click to switch category"
              >
                <span className="integration-network__stepper-label">{currentCategory.label}</span>
                <span className="integration-network__stepper-index">{currentIndex + 1}/{categoryKeys.length}</span>
              </button>

              <button
                type="button"
                className="integration-network__stepper-arrow"
                onClick={handleNext}
                aria-label="Next ecosystem category"
                title="Next category"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="integration-network__canvas"
            ref={canvasRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            <svg
              className="integration-network__svg"
              viewBox="0 0 900 460"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {/* Distinct Background Blueprint Guide per layout */}
              {currentCategory.layoutType === "radial" && (
                <>
                  <circle cx="450" cy="230" r="160" className="network-orbit network-orbit--mid" />
                  <circle cx="450" cy="230" r="70" className="network-orbit network-orbit--inner" />
                </>
              )}

              {currentCategory.layoutType === "pipeline" && (
                <>
                  {/* Pipeline Horizontal Rail Guides */}
                  <line x1="80" y1="130" x2="820" y2="130" className="network-pipeline-rail" />
                  <line x1="80" y1="230" x2="820" y2="230" className="network-pipeline-rail network-pipeline-rail--center" />
                  <line x1="80" y1="330" x2="820" y2="330" className="network-pipeline-rail" />
                  <circle cx="320" cy="230" r="64" className="network-orbit network-orbit--inner" />
                </>
              )}

              {currentCategory.layoutType === "tiered" && (
                <>
                  {/* Tiered Architectural Matrix / Grid */}
                  <line x1="180" y1="85" x2="720" y2="85" className="network-tier-rail" />
                  <line x1="100" y1="220" x2="800" y2="220" className="network-tier-rail" />
                  <line x1="280" y1="365" x2="620" y2="365" className="network-tier-rail" />
                  <polygon points="450,55 770,220 450,395 130,220" className="network-diamond-matrix" />
                  <circle cx="450" cy="220" r="60" className="network-orbit network-orbit--inner" />
                </>
              )}

              {/* Connector Lines & Animated Moving Photons */}
              {currentCategory.nodes.map((node) => {
                const isHovered = hoveredNode?.id === node.id;
                return (
                  <g key={node.id} className={`network-connector ${isHovered ? "is-active" : ""}`}>
                    {/* Primary Path */}
                    <path d={node.path} className="network-path-base" />
                    <circle r="2.6" className="network-particle">
                      <animateMotion
                        dur={`${node.speed}s`}
                        repeatCount="indefinite"
                        path={node.path}
                        begin={`-${node.delay}s`}
                        keyPoints="0;1"
                        keyTimes="0;1"
                      />
                    </circle>

                    {/* Secondary Extra Path (if any, like multi-inlet pipelines) */}
                    {node.extraPath && (
                      <>
                        <path d={node.extraPath} className="network-path-base" />
                        <circle r="2.6" className="network-particle">
                          <animateMotion
                            dur={`${node.speed}s`}
                            repeatCount="indefinite"
                            path={node.extraPath}
                            begin={`-${(node.delay + 1.2) % node.speed}s`}
                            keyPoints="0;1"
                            keyTimes="0;1"
                          />
                        </circle>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Dynamic Center Hub Badge */}
            <div
              className="network-hub"
              ref={hubRef}
              title={currentCategory.hubTooltip}
              style={{
                left: `${hubLeftPercent}%`,
                top: `${hubTopPercent}%`,
                "--hub-color": currentCategory.hubColor,
              } as React.CSSProperties}
            >
              <div
                className="network-hub__core"
                style={{
                  color: currentCategory.hubColor,
                }}
              >
                {currentCategory.hubIcon}
              </div>
            </div>

            {/* Satellite Node Badges Positioned Absolutely */}
            {currentCategory.nodes.map((node) => {
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
