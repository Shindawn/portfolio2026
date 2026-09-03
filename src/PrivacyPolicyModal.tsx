import React, { useEffect, useRef } from "react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = "hidden";
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape or click outside backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="portfolio-dialog privacy-modal"
      onClick={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      aria-labelledby="privacy-title"
    >
      <div className="portfolio-dialog__surface privacy-modal__surface">
        <header className="portfolio-dialog__header">
          <div className="portfolio-dialog__badge">
            <span className="badge-dot" />
            <span>Transparency & Privacy</span>
          </div>
          <button
            type="button"
            className="portfolio-dialog__close"
            onClick={onClose}
            aria-label="Close Privacy Policy"
          >
            ✕
          </button>
        </header>

        <div className="privacy-modal__content">
          <h2 id="privacy-title" className="privacy-modal__heading">Privacy Policy</h2>
          <p className="privacy-modal__updated">Last updated: March 2026</p>

          <section className="privacy-section">
            <h3>1. Overview & Commitment</h3>
            <p>
              Thank you for visiting my portfolio. I respect your personal privacy. This Privacy
              Policy outlines how information is collected, used, and protected when you interact
              with this website, specifically when accessing my professional Resume / Curriculum Vitae (CV).
            </p>
          </section>

          <section className="privacy-section privacy-section--highlight">
            <div className="privacy-highlight-pill">Key Clause</div>
            <h3>2. Resume Download Gate & Email Collection</h3>
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
            <h3>3. Analytics & Telemetry</h3>
            <p>
              This website uses a privacy-first, cookieless visitor counter to monitor general traffic trends
              and maintain performance. No persistent tracking beacons or personal advertising profiles
              are maintained.
            </p>
          </section>

          <section className="privacy-section">
            <h3>4. Your Rights & Data Removal</h3>
            <p>
              You maintain full ownership of your personal data. If at any time you wish to have your email
              address removed from my contact records, or if you have questions regarding this policy, simply
              email me directly at:
            </p>
            <p className="privacy-contact">
              <strong>Email:</strong>{" "}
              <a href="mailto:lescycaadlawon.dev@gmail.com">lescycaadlawon.dev@gmail.com</a>
              <br />
              <strong>Location:</strong> Mandaluyong City, Philippines
            </p>
          </section>
        </div>

        <footer className="portfolio-dialog__footer">
          <button
            type="button"
            className="button button--primary"
            onClick={onClose}
          >
            <span>Understood & Close</span>
          </button>
        </footer>
      </div>
    </dialog>
  );
}
