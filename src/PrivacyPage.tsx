import { Footer, Navigation } from "./Sections";

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="privacy-page shell">
        <header className="privacy-page__hero">
          <h1 className="privacy-page__title">Privacy Policy</h1>
          <p className="privacy-page__subtitle">
            How your information is handled when you visit my portfolio and download my resume.
          </p>
        </header>

        <article className="privacy-page__body">
          <section className="privacy-section">
            <h2>1. Overview & Commitment</h2>
            <p>
              Thank you for visiting my portfolio. I value your privacy. This document describes the
              handling of personal information when using this site, particularly regarding access to my
              professional Resume / Curriculum Vitae (CV).
            </p>
          </section>

          <section className="privacy-section privacy-section--highlight">
            <div className="privacy-highlight-pill">Resume Download Disclosure</div>
            <h2>2. Resume Download Gate & Email Collection</h2>
            <p>
              To protect proprietary work materials and connect with prospective partners, recruiters,
              and collaborators, downloading or previewing my complete Technical Resume / CV requires
              exchanging your <strong>verified working email address</strong>.
            </p>
            <ul>
              <li>
                <strong>What is collected:</strong> Your email address, timestamp of submission, and the
                action requested (resume preview or PDF download).
              </li>
              <li>
                <strong>Purpose of collection:</strong> I collect this information to understand which
                companies and professionals are reviewing my credentials, to follow up regarding potential
                job opportunities, consulting, or project collaborations, and to prevent abusive bot scraping.
              </li>
              <li>
                <strong>Zero Spam Guarantee:</strong> Your email address will never be sold, rented, leased,
                or shared with third-party marketing services. It is used strictly for direct, one-to-one
                professional communications with me (Lescy G. Caadlawon).
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. Analytics & Telemetry</h2>
            <p>
              This website uses a lightweight, cookieless visitor counter to monitor traffic volume and
              ensure service reliability. No third-party ad tracking or cross-site tracking profiles are created.
            </p>
          </section>

          <section className="privacy-section">
            <h2>4. Your Rights & Data Removal</h2>
            <p>
              You maintain full ownership of your personal data. If you ever wish to have your email
              address removed from my contact records, please send a message to:
            </p>
            <p className="privacy-contact">
              <strong>Email:</strong>{" "}
              <a href="mailto:lescycaadlawon.dev@gmail.com">lescycaadlawon.dev@gmail.com</a>
              <br />
              <strong>Location:</strong> Mandaluyong City, Philippines
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
