import React, { useEffect, useRef, useState } from "react";
import { validateWorkingEmail } from "./utils/emailValidator";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

export type ResumeGateMode = "download" | "preview";

interface OpenGateEventDetail {
  mode?: ResumeGateMode;
}

const RESUME_URL = "/LescyGCaadlawon_CV.pdf";
const RESUME_FILENAME = "LescyGCaadlawon_CV.pdf";
const STORAGE_UNLOCKED_KEY = "lescy_resume_unlocked";
const STORAGE_EMAIL_KEY = "lescy_user_email";
const STORAGE_LEADS_KEY = "lescy_captured_leads";
const NOTIFICATION_RECIPIENT = "lescycaadlawon.dev@gmail.com";

/**
 * Global helper to trigger the resume gate from anywhere in the app.
 * If already unlocked, performs the download/preview immediately.
 */
export function requestResumeAccess(mode: ResumeGateMode = "download"): boolean {
  const isUnlocked = typeof window !== "undefined" && localStorage.getItem(STORAGE_UNLOCKED_KEY) === "true";

  if (isUnlocked) {
    executeResumeAction(mode);
    return true;
  }

  // Dispatch custom event to open the gate modal
  window.dispatchEvent(
    new CustomEvent<OpenGateEventDetail>("lescy:open-resume-gate", {
      detail: { mode },
    })
  );
  return false;
}

function executeResumeAction(mode: ResumeGateMode) {
  if (mode === "preview") {
    window.open(RESUME_URL, "_blank", "noopener,noreferrer");
  } else {
    const link = document.createElement("a");
    link.href = RESUME_URL;
    link.download = RESUME_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default function ResumeGateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ResumeGateMode>("download");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for global resume gate open requests
  useEffect(() => {
    const handleOpen = (event: Event) => {
      const customEvent = event as CustomEvent<OpenGateEventDetail>;
      const requestedMode = customEvent.detail?.mode || "download";
      setMode(requestedMode);
      setErrorMessage("");
      setIsSuccess(false);
      setHasInteracted(false);
      setIsOpen(true);
    };

    window.addEventListener("lescy:open-resume-gate", handleOpen);
    return () => {
      window.removeEventListener("lescy:open-resume-gate", handleOpen);
    };
  }, []);

  // Sync dialog visibility
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = "hidden";
        setTimeout(() => inputRef.current?.focus(), 80);
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

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitting(false);
    setIsSuccess(false);
    setErrorMessage("");
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (hasInteracted) {
      const validation = validateWorkingEmail(e.target.value);
      setErrorMessage(validation.isValid ? "" : validation.error || "");
    }
  };

  const handleEmailBlur = () => {
    setHasInteracted(true);
    if (email.trim()) {
      const validation = validateWorkingEmail(email);
      setErrorMessage(validation.isValid ? "" : validation.error || "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasInteracted(true);

    const validation = validateWorkingEmail(email);
    if (!validation.isValid) {
      setErrorMessage(validation.error || "Please provide a valid working email.");
      inputRef.current?.focus();
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const normalizedEmail = validation.normalizedEmail;
      const leadEntry = {
        email: normalizedEmail,
        action: mode,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || window.location.href,
      };

      // 1. Persist lead in localStorage audit list
      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_LEADS_KEY) || "[]");
        existing.push(leadEntry);
        localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify(existing));
        localStorage.setItem(STORAGE_UNLOCKED_KEY, "true");
        localStorage.setItem(STORAGE_EMAIL_KEY, normalizedEmail);
      } catch {
        // Safe fallback for restricted storage
      }

      // 2. Transmit instant email notification to owner
      try {
        const now = new Date();
        const formattedMonthDayTime = `${now.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })} at ${now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}`;

        const humanReadableDate = now.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        void fetch(`https://formsubmit.co/ajax/${NOTIFICATION_RECIPIENT}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: `Someone just downloaded your resume! 📄 (${normalizedEmail})`,
            "Visitor Email": normalizedEmail,
            "Downloaded At (Month/Day/Time)": formattedMonthDayTime,
            "Full Timestamp": humanReadableDate,
            "Visitor Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
            "Page Referrer": document.referrer || window.location.href,
            _captcha: "false",
            _template: "table",
          }),
        }).catch(() => {
          // Silent fallback so user download is never blocked
        });
      } catch {
        // Ignore external dispatch error
      }

      // 3. Mark success
      setIsSuccess(true);
      setIsSubmitting(false);

      // 4. Trigger download or preview after brief celebration
      setTimeout(() => {
        executeResumeAction(mode);
      }, 500);

      // 5. Close modal automatically after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2400);
    } catch {
      setIsSubmitting(false);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        className="portfolio-dialog resume-gate-modal"
        onClick={handleBackdropClick}
        onCancel={(e) => {
          e.preventDefault();
          handleClose();
        }}
        aria-labelledby="resume-gate-title"
        aria-describedby="resume-gate-desc"
      >
        <div className="portfolio-dialog__surface resume-gate-modal__surface">
          <header className="portfolio-dialog__header">
            <div className="portfolio-dialog__badge">
              <span className="badge-dot" />
              <span>Verified Access</span>
            </div>
            <button
              type="button"
              className="portfolio-dialog__close"
              onClick={handleClose}
              aria-label="Close dialog"
            >
              ✕
            </button>
          </header>

          {!isSuccess ? (
            <div className="resume-gate-modal__content">
              <div className="resume-gate-modal__icon-wrap">
                <div className="resume-gate-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="26"
                    height="26"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
              </div>

              <h2 id="resume-gate-title" className="resume-gate-modal__title">
                Download Lescy's Resume
              </h2>

              <p id="resume-gate-desc" className="resume-gate-modal__desc">
                Exchange your working personal or business email to receive the verified Curriculum
                Vitae & technical credentials.
              </p>

              <form className="resume-gate-form" onSubmit={handleSubmit} noValidate>
                <div className="resume-gate-field">
                  <label htmlFor="gate-email" className="resume-gate-label">
                    Working Email Address
                  </label>
                  <div className="resume-gate-input-wrapper">
                    <span className="resume-gate-input-icon" aria-hidden="true">
                      ✉
                    </span>
                    <input
                      ref={inputRef}
                      id="gate-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="e.g. alex@company.com"
                      className={`resume-gate-input ${errorMessage ? "is-invalid" : ""}`}
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={handleEmailBlur}
                      aria-invalid={errorMessage ? "true" : "false"}
                      aria-describedby={errorMessage ? "gate-email-error" : undefined}
                    />
                  </div>

                  {errorMessage && (
                    <div id="gate-email-error" className="resume-gate-error" role="alert">
                      <span aria-hidden="true">⚠️</span> {errorMessage}
                    </div>
                  )}
                </div>

                <div className="resume-gate-actions">
                  <button
                    type="submit"
                    className="button button--primary resume-gate-submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>
                      {isSubmitting
                        ? "Verifying & Unlocking..."
                        : "Verify & Download Resume ↓"}
                    </span>
                  </button>
                </div>

                <div className="resume-gate-privacy">
                  <span>We respect your privacy</span>
                  <span className="resume-gate-privacy__dot" aria-hidden="true">·</span>
                  <button
                    type="button"
                    className="resume-gate-privacy__btn"
                    onClick={() => setShowPrivacy(true)}
                  >
                    Privacy Policy
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="resume-gate-modal__success">
              <div className="resume-gate-success-icon" aria-hidden="true">
                ✓
              </div>
              <h3 className="resume-gate-success-title">Access Granted</h3>
              <p className="resume-gate-success-desc">
                Your download is starting now. Thank you for your interest!
              </p>
              <div className="resume-gate-success-bar">
                <div className="resume-gate-success-progress" />
              </div>
            </div>
          )}
        </div>
      </dialog>

      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </>
  );
}
