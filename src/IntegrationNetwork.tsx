import { useState, type ReactNode } from "react";
import "./IntegrationNetwork.css";

export type NetworkCategoryKey = "dev" | "n8n" | "wordpress" | "va";

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

interface NetworkCategory {
  id: NetworkCategoryKey;
  label: string;
  shortLabel: string;
  tagline: string;
  hubName: string;
  hubTooltip: string;
  hubColor: string;
  hubBgHover: string;
  hubIcon: ReactNode;
  nodes: IntegrationNode[];
}

// 8 standard node coordinate slots for balanced geometry (900x460 canvas, center: 450, 230)
// Slot 0: Top-Left (130, 110)
// Slot 1: Mid-Left (230, 230)
// Slot 2: Bot-Left (140, 350)
// Slot 3: Bot-Center-Left (360, 390)
// Slot 4: Bot-Center-Right (540, 390)
// Slot 5: Bot-Right (760, 350)
// Slot 6: Mid-Right (670, 230)
// Slot 7: Top-Right (770, 110)

const networkCategories: Record<NetworkCategoryKey, NetworkCategory> = {
  dev: {
    id: "dev",
    label: "Software Dev",
    shortLabel: "Dev",
    tagline: "Software Development Connected Tools & Workflow",
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
        id: "notion",
        name: "Notion",
        category: "Notes & Docs",
        x: 130,
        y: 110,
        path: "M 450 230 C 310 230, 230 110, 130 110",
        speed: 5.5,
        delay: 0,
        status: "Docs, notes & project specs",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.43-.84c1.12-.093 1.214-.56 1.4-.933L20.9 1.41c.093-.186.28-.28.56-.28.467 0 .653.28.653.746v16.7c0 .84-.373 1.306-1.306 1.4l-14.55 1.026c-.84.093-1.306-.28-1.773-.84l-2.053-2.613c-.28-.373-.373-.653-.373-.933V4.954c0-.653.467-.933.933-.933.28 0 .56.093.84.28l-.384-.093zm1.68 2.053v11.756c0 .467.28.653.653.653l12.41-.84c.373-.093.56-.373.56-.746V5.421c0-.467-.28-.653-.653-.653L6.792 5.608c-.373.093-.653.373-.653.653zm2.52 1.306h2.893l4.666 7.466V7.567h2.333v9.052h-2.706L9.046 9.06v7.56h-2.387V7.567z" />
          </svg>
        ),
      },
      {
        id: "google-cloud",
        name: "Google Cloud",
        category: "Cloud & Hosting",
        x: 230,
        y: 230,
        path: "M 450 230 L 230 230",
        speed: 4.8,
        delay: 1.2,
        status: "Cloud hosting & serverless backends",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
        ),
      },
      {
        id: "slack-dev",
        name: "Slack",
        category: "Collaboration",
        x: 140,
        y: 350,
        path: "M 450 230 C 310 230, 240 350, 140 350",
        speed: 6.2,
        delay: 2.1,
        status: "Team chat, standups & build alerts",
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
        status: "Git repositories & CI/CD pipelines",
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
        status: "Design systems & component mockups",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6 0a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3zm0-6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3zm6-3h3a3 3 0 1 1 0 6h-3V3zm-6 15a3 3 0 0 1 3-3h3v3a3 3 0 1 1-6 0z" />
          </svg>
        ),
      },
      {
        id: "openai-dev",
        name: "AI & LLMs",
        category: "AI Tooling",
        x: 760,
        y: 350,
        path: "M 450 230 C 590 230, 660 350, 760 350",
        speed: 5.8,
        delay: 2.0,
        status: "Generative AI coding & prompt workflows",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.771-4.209 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.746-7.07zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.674 8.105v-5.659a.79.79 0 0 0-.409-.686zm2.01-3.023l-.141-.085-4.779-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
          </svg>
        ),
      },
      {
        id: "apis",
        name: "REST & GraphQL",
        category: "Backend & Data",
        x: 670,
        y: 230,
        path: "M 450 230 L 670 230",
        speed: 4.6,
        delay: 2.8,
        status: "API endpoints & structured payload routing",
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
        id: "react",
        name: "React & Next.js",
        category: "Frontend",
        x: 770,
        y: 110,
        path: "M 450 230 C 590 230, 670 110, 770 110",
        speed: 6.0,
        delay: 1.6,
        status: "Modern interactive web applications",
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
    ],
  },

  n8n: {
    id: "n8n",
    label: "n8n Automation",
    shortLabel: "n8n",
    tagline: "n8n AI & Automated Workflow Ecosystem",
    hubName: "n8n Core",
    hubTooltip: "n8n / Self-Hosted & Cloud Workflow Orchestration",
    hubColor: "#ea4b71",
    hubBgHover: "rgba(234, 75, 113, 0.15)",
    hubIcon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10z" style={{ display: "none" }} />
        {/* Crisp geometric n8n node flow icon */}
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="12" r="3" fill="currentColor" />
          <circle cx="12" cy="6" r="3" fill="currentColor" />
          <circle cx="12" cy="18" r="3" fill="currentColor" />
          <circle cx="19" cy="12" r="3" fill="currentColor" />
          <path d="M8 12h8" />
          <path d="M5 12l7-6" />
          <path d="M5 12l7 6" />
          <path d="M12 6l7 6" />
          <path d="M12 18l7-6" />
        </g>
      </svg>
    ),
    nodes: [
      {
        id: "webhooks",
        name: "Webhooks & HTTP",
        category: "Triggers & APIs",
        x: 130,
        y: 110,
        path: "M 450 230 C 310 230, 230 110, 130 110",
        speed: 5.2,
        delay: 0,
        status: "Real-time incoming triggers & REST calls",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <path d="M2 8c0-2.2 1.8-4 4-4" />
          </svg>
        ),
      },
      {
        id: "airtable",
        name: "Airtable",
        category: "Database & CRM",
        x: 230,
        y: 230,
        path: "M 450 230 L 230 230",
        speed: 4.8,
        delay: 1.1,
        status: "Relational records, CRM syncing & base updates",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M11.667 1.63L2.247 6.002a.75.75 0 000 1.348l9.42 4.372a.75.75 0 00.632 0l9.42-4.372a.75.75 0 000-1.348L12.3 1.63a.75.75 0 00-.633 0zm-.917 11.23L1.5 8.525V17a.75.75 0 00.434.68l8.5 4a.75.75 0 00.316.07V12.86zm2.5 0v8.89a.75.75 0 00.316-.07l8.5-4A.75.75 0 0022.5 17V8.525l-9.25 4.335z" />
          </svg>
        ),
      },
      {
        id: "telegram",
        name: "Telegram & Discord",
        category: "Bot Notifications",
        x: 140,
        y: 350,
        path: "M 450 230 C 310 230, 240 350, 140 350",
        speed: 6.0,
        delay: 2.2,
        status: "Interactive bots, alerts & auto-responders",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
          </svg>
        ),
      },
      {
        id: "postgres",
        name: "PostgreSQL",
        category: "Data Store",
        x: 360,
        y: 390,
        path: "M 450 230 C 410 310, 380 350, 360 390",
        speed: 5.1,
        delay: 3.1,
        status: "Raw relational storage, caching & SQL ETL",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        ),
      },
      {
        id: "stripe-n8n",
        name: "Stripe Billing",
        category: "E-Commerce Events",
        x: 540,
        y: 390,
        path: "M 450 230 C 490 310, 520 350, 540 390",
        speed: 5.7,
        delay: 0.9,
        status: "Subscription events, webhooks & invoicing",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.603.5 7.08.5 3.197 3.538 3.197 8.358c0 4.975 4.316 6.376 7.747 7.746 2.378.951 3.298 1.603 3.298 2.656 0 .979-.877 1.545-2.28 1.545-2.224 0-5.187-.992-7.247-2.19l-.919 5.568C5.772 24.6 8.91 25.1 11.83 25.1c5.845 0 9.773-2.909 9.773-7.917 0-4.66-3.69-6.309-7.627-8.033z" />
          </svg>
        ),
      },
      {
        id: "slack-n8n",
        name: "Slack Ops",
        category: "Team Alerts",
        x: 760,
        y: 350,
        path: "M 450 230 C 590 230, 660 350, 760 350",
        speed: 5.9,
        delay: 1.8,
        status: "Incident alerts, approvals & channel broadcasting",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
          </svg>
        ),
      },
      {
        id: "sheets-n8n",
        name: "Google Sheets",
        category: "Cloud Sheets",
        x: 670,
        y: 230,
        path: "M 450 230 L 670 230",
        speed: 4.7,
        delay: 2.7,
        status: "Two-way sheet sync, batch append & reports",
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
        id: "openai-n8n",
        name: "OpenAI Agents",
        category: "Autonomous AI",
        x: 770,
        y: 110,
        path: "M 450 230 C 590 230, 670 110, 770 110",
        speed: 6.1,
        delay: 1.5,
        status: "LangChain, RAG embeddings & AI decision chains",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.771-4.209 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.746-7.07zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.674 8.105v-5.659a.79.79 0 0 0-.409-.686zm2.01-3.023l-.141-.085-4.779-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
          </svg>
        ),
      },
    ],
  },

  wordpress: {
    id: "wordpress",
    label: "WordPress",
    shortLabel: "WordPress",
    tagline: "WordPress & CMS Connected Ecosystem",
    hubName: "WordPress Core",
    hubTooltip: "WordPress / Content Management & Architecture",
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
        category: "E-Commerce",
        x: 130,
        y: 110,
        path: "M 450 230 C 310 230, 230 110, 130 110",
        speed: 5.4,
        delay: 0,
        status: "Store inventory, cart & checkout funnels",
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
        category: "Page Builders",
        x: 230,
        y: 230,
        path: "M 450 230 L 230 230",
        speed: 4.9,
        delay: 1.0,
        status: "FSE, Gutenberg blocks & custom theme builder",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-3.5 14.5h-2v-9h2zm8.5 0h-6.5v-2H17zm0-3.5h-6.5v-2H17zm0-3.5h-6.5v-2H17z" />
          </svg>
        ),
      },
      {
        id: "acf",
        name: "ACF Pro & CPTs",
        category: "Custom Meta & Fields",
        x: 140,
        y: 350,
        path: "M 450 230 C 310 230, 240 350, 140 350",
        speed: 6.3,
        delay: 2.3,
        status: "Structured custom post types & flexible layouts",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
          </svg>
        ),
      },
      {
        id: "php-mysql",
        name: "PHP & MySQL",
        category: "Backend Engine",
        x: 360,
        y: 390,
        path: "M 450 230 C 410 310, 380 350, 360 390",
        speed: 5.2,
        delay: 3.0,
        status: "High-performance server stack & queries",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="10" y1="20" x2="14" y2="4" />
          </svg>
        ),
      },
      {
        id: "rankmath",
        name: "SEO & Schema",
        category: "Search Optimization",
        x: 540,
        y: 390,
        path: "M 450 230 C 490 310, 520 350, 540 390",
        speed: 5.5,
        delay: 0.7,
        status: "Technical SEO, rich snippets & meta tags",
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
        id: "cloudflare",
        name: "Cloudflare & CDN",
        category: "Speed & Security",
        x: 760,
        y: 350,
        path: "M 450 230 C 590 230, 660 350, 760 350",
        speed: 5.8,
        delay: 1.9,
        status: "Edge caching, DNS, WAF & SSL encryption",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
        ),
      },
      {
        id: "stripe-wp",
        name: "Stripe & PayPal",
        category: "Payment Gateways",
        x: 670,
        y: 230,
        path: "M 450 230 L 670 230",
        speed: 4.8,
        delay: 2.6,
        status: "PCI-compliant merchant payments & recurring plans",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        ),
      },
      {
        id: "zapier-wp",
        name: "Zapier & Webhooks",
        category: "Lead Sync & CRM",
        x: 770,
        y: 110,
        path: "M 450 230 C 590 230, 670 110, 770 110",
        speed: 6.2,
        delay: 1.4,
        status: "Form submission forwarding & CRM integration",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        ),
      },
    ],
  },

  va: {
    id: "va",
    label: "Virtual Assistant",
    shortLabel: "VA",
    tagline: "Virtual Assistance & Administrative Operations",
    hubName: "Operations Hub",
    hubTooltip: "VA Operations / Task Management & Executive Support",
    hubColor: "#8b5cf6",
    hubBgHover: "rgba(139, 92, 246, 0.15)",
    hubIcon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <polyline points="16 11 18 13 22 9" />
      </svg>
    ),
    nodes: [
      {
        id: "notion-va",
        name: "Notion & SOPs",
        category: "Wiki & Documentation",
        x: 130,
        y: 110,
        path: "M 450 230 C 310 230, 230 110, 130 110",
        speed: 5.3,
        delay: 0,
        status: "SOP documentation, wiki hubs & client briefing",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.43-.84c1.12-.093 1.214-.56 1.4-.933L20.9 1.41c.093-.186.28-.28.56-.28.467 0 .653.28.653.746v16.7c0 .84-.373 1.306-1.306 1.4l-14.55 1.026c-.84.093-1.306-.28-1.773-.84l-2.053-2.613c-.28-.373-.373-.653-.373-.933V4.954c0-.653.467-.933.933-.933.28 0 .56.093.84.28l-.384-.093zm1.68 2.053v11.756c0 .467.28.653.653.653l12.41-.84c.373-.093.56-.373.56-.746V5.421c0-.467-.28-.653-.653-.653L6.792 5.608c-.373.093-.653.373-.653.653zm2.52 1.306h2.893l4.666 7.466V7.567h2.333v9.052h-2.706L9.046 9.06v7.56h-2.387V7.567z" />
          </svg>
        ),
      },
      {
        id: "workspace-va",
        name: "Google Workspace",
        category: "Docs, Sheets & Drive",
        x: 230,
        y: 230,
        path: "M 450 230 L 230 230",
        speed: 4.7,
        delay: 1.2,
        status: "Spreadsheets, executive slide decks & Drive storage",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
        ),
      },
      {
        id: "canva-va",
        name: "Canva & Graphics",
        category: "Visual Content",
        x: 140,
        y: 350,
        path: "M 450 230 C 310 230, 240 350, 140 350",
        speed: 6.1,
        delay: 2.1,
        status: "Social banners, marketing collateral & decks",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        ),
      },
      {
        id: "trello-va",
        name: "Trello & ClickUp",
        category: "Task Management",
        x: 360,
        y: 390,
        path: "M 450 230 C 410 310, 380 350, 360 390",
        speed: 5.0,
        delay: 3.2,
        status: "Kanban task boards, milestones & deadline tracking",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <rect x="7" y="7" width="3" height="9" rx="1" />
            <rect x="14" y="7" width="3" height="5" rx="1" />
          </svg>
        ),
      },
      {
        id: "calendly-va",
        name: "Calendly",
        category: "Scheduling & Booking",
        x: 540,
        y: 390,
        path: "M 450 230 C 490 310, 520 350, 540 390",
        speed: 5.6,
        delay: 0.8,
        status: "Calendar appointments, reminders & time zones",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <circle cx="12" cy="15" r="2" />
          </svg>
        ),
      },
      {
        id: "mailchimp-va",
        name: "Email & Outreach",
        category: "Campaigns & Inboxes",
        x: 760,
        y: 350,
        path: "M 450 230 C 590 230, 660 350, 760 350",
        speed: 5.8,
        delay: 2.0,
        status: "Inbox triage, customer support & newsletters",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        ),
      },
      {
        id: "zapier-va",
        name: "Zapier & Make",
        category: "Productivity Flows",
        x: 670,
        y: 230,
        path: "M 450 230 L 670 230",
        speed: 4.6,
        delay: 2.8,
        status: "Automating routine data entry & cross-app sync",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        ),
      },
      {
        id: "chatgpt-va",
        name: "ChatGPT & AI Research",
        category: "Executive AI Support",
        x: 770,
        y: 110,
        path: "M 450 230 C 590 230, 670 110, 770 110",
        speed: 6.0,
        delay: 1.6,
        status: "Copywriting, market research & summaries",
        icon: (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.771-4.209 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.746-7.07zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.674 8.105v-5.659a.79.79 0 0 0-.409-.686zm2.01-3.023l-.141-.085-4.779-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
          </svg>
        ),
      },
    ],
  },
};

const categoryKeys: NetworkCategoryKey[] = ["dev", "n8n", "wordpress", "va"];

export default function IntegrationNetwork() {
  const [activeCategory, setActiveCategory] = useState<NetworkCategoryKey>("dev");
  const [hoveredNode, setHoveredNode] = useState<IntegrationNode | null>(null);

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
                title="Previous: <"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                type="button"
                className="integration-network__stepper-current"
                onClick={handleNext}
                title="Click to cycle next"
              >
                <span className="integration-network__tab-dot" />
                <span className="integration-network__stepper-label">{currentCategory.label}</span>
                <span className="integration-network__stepper-index">{currentIndex + 1}/{categoryKeys.length}</span>
              </button>

              <button
                type="button"
                className="integration-network__stepper-arrow"
                onClick={handleNext}
                aria-label="Next ecosystem category"
                title="Next: >"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="integration-network__canvas" key={activeCategory}>
            <svg
              className="integration-network__svg"
              viewBox="0 0 900 460"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {/* Concentric Expanding Radar Waves */}
              <circle cx="450" cy="230" r="140" className="network-orbit-wave network-orbit-wave--1" />
              <circle cx="450" cy="230" r="140" className="network-orbit-wave network-orbit-wave--2" />
              <circle cx="450" cy="230" r="140" className="network-orbit-wave network-orbit-wave--3" />

              {/* Inner Orbit Circle around Hub */}
              <circle cx="450" cy="230" r="58" className="network-orbit network-orbit--inner" />

              {/* Connector Bezier Lines and Single Floating Photons */}
              {currentCategory.nodes.map((node) => {
                const isHovered = hoveredNode?.id === node.id;
                return (
                  <g key={node.id} className={`network-connector ${isHovered ? "is-active" : ""}`}>
                    {/* Base Static Connector Path */}
                    <path d={node.path} className="network-path-base" />

                    {/* Single Floating Light Particle */}
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
            <div
              className="network-hub"
              title={currentCategory.hubTooltip}
              style={{
                "--hub-color": currentCategory.hubColor,
              } as React.CSSProperties}
            >
              <div className="network-hub__pulse" />
              <div
                className="network-hub__core"
                style={{
                  color: currentCategory.hubColor,
                }}
              >
                {currentCategory.hubIcon}
              </div>
            </div>

            {/* Satellite Node Badges Positioned Absolutely (Percentages based on 900x460 canvas) */}
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

