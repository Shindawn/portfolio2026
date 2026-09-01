import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cvHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lescy G. Caadlawon - CV</title>
  <style>
    @page {
      size: letter;
      margin: 0.5in 0.6in 0.5in 0.6in;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: "Times New Roman", Times, "Liberation Serif", serif;
      font-size: 10pt;
      line-height: 1.32;
      color: #000000;
      background: #ffffff;
      -webkit-font-smoothing: antialiased;
    }

    a {
      color: #1a4fa0;
      text-decoration: underline;
      text-underline-offset: 2px;
    }

    .header {
      text-align: center;
      margin-bottom: 12px;
    }

    .name {
      font-size: 22pt;
      font-weight: 700;
      letter-spacing: 0.2px;
      color: #000000;
      margin-bottom: 2px;
    }

    .location {
      font-size: 10pt;
      color: #111111;
      margin-bottom: 2px;
    }

    .contact-row {
      font-size: 9.5pt;
      color: #000000;
    }

    .contact-row a {
      color: #1a4fa0;
      text-decoration: underline;
    }

    .section-title {
      font-size: 11.5pt;
      font-weight: 700;
      color: #000000;
      border-bottom: 1px solid #000000;
      padding-bottom: 1px;
      margin-top: 10px;
      margin-bottom: 5px;
    }

    .summary-text {
      text-align: justify;
      font-size: 9.6pt;
      line-height: 1.34;
    }

    .entry {
      margin-bottom: 7px;
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .entry-title-left {
      font-weight: 700;
      font-size: 10pt;
      color: #000000;
    }

    .entry-date-right {
      font-size: 9.5pt;
      font-weight: 400;
      color: #000000;
      white-space: nowrap;
    }

    .entry-sub-left {
      font-style: italic;
      font-size: 9.6pt;
    }

    .entry-loc-right {
      font-style: italic;
      font-size: 9.5pt;
      color: #000000;
      white-space: nowrap;
    }

    .project-sub {
      font-size: 9.6pt;
      font-style: italic;
      margin-top: 1px;
      margin-bottom: 2px;
    }

    ul.bullets {
      list-style-type: none;
      padding-left: 0;
      margin-top: 2px;
    }

    ul.bullets li {
      position: relative;
      padding-left: 14px;
      margin-bottom: 2.5px;
      font-size: 9.5pt;
      line-height: 1.3;
      text-align: justify;
    }

    ul.bullets li::before {
      content: "–";
      position: absolute;
      left: 0;
      font-weight: 400;
    }

    .skills-block, .cert-block {
      font-size: 9.5pt;
      line-height: 1.38;
    }

    .skills-block strong, .cert-block strong {
      font-weight: 700;
      color: #000000;
    }
  </style>
</head>
<body>

  <header class="header">
    <h1 class="name">Lescy G. Caadlawon</h1>
    <div class="location">Mandaluyong, Philippines</div>
    <div class="contact-row">
      +639692467870 | <a href="mailto:lescycaadlawon.dev@gmail.com">lescycaadlawon.dev@gmail.com</a> | <a href="https://lescygcaadlawon.tech" target="_blank">lescygcaadlawon.tech</a> | <a href="https://linkedin.com/in/lescycaadlawon" target="_blank">linkedin.com/in/lescycaadlawon</a>
    </div>
  </header>

  <section>
    <h2 class="section-title">Professional Summary</h2>
    <p class="summary-text">
      A degree holder of Information Technology with hands-on experience building and deploying backend-driven web applications, REST APIs, and database driven systems using Laravel, Node.js, SQL and cloud infrastructure. Proven track record shipping full-stack systems end-to-end, from schema design and API architecture to cloud deployment and performance optimization. Strong foundation in authentication, role-based access control, and real-time integrity.
    </p>
  </section>

  <section>
    <h2 class="section-title">Professional Experience</h2>
    
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title-left">Isla Tech IT Solutions</span>
        <span class="entry-date-right">June 2026 – August 2026</span>
      </div>
      <div class="entry-header">
        <span class="entry-sub-left">Full-Stack Developer</span>
        <span class="entry-loc-right">Remote, Philippines</span>
      </div>
      <div class="project-sub">
        Project: LGU Water District Management System | <a href="https://lescygcaadlawon.tech" target="_blank">Live URL</a>
      </div>
      <ul class="bullets">
        <li>Built and deployed a full-stack LGU Water District Management System within a tight 3-month timeframe, that streamlined customer records, billing, payments, meter readings, service operations, and real-time reporting.</li>
        <li>Engineered secure role-based access, employee-only Google OAuth, REST APIs, PostgreSQL workflows, audit logging, and cloud storage using Next.js, TypeScript, Prisma, Neon, and Cloudflare R2.</li>
      </ul>
    </div>

    <div class="entry">
      <div class="entry-header">
        <span class="entry-title-left">DPWH Virac</span>
        <span class="entry-date-right">Feb 2026 – May 2026</span>
      </div>
      <div class="entry-header">
        <span class="entry-sub-left">IT Support &amp; Maintenance Intern</span>
        <span class="entry-loc-right">Catanduanes, Philippines</span>
      </div>
      <ul class="bullets">
        <li>Assisted in domain configuration, workstation networking, and system troubleshooting across multiple department offices.</li>
        <li>Performed preventive maintenance and technical support for computers, printers, and office systems, reducing hardware downtime by 40%.</li>
      </ul>
    </div>

    <div class="entry">
      <div class="entry-header">
        <span class="entry-title-left">Web Developer</span>
        <span class="entry-date-right">May 2023 – Nov 2025</span>
      </div>
      <div class="entry-header">
        <span class="entry-sub-left">Freelance</span>
        <span class="entry-loc-right">Catanduanes, Philippines</span>
      </div>
      <ul class="bullets">
        <li>Architected and deployed server-side web applications for 5+ clients using PHP/Laravel and MySQL on cloud hosting environments.</li>
        <li>Built reusable backend modules and API integrations, cutting average project delivery time by 25%.</li>
        <li>Implemented responsive frontends as part of full-stack deliverables, primary value delivered through backend logic and database designs.</li>
      </ul>
    </div>
  </section>

  <section>
    <h2 class="section-title">Projects</h2>
    
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title-left">ARIBA BATO | <em>Figma / Adobe Illustrator</em> | <a href="https://www.figma.com" target="_blank">Figma URL</a></span>
        <span class="entry-date-right">2026</span>
      </div>
      <ul class="bullets">
        <li>Spearheaded the end-to-end UI/UX design for an augmented reality mobile game, creating 60+ pages of high-fidelity mockups, interactive prototypes, and visual assets.</li>
        <li>Collaborated closely with the lead &amp; programmer to ensure seamless integration of user interfaces with complex technical requirements and game logic.</li>
      </ul>
    </div>

    <div class="entry">
      <div class="entry-header">
        <span class="entry-title-left">Personal Portfolio + AI Chatbot | <em>Next.js – Supabase – Vercel AI SDK</em> | <a href="https://lescygcaadlawon.tech" target="_blank">Live URL</a> | <a href="https://github.com/Shindawn/portfolio2026" target="_blank">GitHub</a></span>
        <span class="entry-date-right">2026</span>
      </div>
      <ul class="bullets">
        <li>Built backend API layer using Typescript and Node.js, integrating Supabase as the primary database and auth provider.</li>
        <li>Integrated an AI chatbot via Vercel AI SDK to automate visitor inquiry handling, reducing manual response workload by 70%.</li>
      </ul>
    </div>
  </section>

  <section>
    <h2 class="section-title">Education</h2>
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title-left">Catanduanes State University</span>
        <span class="entry-date-right">Aug 2022 – June 2026</span>
      </div>
      <div class="entry-header">
        <span class="entry-sub-left"><em>Bachelor of Science in Information Technology</em> | <strong>1.4 GWA (Cum Laude)</strong></span>
        <span class="entry-loc-right">Catanduanes, Philippines</span>
      </div>
      <ul class="bullets">
        <li>Dean’s Lister (2022-2023 | 2024-2026)</li>
      </ul>
    </div>
  </section>

  <section>
    <h2 class="section-title">Certifications &amp; Courses</h2>
    <div class="cert-block">
      <p><strong>Backend &amp; Cloud:</strong> Web Development (Laravel), Oracle Cloud AI Associate, GitHub Foundations</p>
      <p><strong>Security:</strong> Junior Cybersecurity Analyst Career Path (CISCO)</p>
      <p><strong>AI &amp; Product:</strong> Prompt Engineering (IBM), GenAI (Google), UX Design (IBM), Technical Support (Google)</p>
    </div>
  </section>

  <section>
    <h2 class="section-title">Technical Skills</h2>
    <div class="skills-block">
      <p><strong>Frontend &amp; UI:</strong> React, HTML5, JavaScript, UI/UX Design</p>
      <p><strong>Backend:</strong> PHP, Laravel, Node.js, REST APIs, JWT Auth, Webhooks, MVC Architecture</p>
      <p><strong>Database:</strong> MySQL, Supabase, Firebase</p>
      <p><strong>DevOps &amp; Tools:</strong> Git, GitHub, Vercel, Cloud Lamp stack deployment, CI/CD pipelines, Postman</p>
      <p><strong>Programming Languages:</strong> PHP, Javascript, Python, Java, SQL</p>
      <p><strong>Communication:</strong> English, Filipino (Native)</p>
    </div>
  </section>

</body>
</html>
`;

async function generate() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setContent(cvHtml, { waitUntil: "networkidle" });
  
  const outputPath = path.resolve(__dirname, "../public/LescyGCaadlawon_CV.pdf");
  await page.pdf({
    path: outputPath,
    format: "Letter",
    printBackground: true,
    margin: {
      top: "0.42in",
      bottom: "0.42in",
      left: "0.52in",
      right: "0.52in"
    }
  });

  const previewPng = path.resolve(__dirname, "../public/cv-preview.png");
  await page.screenshot({ path: previewPng, fullPage: true });

  console.log(`Successfully generated CV PDF at: ${outputPath}`);
  console.log(`Preview PNG generated at: ${previewPng}`);
  await browser.close();
}

generate().catch(err => {
  console.error("Error generating PDF:", err);
  process.exit(1);
});
