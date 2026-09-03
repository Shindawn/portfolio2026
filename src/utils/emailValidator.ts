/**
 * Email validation utility with RFC compliance, disposable domain detection,
 * and dummy / fake pattern filtering.
 */

// List of popular temporary, burner, and disposable email providers
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "guerrillamail.com",
  "guerrillamail.info",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamail.net",
  "guerrillamail.org",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "trashmail.com",
  "trashmail.net",
  "trashmail.me",
  "sharklasers.com",
  "dispostable.com",
  "getairmail.com",
  "throwawaymail.com",
  "crazymailing.com",
  "dropmail.me",
  "fakemailgenerator.com",
  "nada.ltd",
  "getnada.com",
  "inboxkitten.com",
  "mohmal.com",
  "maildrop.cc",
  "mintemail.com",
  "generator.email",
  "mytemp.email",
  "tempail.com",
  "emailondeck.com",
  "burnermail.io",
  "relay.firefox.com",
  "hideaddress.net",
  "anonymbox.com",
  "jetable.org",
  "fakeinbox.com",
  "mytempemail.com",
  "tempmailaddress.com",
  "tmpmail.net",
  "tmpmail.org",
  "discard.email",
  "spambog.com",
  "spambox.us",
  "mailnesia.com",
  "disposablemail.com",
  "tempinbox.com",
  "zillamail.com",
]);

// Known dummy / placeholder prefixes and domains
const BANNED_PATTERNS = [
  /^test@/i,
  /^testing@/i,
  /^demo@/i,
  /^fake@/i,
  /^dummy@/i,
  /^spam@/i,
  /^asdf/i,
  /^qwer/i,
  /^1234/i,
  /^admin@admin\./i,
  /^sample@/i,
  /^none@/i,
  /^noone@/i,
  /^no-reply@/i,
  /^noreply@/i,
  /^nobody@/i,
  /@example\.(com|org|net)$/i,
  /@test\.(com|org|net)$/i,
  /@fake\.(com|org|net)$/i,
  /@dummy\.(com|org|net)$/i,
  /@asdf\.(com|org|net)$/i,
  /@localhost$/i,
];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  normalizedEmail: string;
}

/**
 * Validates whether an email is a legitimate, working email address.
 */
export function validateWorkingEmail(rawEmail: string): ValidationResult {
  const email = (rawEmail || "").trim().toLowerCase();

  if (!email) {
    return { isValid: false, error: "Please enter your email address.", normalizedEmail: "" };
  }

  // RFC 5322 compliant regex for basic syntax
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Please enter a valid email format (e.g. name@company.com).",
      normalizedEmail: email,
    };
  }

  const [, domain] = email.split("@");

  if (!domain || domain.length < 4 || !domain.includes(".")) {
    return {
      isValid: false,
      error: "Please provide a complete email domain (e.g. gmail.com, company.com).",
      normalizedEmail: email,
    };
  }

  const tld = domain.split(".").pop() || "";
  if (tld.length < 2) {
    return {
      isValid: false,
      error: "Please enter a valid top-level domain (e.g. .com, .ph, .org).",
      normalizedEmail: email,
    };
  }

  // Check disposable domains
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: "Temporary / disposable emails are not accepted. Please use a working personal or work email.",
      normalizedEmail: email,
    };
  }

  // Check obvious dummy patterns
  for (const pattern of BANNED_PATTERNS) {
    if (pattern.test(email)) {
      return {
        isValid: false,
        error: "Please enter your real, working email address.",
        normalizedEmail: email,
      };
    }
  }

  // Check for repeated single character in localpart (e.g. aaaaa@...)
  if (/^(.)\1{4,}@/.test(email)) {
    return {
      isValid: false,
      error: "Please enter a genuine email address.",
      normalizedEmail: email,
    };
  }

  return {
    isValid: true,
    normalizedEmail: email,
  };
}
